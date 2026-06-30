import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function RequestBlood() {

    const { donorId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        bloodGroup: "",
        hospital: "",
        city: "",
        units: 1,
        reason: "",
        urgency: "Normal"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                `/api/requests/${donorId}`,
                formData
            );

            alert(response.data.message);

            navigate("/recipient");

        } catch (error) {

            alert(error.response?.data?.message || "Request Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="text-danger mb-4">
                        Request Blood
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Blood Group</label>

                            <select
                                className="form-select"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>O+</option>
                                <option>O-</option>
                            </select>

                        </div>

                        <div className="mb-3">
                            <label>Hospital</label>
                            <input
                                className="form-control"
                                name="hospital"
                                value={formData.hospital}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>City</label>
                            <input
                                className="form-control"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Units Required</label>
                            <input
                                type="number"
                                className="form-control"
                                name="units"
                                value={formData.units}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Reason</label>
                            <textarea
                                className="form-control"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">

                            <label>Urgency</label>

                            <select
                                className="form-select"
                                name="urgency"
                                value={formData.urgency}
                                onChange={handleChange}
                            >
                                <option>Normal</option>
                                <option>Urgent</option>
                                <option>Emergency</option>
                            </select>

                        </div>

                        <button className="btn btn-danger w-100">
                            Send Request
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default RequestBlood;