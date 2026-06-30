import { useEffect, useState } from "react";
import API from "../services/api";

function RecipientDashboard() {

    const [requests, setRequests] = useState([]);

    const [pending, setPending] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [cancelled, setCancelled] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {

        try {

            const response = await API.get("/api/requests/recipient");

            const allRequests = response.data.requests;

            setRequests(allRequests);

            setPending(
                allRequests.filter(
                    (request) => request.status === "Pending"
                )
            );

            setAccepted(
                allRequests.filter(
                    (request) => request.status === "Accepted"
                )
            );

            setRejected(
                allRequests.filter(
                    (request) => request.status === "Rejected"
                )
            );

            setCancelled(
                allRequests.filter(
                    (request) => request.status === "Cancelled"
                )
            );

        } catch (error) {

            console.log(error);

        }

    };

    const cancel = async (id) => {

        try {

            await API.put(`/api/requests/${id}/cancel`);

            alert("Request Cancelled Successfully");

            loadRequests();

        } catch (error) {

            alert(error.response?.data?.message || "Unable to Cancel");

        }

    };

    const renderCard = (request, showCancel = false, badgeColor = "secondary") => (
        <div className="col-md-6 mb-4" key={request._id}>

            <div className="card shadow h-100">

                <div className="card-body">

                    <h5 className="text-danger">
                        Donor: {request.donor.name}
                    </h5>

                    <hr />

                    <p>
                        <strong>Blood Group:</strong> {request.donor.bloodGroup}
                    </p>

                    <p>
                        <strong>Phone:</strong> {request.donor.phone}
                    </p>

                    <p>
                        <strong>City:</strong> {request.donor.city}
                    </p>

                    <p>
                        <strong>Hospital:</strong> {request.hospital}
                    </p>

                    <p>
                        <strong>Units:</strong> {request.units}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span className={`badge bg-${badgeColor}`}>
                            {request.status}
                        </span>
                    </p>

                    {showCancel && (
                        <button
                            className="btn btn-danger mt-2"
                            onClick={() => cancel(request._id)}
                        >
                            Cancel Request
                        </button>
                    )}

                </div>

            </div>

        </div>
    );

    return (

        <div className="container mt-5">

            <h2 className="text-danger mb-4">
                🩸 My Blood Requests
            </h2>

            <div className="mb-4">

                <button
                    className="btn btn-primary"
                    onClick={loadRequests}
                >
                    🔄 Refresh Requests
                </button>

            </div>

            {/* Pending */}

            <h3 className="text-warning mb-3">
                🟡 Pending Requests
            </h3>

            <div className="row mb-5">

                {pending.length === 0 ? (

                    <p>No Pending Requests</p>

                ) : (

                    pending.map((request) =>
                        renderCard(request, true, "warning")
                    )

                )}

            </div>

            {/* Accepted */}

            <h3 className="text-success mb-3">
                🟢 Accepted Requests
            </h3>

            <div className="row mb-5">

                {accepted.length === 0 ? (

                    <p>No Accepted Requests</p>

                ) : (

                    accepted.map((request) =>
                        renderCard(request, false, "success")
                    )

                )}

            </div>

            {/* Rejected */}

            <h3 className="text-danger mb-3">
                🔴 Rejected Requests
            </h3>

            <div className="row mb-5">

                {rejected.length === 0 ? (

                    <p>No Rejected Requests</p>

                ) : (

                    rejected.map((request) =>
                        renderCard(request, false, "danger")
                    )

                )}

            </div>

            {/* Cancelled */}

            <h3 className="text-secondary mb-3">
                ⚫ Cancelled Requests
            </h3>

            <div className="row">

                {cancelled.length === 0 ? (

                    <p>No Cancelled Requests</p>

                ) : (

                    cancelled.map((request) =>
                        renderCard(request, false, "secondary")
                    )

                )}

            </div>

        </div>

    );

}

export default RecipientDashboard;