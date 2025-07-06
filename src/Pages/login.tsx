import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import "./login.css"

export const Login = () => {

    const naviagte = useNavigate();

    const signInWithGoogle = async () => {
        const response = await signInWithPopup(auth, provider);
        console.log(response);
        naviagte("/");
    }

    return (
        <div className="login-box">
            <p>Sign in With Google to Continue</p>
            <button className="btn" onClick={signInWithGoogle}></button>
        </div>
    )
}