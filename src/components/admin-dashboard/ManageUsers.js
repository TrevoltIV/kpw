import './manageusers.css'
import { useEffect, useState } from 'react'
import { db, auth, } from '../../firebase/config'
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore'
import { setDefaultEventParameters } from 'firebase/analytics'




export default function ManageUsers(props) {
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [editUser, setEditUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const [userEmail, setUserEmail] = useState(null)
    const [editInput, setEditInput] = useState({})

    // Call fetchUsers() when component mounts
    useEffect(() => {
        if (!loaded) {
            fetchUsers()
        }
    }, [loaded])

    // Fetch all users from firestore
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

    // Display edit user modal when btn is clicked
    const handleEditClick = (userEmail) => {
        setUserEmail(userEmail)
        setEditUser(true)
    }

    // Add input values to state on change
    const handleEditInput = (event) => {
        let newInput = { [event.target.name]: event.target.value }
        setEditInput({ ...editInput, ...newInput })
    }

    // Update user data in firestore
    // TODO: Query for user data and update only the fields that have been changed
    const handleEditUser = async () => {
        await setDoc(doc(db, "users", userEmail), editInput)
        .then(() => {
            setEditUser(false)
            setLoaded(false)
            setEditInput({})
        })
    }

    // Display delete user modal when btn is clicked
    const handleDeleteClick = (userEmail) => {
        setUserEmail(userEmail)
        setDeleteUser(true)
    }

    return (
        <div className="dashboard-content-manageusers">
            <div className="dashboard-manageusers-btn-wrapper">
                <button onClick={() => props.setPage("home")} type="button" className="dashboard-home-btn">Back to Home</button>
            </div>
            <div className="dashboard-users-wrapper">
                {editUser &&
                // Edit user modal
                    <div className="dashboard-edituser-modal">
                        <div className="dashboard-edituser-modal-inputs">
                            <p>{userEmail}</p>
                            <input
                                onChange={(event) => handleEditInput(event)}
                                name="firstname"
                                type="text"
                                placeholder="First name"
                            />
                            <input
                                onChange={(event) => handleEditInput(event)}
                                name="lastname"
                                type="text"
                                placeholder="Last name"
                            />
                            <input
                                onChange={(event) => handleEditInput(event)}
                                name="username"
                                type="text"
                                placeholder="Username"
                            />
                            <input
                                onChange={(event) => handleEditInput(event)}
                                name="email"
                                type="text"
                                placeholder="Email"
                            />
                            <input
                                onChange={(event) => handleEditInput(event)}
                                name="status"
                                type="text"
                                placeholder="Status"
                            />
                        </div>
                        {/* Edit user modal buttons */}
                        <div className="dashboard-edituser-modal-btns">
                            <button
                                onClick={() => setEditUser(false)}
                                type="button"
                                className="dashboard-edituser-modal-btn">
                                    Cancel
                            </button>
                            <button
                                onClick={() => handleEditUser()}
                                type="button"
                                className="dashboard-edituser-modal-btn">
                                    Save
                            </button>
                        </div>
                    </div>
                }
                {/* Users list */}
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
                                <button onClick={() => handleEditClick(user.email)} type="button" className="dashboard-user-btn">Edit</button>
                                <button onClick={() => handleDeleteClick(user.email)} type="button" className="dashboard-user-btn">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}