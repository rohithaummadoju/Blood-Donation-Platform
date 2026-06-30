import { useEffect, useState } from "react";
import API from "../services/api";

function DonorDashboard() {

    const [requests, setRequests] = useState([]);
    const [history, setHistory] = useState([]);
    const [available, setAvailable] = useState(true);

    const fetchRequests = async () => {

        try {

            // Incoming Requests
            const requestRes = await API.get("/api/requests/donor");
            setRequests(requestRes.data.requests);

            // Donation History
            const historyRes = await API.get("/api/requests/history");
            setHistory(historyRes.data.history);

            // Donor Profile
            const profileRes = await API.get("/api/users/profile");
            setAvailable(profileRes.data.user.available);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id, status) => {

        try {

            if (status === "Accepted") {

                await API.put(`/api/requests/${id}/accept`);

            } else {

                await API.put(`/api/requests/${id}/reject`);

            }

            alert(`Request ${status}`);

            fetchRequests();

        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        }

    };

    const changeAvailability = async () => {

        try {

            const newAvailability = !available;

            const response = await API.put(
                "/api/users/availability",
                {
                    available: newAvailability
                }
            );

            setAvailable(response.data.user.available);

            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert("Unable to update availability");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-danger mb-4">
                🩸 Donor Dashboard
            </h2>

            {/* Availability */}

            <div className="card shadow mb-5">

                <div className="card-body">

                    <h4>Availability</h4>

                    <h5
                        className={
                            available
                                ? "text-success"
                                : "text-danger"
                        }
                    >
                        {available
                            ? "🟢 Available"
                            : "🔴 Not Available"}
                    </h5>

                    <button
                        className="btn btn-outline-danger mt-2"
                        onClick={changeAvailability}
                    >
                        Change Availability
                    </button>

                </div>

            </div>

            {/* Incoming Requests */}

            <h3 className="text-danger mb-4">
                Incoming Blood Requests
            </h3>

            {requests.filter(req => req.status === "Pending").length === 0 ? (

                <div className="alert alert-info">
                    No pending blood requests.
                </div>

            ) : (

                requests
                    .filter(req => req.status === "Pending")
                    .map((req) => (

                        <div
                            className="card shadow mb-4"
                            key={req._id}
                        >

                            <div className="card-body">

                                <h4>
                                    {req.recipient?.name}
                                </h4>

                                <hr />

                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {req.recipient?.phone}
                                </p>

                                <p>
                                    <strong>City:</strong>{" "}
                                    {req.city}
                                </p>

                                <p>
                                    <strong>Hospital:</strong>{" "}
                                    {req.hospital}
                                </p>

                                <p>
                                    <strong>Blood Group:</strong>{" "}
                                    {req.bloodGroup}
                                </p>

                                <p>
                                    <strong>Units:</strong>{" "}
                                    {req.units}
                                </p>

                                <p>
                                    <strong>Reason:</strong>{" "}
                                    {req.reason}
                                </p>

                                <p>
                                    <strong>Urgency:</strong>{" "}

                                    <span className="badge bg-danger">
                                        {req.urgency}
                                    </span>

                                </p>

                                <p>

                                    <strong>Status:</strong>{" "}

                                    <span className="badge bg-warning text-dark">

                                        {req.status}

                                    </span>

                                </p>

                                <button
                                    className="btn btn-success me-2"
                                    onClick={() =>
                                        updateStatus(
                                            req._id,
                                            "Accepted"
                                        )
                                    }
                                >
                                    Accept
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        updateStatus(
                                            req._id,
                                            "Rejected"
                                        )
                                    }
                                >
                                    Reject
                                </button>

                            </div>

                        </div>

                    ))

            )}

            <hr className="my-5" />

            {/* Donation History */}

            <h3 className="text-success mb-4">
                🩸 Donation History
            </h3>

            {history.length === 0 ? (

                <div className="alert alert-secondary">

                    No completed donations yet.

                </div>

            ) : (

                history.map((item) => (

                    <div
                        className="card shadow mb-3"
                        key={item._id}
                    >

                        <div className="card-body">

                            <h5>

                                {item.recipient?.name}

                            </h5>

                            <p>

                                <strong>Blood Group:</strong>{" "}

                                {item.bloodGroup}

                            </p>

                            <p>

                                <strong>Hospital:</strong>{" "}

                                {item.hospital}

                            </p>

                            <p>

                                <strong>Units:</strong>{" "}

                                {item.units}

                            </p>

                            <p>

                                <strong>Date:</strong>{" "}

                                {new Date(
                                    item.updatedAt
                                ).toLocaleDateString()}

                            </p>

                            <span className="badge bg-success">

                                {item.status}

                            </span>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default DonorDashboard;