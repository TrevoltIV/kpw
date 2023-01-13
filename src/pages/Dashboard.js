import './dashboard.css'
import {
    useEffect,
    useState
} from 'react'
import {
    db,
    auth,
} from '../firebase/config'
import {
    onAuthStateChanged
} from 'firebase/auth'
import {
        collection,
        query,
        where,
        getDocs
} from 'firebase/firestore'
import {
    useNavigate
} from 'react-router-dom'
import Header from '../components/Header'

export default function Dashboard() {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude is :", position.coords.latitude)
        console.log("Longitude is :", position.coords.longitude)
    })

    const navigate = useNavigate()
    const [userLoggedIn, setUserLoggedIn] = useState(false)
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
                    } else if (userData.email != null) {
                        alert("Authentication Error: User data not found.")
                        auth.signOut()
                        .then(() => {
                            setUserData({
                                email: null,
                                firstname: null,
                                lastname: null,
                                status: null,
                            })
                            navigate("/login")
                        })
                    }
                } else if (userData.email !== user.email && userData.email != null) {
                    alert("Authentication Error: User account changed.") // TODO: For some reason when user logs out and logs back in with diff account, this error throws
                    auth.signOut()
                    .then (() => {
                        setUserData({
                            email: null,
                            firstname: null,
                            lastname: null,
                            status: null,
                        })
                        navigate("/login")
                    })
                }
            } else {
                navigate("/login")
            }
        })
    }, [navigate, userData.email])


    // Handle logout button click
    const handleLogout = () => {
        auth.signOut()
        .then(() => {
            setUserData({
                email: null,
                firstname: null,
                lastname: null,
                status: null,
            })
            navigate("/login")
        })
        .catch((err) => {
            alert(err.message)
        })
    }
    
    if (userLoggedIn) {
        if (userData.status === "client") {
            return (
                <div className="dashboard-wrapper">
                    <Header page="dashboard" />
                    <h1>Dashboard page - client</h1>
                    <div className="dashboard-user-status">
                        <p className="dashboard-user-status-text">Logged in as: {userData.username}</p>
                        <p className="dashboard-user-status-text">User status: Client</p>
                    </div>
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
        } else if (userData.status === "employee") {
            return (
                <div className="dashboard-wrapper">
                    <Header page="dashboard" />
                    <h1>Dashboard</h1>
                    <div className="dashboard-user-status">
                        <p className="dashboard-user-status-text">Logged in as: {userData.username}</p>
                        <p className="dashboard-user-status-text">User status: Employee</p>
                    </div>
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
        } else if (userData.status === "admin") {
            return (
                <div className="dashboard-wrapper">
                    <Header page="dashboard" />
                    <h1>Dashboard</h1>
                    <div className="dashboard-user-status">
                        <p className="dashboard-user-status-text">Logged in as: {userData.username}</p>
                        <p className="dashboard-user-status-text">User status: Admin</p>
                    </div>
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
        } else if (userData.status != null) {
            alert("Authentication Error: User status not found. Cannot authenticate viewport.")
            
        }
    }
}