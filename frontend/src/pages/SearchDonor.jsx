import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SearchDonor() {
    const navigate = useNavigate();

    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [donors, setDonors] = useState([]);

    const handleSearch = async () => {
    try {
        const response = await API.get(
    `/api/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}&city=${encodeURIComponent(city)}`
);

        console.log("Response:", response.data);

        setDonors(response.data.donors);

    } catch (error) {
        console.log(error);
    }
};

    return (
        <div className="container mt-5">

            <h2 className="text-danger mb-4">Search Donors</h2>

            <div className="row mb-4">

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                    >
                        <option value="">Blood Group</option>
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

                <div className="col-md-4">
                    <input
                        className="form-control"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <button
                        className="btn btn-danger w-100"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

            </div>

            <div className="row">

                {donors.length === 0 ? (
                    <div className="text-center mt-4">
                        <h5>No donors found.</h5>
                    </div>
                ) : (
                    donors.map((donor) => (
                        <div className="col-md-4 mb-4" key={donor._id}>
                            <div className="card shadow h-100">
                                <div className="card-body">

                                    <h4>{donor.name}</h4>

                                    <p>
                                        <strong>Blood Group:</strong> {donor.bloodGroup}
                                    </p>

                                    <p>
                                        <strong>City:</strong> {donor.city}
                                    </p>

                                    <p>
                                        <strong>Phone:</strong> {donor.phone}
                                    </p>

                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() =>
                                            navigate(`/request/${donor._id}`)
                                        }
                                    >
                                        Request Blood
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default SearchDonor;