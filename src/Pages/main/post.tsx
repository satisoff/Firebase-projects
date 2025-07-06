import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import "./post.css"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { PostsData } from "./main"
import { useEffect, useState } from "react";

interface IPost {
    post: PostsData
}
interface ILike {
    userId: string
}

export const PostComp = (props: IPost) => {
    
    const { post } = props
    const [user] = useAuthState(auth);
    const [likesList, setLikesList] = useState<ILike[] | null>(null);
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikesList(data.docs.map((doc) => ({userId: doc.data().userId})));
    }
    const onLikePost = async () => {
        try {
            await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            })
            if (user) {
                setLikesList((like) => like ? [...like, {userId: user?.uid}] : [{userId: user?.uid}])
            }
        } catch (err) {
            console.log(err);
        }
    }
    const onDislikePost = async () => {
        const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
        try {
            await deleteDoc(likeToDelete);
            if (user) {
                setLikesList((like) => like && like.filter((like) => like.userId !== user?.uid))
            }
        } catch (err) {
            console.log(err);
        }
    }

    const hasUserLiked = likesList?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, [])
    return(
        <div className="post-class">
            <h2 className="title-class">
                "{post.title}"
            </h2>
            <h2 className="desc-class">
                {post.description}
            </h2>
            <div className="post-footer">
                <div className="like-box">
                    <button className={hasUserLiked ? "dislike-btn": "like-btn"} onClick={hasUserLiked ? onDislikePost : onLikePost}></button>
                    {likesList && <p className="like-count">{likesList?.length}</p>}
                </div>
                <h3 className="user-class">
                    {post.username}
                </h3>
            </div>
        </div>
    )
}