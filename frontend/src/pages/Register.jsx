import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    city: "",
    address: "",
    role: "Donor",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await API.post("/register", formData);

        alert(response.data.message);

        console.log(response.data);

    } catch (error) {

        alert(error.response?.data?.message || "Registration Failed");

    }

};
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow-lg border-0">

            <div className="card-body p-5">

              <h2 className="text-center text-danger mb-4">
                🩸 Create Account
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Name */}

                <div className="mb-3">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}

                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}

                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Age */}

                <div className="mb-3">
                  <label className="form-label">Age</label>

                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Gender */}

                <div className="mb-3">
                  <label className="form-label">Gender</label>

                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>

                    <option>Male</option>

                    <option>Female</option>

                    <option>Other</option>

                  </select>
                </div>

                {/* Blood Group */}

                <div className="mb-3">
                  <label className="form-label">Blood Group</label>

                  <select
                    className="form-select"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Group</option>

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

                {/* City */}

                <div className="mb-3">
                  <label className="form-label">City</label>

                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}

                <div className="mb-3">
                  <label className="form-label">Address</label>

                  <textarea
                    className="form-control"
                    rows="3"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Role */}

                <div className="mb-4">
                  <label className="form-label">Role</label>

                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option>Donor</option>

                    <option>Recipient</option>

                  </select>
                </div>

                {/* Button */}

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                >
                  Register
                </button>

              </form>

              <p className="text-center mt-4">

                Already have an account?

                <Link
                  to="/login"
                  className="text-decoration-none ms-2"
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;