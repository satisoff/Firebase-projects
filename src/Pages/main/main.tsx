import { collection, doc, getDocs, limit } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { PostComp } from "./post";

export interface PostsData {
        description: string,
        id: string,
        title: string,
        userId: string,
        username: string,
    }

export const Main = () => {

    const [postsList, setPostsList] = useState<PostsData[] | null>(null);
    const postRef = collection(db, "posts");
    const getPostList = async () => {
        const data = await getDocs(postRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as PostsData[]);
    }
    
    useEffect(() => {
        getPostList()
    }, [])

    return (
        <div className="main-container">
            {postsList?.map((post) => (
                <PostComp post={post}/>
            ))}
            {/* <PostComp title="This is a Title" description="This is just some description written over here" username="Ruhaan K" /> */}
        </div>
    )
}