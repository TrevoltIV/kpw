import './manageusers.css'
import { lazy, useEffect, useState } from 'react'
import { db, auth, } from '../../../firebase/config'
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore'
import { setDefaultEventParameters } from 'firebase/analytics'
import Loading from '../../animations/Loading'




export default function ManageUsers(props) {
    const [users, setUsers] = useState([])
    const [userToEdit, setUserToEdit] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [editUser, setEditUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const [userEmail, setUserEmail] = useState(null)
    const [editInput, setEditInput] = useState({})
    const [usersIndex, setUsersIndex] = useState(10)
    const [usersListEnd, setUsersListEnd] = useState(false)
    const [loading, setLoading] = useState(true)

    // Call fetchUsers() when component mounts
    useEffect(() => {
        if (!loaded) {
            fetchUsers()
        }
    }, [loaded])

    useEffect(() => {
        const userDiv = document.querySelector("#users")
        if (userDiv) {
            setLoading(false)
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
    const handleEditClick = (userObject) => {
        setUserToEdit(userObject.email)
        setEditInput(userObject)
        setEditUser(true)
    }

    // Add input values to state on change
    const handleEditInput = (event) => {
        let newInput = { [event.target.name]: event.target.value }
        setEditInput({ ...editInput, ...newInput })
    }

    // Update user data in firestore
    const handleEditUser = async () => {
        await setDoc(doc(db, "users", userToEdit), editInput)
        .then(() => {
            setEditUser(false)
            setLoaded(false)
            setEditInput({})
        })
    }

    // Display delete user modal when btn is clicked
    const handleDeleteClick = (input) => {
        setUserEmail(input)
        setDeleteUser(true)
    }

    const handleDeleteUser = (userToDelete) => {

    }

    // Paginate users list
    const handlePagination = (direction) => {
        if (direction === "next") {
            if (users[usersIndex + 1] != undefined) {
                setUsersIndex(usersIndex + 10)
            } else {
                setUsersListEnd(true)
                setTimeout(() => setUsersListEnd(false), 5000)
            }
        } else if (direction === "prev") {
            if (usersIndex >= 20) {
                setUsersIndex(usersIndex - 10)
            }
        }
    }

    // TODO: Split these sections into separate components
    return (
        <div className="dashboard-content-manageusers">
            {!loading &&
                <div className="dashboard-home-btn-wrapper">
                    <button
                        onClick={() => props.setPage("home")}
                        type="button"
                        className="dashboard-home-btn">
                            Back to Home
                    </button>
                </div>
            }
            {editUser &&
                // Edit user modal
                <div className="dashboard-edituser-modal">
                    <div className="dashboard-edituser-modal-inputs">
                        <p>{userToEdit}</p>
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
            {deleteUser &&
                // Delete use modal
                <div className="dashboard-deleteuser-modal">
                    <p>Are you sure you want to delete this user?</p>
                    <p>{userEmail}</p>
                    {/* Delete user modal buttons */}
                    <div className="dashboard-deleteuser-modal-btns">
                        <button
                            onClick={() => setDeleteUser(false)}
                            type="button"
                            className="dashboard-deleteuser-modal-btn">
                                Cancel
                        </button>
                        <button
                            onClick={() => handleDeleteUser()}
                            type="button"
                            className="dashboard-deleteuser-modal-btn">
                                Delete
                        </button>
                    </div>
                </div>
            }
            {/* Show page counter once page is loaded */}
            {!loading &&
                <div className="page-index">
                    <p>Page: {usersIndex / 10}</p>
                </div>
            }
            {/* Show loading animation when page is loading */}
            {loading &&
                <div className="dashboard-users-loading-wrapper">
                    <Loading />
                </div>
            }
            {/* Users list */}
            {
                users.slice(usersIndex - 10, usersIndex).map((user, index) => {
                    return (
                        <div className="dashboard-users-wrapper" key={index}>
                            <div id="users" key={index} className="dashboard-user-wrapper">
                                <div className="dashboard-user-info">
                                    <p className="dashboard-user-info-text">
                                        Name: {user.firstname + " " + user.lastname}
                                    </p>
                                    <p className="dashboard-user-info-text">
                                        Username: {user.username}
                                    </p>
                                    <p className="dashboard-user-info-text">
                                        Email: {user.email}
                                    </p>
                                    <p className="dashboard-user-info-text">
                                        User status: {user.status}
                                    </p>
                                </div>
                                <div className="dashboard-user-btns">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        type="button"
                                        className="dashboard-user-btn">
                                            Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(user.email)}
                                        type="button"
                                        className="dashboard-user-btn">
                                            Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
                {/* Show message when the end of user list is reached */}
            {usersListEnd && <p className="user-list-end">No more users to show.</p>}
            {/* Show next/prev pagination buttons when page is loaded */}
            {!loading &&
                <div className="dashboard-users-pagination">
                    <button
                        onClick={() => handlePagination("prev")}
                        className="dashboard-user-pagination-btn">
                            Prev
                    </button>
                    <button
                        onClick={() => handlePagination("next")}
                        className="dashboard-user-pagination-btn">
                            Next
                    </button>
                </div>
            }
        </div>
    )
}