import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"

export const Navbar = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const singUserOut = async () => {
        await signOut(auth);
        navigate("/login");
    }

    return (
        <div className="navbar">
            <ul className="navs">
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                {
                    !user 
                    ?
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                    :
                        <li>
                            <Link to={"/create"}>Create Post</Link>
                        </li>
                }
                
                
            </ul>
            {user && <>
                        <div className="user">
                            <h2 className="user-name">{`${user?.displayName || "Sign In"}`}</h2>
                            <img src={`${user?.photoURL || ""}`} alt="Profile" title="Sign Out" onClick={singUserOut}/>
                        </div>
                    </>
            }            
        </div>
    )
}