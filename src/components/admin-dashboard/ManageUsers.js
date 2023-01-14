import './manageusers.css'
import { useEffect, useState } from 'react'
import { db, auth, } from '../../firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'




export default function ManageUsers(props) {
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!loaded) {
            fetchUsers()
        }
    }, [loaded])

    const fetchUsers = async () => {
        const userDataRef = collection(db, "users")
        const q = query(userDataRef)
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
            let usersArr = []
            querySnapshot.forEach((doc) => {
                usersArr.push(doc.data())
            })
            setUsers(usersArr)
            setLoaded(true)
            }
    }

    return (
        <div className="dashboard-content-manageusers">
            <div className="dashboard-manageusers-btn-wrapper">
                <button onClick={() => props.setPage("home")} type="button" className="dashboard-home-btn">Back to Home</button>
            </div>
            <div className="dashboard-users-wrapper">
                {users.map((user, index) => {
                    return (
                        <div key={index} className="dashboard-user-wrapper">
                            <div className="dashboard-user-info">
                            <p className="dashboard-user-info-text">Name: {user.firstname + " " + user.lastname}</p>
                                <p className="dashboard-user-info-text">Username: {user.username}</p>
                                <p className="dashboard-user-info-text">Email: {user.email}</p>
                                <p className="dashboard-user-info-text">User status: {user.status}</p>
                            </div>
                            <div className="dashboard-user-btns">
                                <button type="button" className="dashboard-user-btn">Edit</button>
                                <button type="button" className="dashboard-user-btn">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}