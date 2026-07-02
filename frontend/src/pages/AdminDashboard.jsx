import { useEffect, useState } from "react";
import API from "../services/api";
import {Chart as ChartJS,ArcElement,Tooltip,Legend} from "chart.js";
import { Pie } from "react-chartjs-2";
    ChartJS.register(ArcElement,Tooltip,Legend);
function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDonors: 0,
        totalRecipients: 0,
        totalRequests: 0,
        acceptedRequests: 0,
        rejectedRequests: 0,
        pendingRequests: 0
    });
    const [chartData, setChartData] = useState(null);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const statsResponse = await API.get("/api/admin/dashboard");
            setStats(statsResponse.data.stats);
            setChartData(statsResponse.data.chartData);
            const usersResponse = await API.get("/api/admin/users");
            setUsers(usersResponse.data.users);

            const requestsResponse = await API.get("/api/admin/requests");
            setRequests(requestsResponse.data.requests);
            const leaderboardResponse = await API.get("/api/admin/leaderboard");
            setLeaderboard(leaderboardResponse.data.leaderboard);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteUser = async (id, name) => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${name}?`
        );

        if (!confirmDelete) return;

        try {

            const response = await API.delete(`/api/admin/users/${id}`);

            alert(response.data.message);

            loadDashboard();

        } catch (error) {

            alert(error.response?.data?.message || "Unable to delete user");

        }

    };

    const deleteRequest = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blood request?"
        );

        if (!confirmDelete) return;

        try {

            const response = await API.delete(`/api/admin/requests/${id}`);

            alert(response.data.message);

            loadDashboard();

        } catch (error) {

            alert(error.response?.data?.message || "Unable to delete request");

        }

    };
    console.log("Dashboard Stats:", stats);

    return (

        <div className="container mt-5">

            <h2 className="text-center text-danger mb-5">
                🩸 Admin Dashboard
            </h2>

            {/* Statistics */}

            <div className="row">

                <div className="col-md-3 mb-4">
                    <div className="card bg-dark text-white shadow text-center">
                        <div className="card-body">
                            <h5>👤 Total Users</h5>
                            <h1>{stats.totalUsers}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card bg-danger text-white shadow text-center">
                        <div className="card-body">
                            <h5>🩸 Total Donors</h5>
                            <h1>{stats.totalDonors}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card bg-primary text-white shadow text-center">
                        <div className="card-body">
                            <h5>❤️ Total Recipients</h5>
                            <h1>{stats.totalRecipients}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card bg-warning text-dark shadow text-center">
                        <div className="card-body">
                            <h5>📩 Total Requests</h5>
                            <h1>{stats.totalRequests}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card bg-success text-white shadow text-center">
                        <div className="card-body">
                            <h5>✅ Accepted</h5>
                            <h1>{stats.acceptedRequests}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card bg-secondary text-white shadow text-center">
                        <div className="card-body">
                            <h5>❌ Rejected</h5>
                            <h1>{stats.rejectedRequests}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card bg-info text-white shadow text-center">
                        <div className="card-body">
                            <h5>⏳ Pending</h5>
                            <h1>{stats.pendingRequests}</h1>
                        </div>
                    </div>
                </div>

            </div>

            <hr className="my-5" />

            {/* Users */}
            <div className="card shadow mb-5">

                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0">
                        📊 Blood Request Status
                    </h4>
                </div>

                <div className="card-body text-center">

                    {chartData && (
                        <div
                            style={{
                                width: "400px",
                                margin: "0 auto"
                            }}
                        >
                        <Pie data={chartData} />
                        </div>
                    )}

                </div>

            </div>
            <div className="card shadow mb-5">

                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">
                        🏆 Top Blood Donors
                    </h4>
                </div>

                <div className="card-body">

                    {leaderboard.length === 0 ? (

                        <p className="text-center">
                            No donations yet.
                        </p>

                    ) : (

                        <table className="table table-striped">

                        <thead>

                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Blood Group</th>
                            <th>City</th>
                            <th>Total Donations</th>
                        </tr>

                    </thead>

                    <tbody>

                        {leaderboard.map((donor, index) => (

                            <tr key={donor._id}>

                                <td>
                                    {index === 0
                                        ? "🥇"
                                        : index === 1
                                        ? "🥈"
                                        : index === 2
                                        ? "🥉"
                                        : index + 1}
                                </td>

                                <td>{donor.name}</td>

                                <td>{donor.bloodGroup}</td>

                                <td>{donor.city}</td>

                                <td>
                                    <span className="badge bg-success">
                                        {donor.donations}
                                    </span>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
        </div>
            
            
            <h3 className="text-danger mb-4">
                Registered Users
            </h3>

            <div className="table-responsive">

                <table className="table table-bordered table-hover shadow">

                    <thead className="table-danger">

                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Blood Group</th>
                            <th>City</th>
                            <th>Availability</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user._id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>{user.bloodGroup || "-"}</td>

                                <td>{user.city || "-"}</td>

                                <td>

                                    {user.role === "Donor" ? (

                                        user.available ? (

                                            <span className="badge bg-success">
                                                Available
                                            </span>

                                        ) : (

                                            <span className="badge bg-danger">
                                                Not Available
                                            </span>

                                        )

                                    ) : (

                                        "-"

                                    )}

                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteUser(user._id, user.name)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <hr className="my-5" />

            {/* Blood Requests */}

            <h3 className="text-danger mb-4">
                All Blood Requests
            </h3>

            <div className="table-responsive">

                <table className="table table-bordered table-hover shadow">

                    <thead className="table-dark">

                        <tr>

                            <th>Recipient</th>
                            <th>Donor</th>
                            <th>Blood Group</th>
                            <th>Hospital</th>
                            <th>Units</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {requests.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center"
                                >
                                    No Blood Requests Found
                                </td>

                            </tr>

                        ) : (

                            requests.map((request) => (

                                <tr key={request._id}>

                                    <td>{request.recipient?.name}</td>

                                    <td>{request.donor?.name}</td>

                                    <td>{request.bloodGroup}</td>

                                    <td>{request.hospital}</td>

                                    <td>{request.units}</td>

                                    <td>

                                        <span
                                            className={
                                                request.status === "Accepted"
                                                    ? "badge bg-success"
                                                    : request.status === "Rejected"
                                                    ? "badge bg-danger"
                                                    : request.status === "Cancelled"
                                                    ? "badge bg-secondary"
                                                    : "badge bg-warning text-dark"
                                            }
                                        >
                                            {request.status}
                                        </span>

                                    </td>

                                    <td>
                                        {new Date(
                                            request.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteRequest(request._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminDashboard;