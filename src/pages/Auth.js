import './auth.css'
import { useEffect, useState, lazy } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { app, db, auth, user } from '../firebase/config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
const Header = lazy(() => import('../components/Header'))



export default function Auth() {
    const navigate = useNavigate()
    const path = useLocation().pathname
    const [login, setLogin] = useState(true)
    const [data, setData] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [signupSuccess, setSignupSuccess] = useState(false)
    const [userUid, setUserUid] = useState(null)

    // Toggle for login/signup forms to change between the two
    const toggleLogin = () => {
        if (login) {
            setLogin(false)
            navigate("/signup")
        } else {
            setLogin(true)
            navigate("/login")
        }
    }

    // Check if the path is /signup and display signup form if true
    useEffect(() => {
        if (path === "/signup" && !loaded) {
            setLogin(false)
            setLoaded(true)
        }
    }, [path, loaded])

    // Update state with input values
    const handleInput = (event) => {
        let newInput = { [event.target.name]: event.target.value }
        setData({ ...data, ...newInput })
    }

    // Handle signup form submission upon clicking the submit button
    const handleSubmit = async (method) => {
        if (signupSuccess) {
            await setDoc(doc(db, "users", data.email), {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                status: "client",
            })
        }
        if (method === "signup") {
            if (data.password === data.confirmPassword) {
                // Create user in firebase auth if passwords match
                createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((response, cred) => {
                    // Create user in firestore database if sign up is successful
                    setUserUid(response.user.uid)
                    setLogin(true)
                    setSignupSuccess(true)
                })
                .catch((err) => {
                    alert("Signup Failed: " + err.message)
                })
            } else {
                alert("Passwords do not match.")
            }
        } else if (method === "login") {
            signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                navigate("/dashboard")
            })
            .catch((err) => {
                alert("Login Failed: " + err.message)
            })
        }
    }

    return (
        <div className="auth-wrapper">
            <Header page="auth" />
            <div className="auth-content">
                <h1 className="auth-title">{login ? "Login" : "Signup"}</h1>
                <div className="auth-form-wrapper">
                        {login ?
                        <form className="auth-form">
                            <input
                                className="auth-form-input"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(event) => handleInput(event)}
                            />
                            <input
                                className="auth-form-input"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={(event) => handleInput(event)}
                            />
                            <p className="auth-form-toggle">
                                Don't have an account?
                                <span
                                    className="auth-toggle-btn"
                                    onClick={toggleLogin}>
                                        Signup
                                </span>
                            </p>
                            <button
                                className="auth-form-btn"
                                type="button"
                                onClick={() => handleSubmit("login")}>
                                    Login
                            </button>
                            {/* Display signup success msg when user registers */}
                            {signupSuccess &&
                            <p className="auth-form-success">
                                Signup successful, you may now login.
                            </p>
                            }
                        </form>
                        :
                        <form className="auth-form">
                            <input
                                className="auth-form-input"
                                name="firstname"
                                type="text"
                                placeholder="First name"
                                onChange={(event) => handleInput(event)}
                            />
                            <input
                                className="auth-form-input"
                                name="lastname"
                                type="text"
                                placeholder="Last name"
                                onChange={(event) => handleInput(event)}
                            />
                            <input
                                className="auth-form-input"
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={(event) => handleInput(event)}
                            />
                            <input
                                className="auth-form-input"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(event) => handleInput(event)}
                            />
                            <input
                                className="auth-form-input"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={(event) => handleInput(event)}
                            />
                            <input
                                className="auth-form-input"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                onChange={(event) => handleInput(event)}
                            />
                            <p className="auth-form-toggle">
                                Already have an account?
                                <span
                                    onClick={toggleLogin}
                                    className="auth-toggle-btn">
                                        Login
                                </span>
                            </p>
                            <button
                                className="auth-form-btn"
                                type="button"
                                onClick={() => handleSubmit("signup")}>
                                    Signup
                            </button>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}