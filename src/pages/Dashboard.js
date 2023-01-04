import './dashboard.css'
import { useEffect, useState } from 'react'
import { app, db, auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth'


export default function Dashboard() {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const userData = collection(db, 'users')
    const docRef = doc(db, "users", user.email)

    // Get user data from firestore database
    const getUserData = async () => {
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            if (docSnap.data().status === "client") {
                return "client"
            } else if (docSnap.data().status === "employee") {
                return "employee"
            } else if (docSnap.data().status === "admin") {
                return "admin"
            }
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

    // Redirect user to login if they are not logged in
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    })

    if (user) {
        //TODO: fix the return on getUserData()
        console.log(getUserData())

        if (getUserData().PromiseResult === "client") {
            return (
                <div className="dashboard-wrapper">
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
        } else if (getUserData().PromiseResult === "employee") {
            return (
                <div className="dashboard-wrapper">
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
        } else if (getUserData().PromiseResult === "admin") {
            return (
                <div className="dashboard-wrapper">
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