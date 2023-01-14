import './admindashboard.css'
import Header from '../Header'
import Home from './Home'
import ManageUsers from './ManageUsers'
import ManageJobs from './ManageJobs'
import ManageTasks from './ManageTasks'
import Statistics from './Statistics'
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