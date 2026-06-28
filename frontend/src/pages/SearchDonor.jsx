import { useState } from "react";

function SearchDonor() {

    const [bloodGroup, setBloodGroup] = useState("");

    const [city, setCity] = useState("");

    return (

        <div className="container mt-5">

            <h2 className="text-danger mb-4">

                Search Donors

            </h2>

            <div className="row">

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={bloodGroup}
                        onChange={(e)=>setBloodGroup(e.target.value)}
                    >

                        <option value="">Blood Group</option>

                        <option>O+</option>

                        <option>O-</option>

                        <option>A+</option>

                        <option>A-</option>

                        <option>B+</option>

                        <option>B-</option>

                        <option>AB+</option>

                        <option>AB-</option>

                    </select>

                </div>

                <div className="col-md-4">

                    <input

                        className="form-control"

                        placeholder="City"

                        value={city}

                        onChange={(e)=>setCity(e.target.value)}

                    />

                </div>

                <div className="col-md-4">

                    <button

                        className="btn btn-danger w-100"

                    >

                        Search

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SearchDonor;