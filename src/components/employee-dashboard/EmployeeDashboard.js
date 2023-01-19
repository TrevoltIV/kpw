
import Header from '../main/Header'



export default function EmployeeDashboard(props) {

    return (
        <div className="dashboard-wrapper">
            <Header page="dashboard" />
            <h1>Dashboard</h1>
            <div className="dashboard-user-status">
                <p className="dashboard-user-status-text">Logged in as: {props.userData.username}</p>
                <p className="dashboard-user-status-text">User status: Employee</p>
            </div>
            <div className="dashboard-content">
                <button
                    className="dashboard-logout-btn"
                    type="button"
                    onClick={() => props.setLogout(true)}>
                        Logout
                </button>
            </div>
        </div>
    )
}