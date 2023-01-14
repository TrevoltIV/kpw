import './dashboard.css'
import { useEffect, useState } from 'react'
import { db, auth, } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AdminDashboard from '../components/admin-dashboard/AdminDashboard'
import EmployeeDashboard from '../components/employee-dashboard/EmployeeDashboard'
import ClientDashboard from '../components/client-dashboard/ClientDashboard'

export default function Dashboard() {
    const [location, setLocation] = useState({
        longitude: null,
        latitude: null,
    })
    navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        })
    })

    const navigate = useNavigate()
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [logout, setLogout] = useState(false)
    const [userData, setUserData] = useState({
        email: null,
        firstname: null,
        lastname: null,
        status: null,
    })

    // Redirect user to login if they are not logged in
    // Fetch user data from Firestore if user is logged in
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserLoggedIn(true)
                if (userData.email === null) {
                    const userDataRef = collection(db, "users")
                    const q = query(userDataRef, where("email", "==", user.email))
                    const querySnapshot = await getDocs(q)
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            setUserData(doc.data())
                        })
                    } else if (querySnapshot.empty) {
                        alert("Authentication Error: User data not found.")
                        setUserData({
                            email: null,
                            firstname: null,
                            lastname: null,
                            status: null,
                        })
                        auth.signOut()
                        .then(() => {
                            navigate("/login")
                        })
                        .catch((err) => {
                            alert(err.message)
                        })
                    }
                }
            } else {
                navigate("/login")
            }
        })
    }, [navigate, userData, auth])


    // Handle logout button click
    useEffect(() => {
        if (logout) {
            setUserData({
                email: null,
                firstname: null,
                lastname: null,
                status: null,
            })
            auth.signOut()
            .then(() => {
                navigate("/login")
            })
            .catch((err) => {
                alert(err.message)
            })
        }
    }, [logout, navigate])
    
    if (userLoggedIn) {
        if (userData.status === "client") {
            return (
                <ClientDashboard
                    userData={userData}
                    setLogout={setLogout}
                />
            )
        } else if (userData.status === "employee") {
            return (
                <EmployeeDashboard
                    userData={userData}
                    setLogout={setLogout}
                />
            )
        } else if (userData.status === "admin") {
            return (
                <AdminDashboard
                    userData={userData}
                    setLogout={setLogout}
                />
            )
        } else if (userData.status != null) {
            alert("Authentication Error: User status not found. Cannot authenticate viewport.")
            
        }
    }
}