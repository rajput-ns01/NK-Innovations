import "./userLogin.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import upload from "../../lib/upload";
import { useNavigate } from "react-router-dom";
import google1 from "../assets/images/google1.png"

const Login = () => {
    const [avatar, setAvatar] = useState({ file: null, url: "" });
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        if (!username || !email || !password) return toast.error("Please fill in all fields."), setLoading(false);
        if (!validateEmail(email)) return toast.error("Invalid email."), setLoading(false);
        if (password.length < 6) return toast.error("Password must be at least 6 characters."), setLoading(false);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const imgUrl = await upload(avatar.file);
            const userData = { username, email, avatar: imgUrl, id: res.user.uid, blocked: [] };
            await setDoc(doc(db, "users", res.user.uid), userData);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        if (!email || !password) return toast.error("Please fill in all fields."), setLoading(false);
        if (!validateEmail(email)) return toast.error("Invalid email."), setLoading(false);

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "users", res.user.uid));
            if (!userDoc.exists()) return toast.error("User data not found.");
            const userData = { id: res.user.uid, ...userDoc.data() };
            localStorage.setItem('user', JSON.stringify(userData));
            navigate(email === "nirbhay12@gmail.com" ? "/admin" : "/");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            
            let userData = userDoc.exists() ? { id: user.uid, ...userDoc.data() } : {
                username: user.displayName,
                email: user.email,
                avatar: user.photoURL || "",
                id: user.uid,
                blocked: []
            };
            
            if (!userDoc.exists()) await setDoc(userDocRef, userData);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate(user.email === "nirbhay12@gmail.com" ? "/admin" : "/");
        } catch (err) {
            toast.error("Google sign-in failed.");
        }
    };

    return (
        <div className='loginContainer'>
            <div className="signUpBox">
                <h2>{isLogin ? "Welcome back," : "Create an Account"}</h2>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    {!isLogin && (
                        <>
                            <label htmlFor="file" className="imagePreviewContainer">
                                <img src={avatar.url || "../assets/images/avatar.png"} alt="" className="profileImagePreview" />
                                Upload an image
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                            <input type="text" placeholder="Username" name="username" className="loginBox input" />
                        </>
                    )}
                    <input type="text" placeholder="Email" name="email" className="loginBox input" />
                    <input type="password" placeholder="Password" name="password" className="loginBox input" />
                    <button disabled={loading} className="submitBtn">{loading ? "Loading" : isLogin ? "Sign In" : "Sign Up"}</button>
                </form>
                <p className="loginFooter">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span className="signinLink" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign Up here" : "Log in here"}
                    </span>
                </p>
                <div className="googleSignInContainer">
                    <button className="googleSignInBtn" onClick={handleGoogle}>
                        <img src={google1} alt="Google Icon" />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
