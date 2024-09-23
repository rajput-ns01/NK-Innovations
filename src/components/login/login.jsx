import "./userLogin.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../../lib/firebase"; 
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false); // Toggle between login and sign-up
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        // Validations
        if (!username || !email || !password) {
            toast.error("Please fill in all fields.");
            setLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email.");
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            toast.error("Password should be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const imgUrl = await upload(avatar.file);
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: []
            });

            navigate('/');
        } catch (err) {
            console.log(err);
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

        // Validations
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            setLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email.");
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            toast.error("Password should be at least 6 characters long.");
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (email === "nirbhay@gmail.com") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='loginContainer'>
            {isLogin ? (
                // Login form
                <div className="signUpBox">
                    <h2>Welcome back,</h2>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder="Email" name="email" className="loginBox input" />
                        <input type="password" placeholder="Password" name="password" className="loginBox input" />
                        <button disabled={loading} className="submitBtn">{loading ? "Loading" : "Sign In"}</button>
                    </form>
                    <p className="loginFooter">
                        Don't have an account?{" "}
                        <span className="signinLink" onClick={() => setIsLogin(false)}>
                            Sign Up here
                        </span>
                    </p>
                </div>
            ) : (
                // Sign Up form
                <div className="signUpBox">
                    <h2>Create an Account</h2>
                    <form onSubmit={handleRegister}>
                        <label htmlFor="file" className="imagePreviewContainer">
                            <img src={avatar.url || "../assets/images/avatar.png"} alt="" className="profileImagePreview" />
                            Upload an image
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                        <input type="text" placeholder="Username" name="username" className="loginBox input" />
                        <input type="text" placeholder="Email" name="email" className="loginBox input" />
                        <input type="password" placeholder="Password" name="password" className="loginBox input" />
                        <button disabled={loading} className="submitBtn">{loading ? "Loading" : "Sign Up"}</button>
                    </form>
                    <p className="signUpFooter">
                        Already have an account?{" "}
                        <span className="signinLink" onClick={() => setIsLogin(true)}>
                            Log in here
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Login;
