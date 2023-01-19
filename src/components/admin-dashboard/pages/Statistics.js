






export default function Statistics(props) {

    return (
        <div className="dashboard-content-home">
            <div className="dashboard-home-btn-wrapper">
                <button onClick={() => props.setPage("home")} type="button" className="dashboard-home-btn">Back to Home</button>
            </div>
            Statistics Page
        </div>
    )
}