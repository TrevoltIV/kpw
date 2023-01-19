import './admindashboard.css'
import Header from '../main/Header'
import Home from './pages/Home'
import ManageUsers from './pages/ManageUsers'
import ManageJobs from './pages/ManageJobs'
import ManageTasks from './pages/ManageTasks'
import Statistics from './pages/Statistics'
import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'




export default function AdminDashboard(props) {
    const [page, setPage] = useState("home")

    return (
        <div className="dashboard-wrapper">
            <Header page="dashboard" />
            <div className="dashboard-header">
                <div className="dashboard-header-info">
                    <h1 className="dashboard-header-title">Dashboard</h1>
                    <p className="dashboard-user-status-text">Logged in as: {props.userData.username}</p>
                    <p className="dashboard-user-status-text">User status: Admin</p>
                </div>
                <div className="dashboard-header-btns">
                    <button onClick={() => setPage("manage-users")} type="button" className="dashboard-header-btn">Manage Users</button>
                    <button onClick={() => setPage("manage-jobs")} type="button" className="dashboard-header-btn">Manage Jobs</button>
                    <button onClick={() => setPage("manage-tasks")} type="button" className="dashboard-header-btn">Manage Tasks</button>
                    <button onClick={() => setPage("statistics")} type="button" className="dashboard-header-btn">Statistics</button>
                </div>
            </div>
            <div className="dashboard-content">
                {page === "home" &&
                    <Home
                        setPage={setPage}
                    />
                }
                {page === "manage-users" &&
                    <ManageUsers
                        setPage={setPage}
                    />
                }
                {page === "manage-jobs" &&
                    <ManageJobs
                        setPage={setPage}
                    />
                }
                {page === "manage-tasks" &&
                    <ManageTasks
                        setPage={setPage}
                    />
                }
                {page === "statistics" &&
                    <Statistics
                        setPage={setPage}
                    />
                }
            </div>
        </div>
    )
}