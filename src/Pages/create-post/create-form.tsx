import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import "./create-form.css"

export const CreateForm = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    interface CreatePostData {
        title: string,
        description: string
    }

    const schema = yup.object().shape({
        title: yup.string().required("Post must has a title"),
        description: yup.string().required("Post must has a description")
    })
    const {register, handleSubmit, formState: {errors}} = useForm<CreatePostData>({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db, "posts");
    const onCreatePost = async (data: CreatePostData) => {
        await addDoc(postRef, {
            userId: user?.uid,
            username: user?.displayName,
            ...data
        })
        navigate("/");
    }

    return(
        <div className="createForm">
            <form onSubmit={handleSubmit(onCreatePost)} className='form-class'>
                <div className="title-box">
                    <input type="text" {...register("title")} placeholder='Title' className='title-input'/>
                    <p className='title-error errors'>{errors.title?.message}</p><br/>
                </div>

                <div className='desc-box'>
                    <textarea {...register("description")} placeholder="Description..." />
                    <p className='desc-error errors'>{errors.description?.message}</p>                
                </div>
                
                <input type="submit" className='btn form-submit'/>
            </form>
        </div>
    )
}