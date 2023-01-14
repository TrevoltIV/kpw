





export default function ManageTasks(props) {

    return (
        <div className="dashboard-content-home">
            <div className="dashboard-home-btn-wrapper">
                <button onClick={() => props.setPage("home")} type="button" className="dashboard-home-btn">Back to Home</button>
            </div>
            Manage Tasks Page
        </div>
    )
}