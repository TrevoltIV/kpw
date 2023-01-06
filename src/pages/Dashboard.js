import './dashboard.css'
import { useEffect, useState } from 'react'
import { app, db, auth, user } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'


export default function Dashboard() {
    const navigate = useNavigate()
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [userUid, setUserUid] = useState(null)
    const [userData, setUserData] = useState(null)

    // Redirect user to login if they are not logged in
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLoggedIn(true)
            } else {
                navigate("/login")
            }
        })
    }, [userLoggedIn])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (userUid === null) {
                setUserUid(user.uid)
                setUserData(getUserData(userUid))
            }
        })
    }, [userUid])

    // Get user data from firestore database
    const getUserData = async (userUID) => {
        const docRef = doc(db, "users", userUID)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            docSnap.data().then((response) => {
            })
        } else {
            alert("Authentication error: User not found")
            setTimeout(handleLogout, 2000)
        }
    }



    // Handle logout button click
    const handleLogout = () => {
        auth.signOut()
        .then(() => {
            navigate("/login")
        })
        .catch((err) => {
            alert(err.message)
        })
    }
    if (userData != null) {console.log("userData: " + userData)}
    if (userUid != null) {console.log(userUid)}
    
    if (userLoggedIn) {
        if (false) {
            if (false)
            return (
                <div className="dashboard-wrapper">
                    <Header page="dashboard" />
                    <h1>Dashboard page</h1>
                    <div className="dashboard-content">
                        <button
                            className="dashboard-logout-btn"
                            type="button"
                            onClick={handleLogout}>
                                Logout
                        </button>
                    </div>
                </div>
            )
        } else if (false) {
            return (
                <div className="dashboard-wrapper">
                    <Header page="dashboard" />
                    <h1>Dashboard page</h1>
                    <div className="dashboard-content">
                        <button
                            className="dashboard-logout-btn"
                            type="button"
                            onClick={handleLogout}>
                                Logout
                        </button>
                    </div>
                </div>
            )
        } else if (userLoggedIn) {
            return (
                <div className="dashboard-wrapper">
                    <Header page="dashboard" />
                    <h1>Dashboard page</h1>
                    <div className="dashboard-content">
                        <button
                            className="dashboard-logout-btn"
                            type="button"
                            onClick={handleLogout}>
                                Logout
                        </button>
                    </div>
                </div>
            )
        } else {
            alert("An unknown error occurred. Please try again later.")
            
        }
    }
}