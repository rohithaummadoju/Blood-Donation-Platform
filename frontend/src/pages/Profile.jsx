import React from "react";

const Profile = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">My Profile</h2>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value="Loading..."
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value="Loading..."
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value="Loading..."
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Blood Group</label>
            <input
              type="text"
              className="form-control"
              value="Loading..."
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value="Loading..."
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value="Loading..."
              readOnly
            />
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-primary">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;