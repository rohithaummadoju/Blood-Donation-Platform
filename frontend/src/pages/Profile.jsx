import { useState, useEffect } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: ""
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await API.get("/api/users/profile");

      const profile = response.data.user;

      setUser(profile);

      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        city: profile.city || "",
        address: profile.address || ""
      });

    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };
  const handleCurrentLocation = () => {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported by your browser.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            try {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                await API.put("/api/users/location", {

                    latitude,
                    longitude

                });

                alert("Location saved successfully.");

                fetchProfile();

            } catch (error) {

                console.log(error);

                alert("Failed to save location.");

            }

        },

        (error) => {

            console.log(error);

            alert("Unable to fetch your location.");

        }

    );

 };
  const handleSave = async () => {

    try {

      const response = await API.put("/api/users/profile", formData);

      setUser(response.data.user);

      setEditing(false);

      alert("Profile Updated Successfully");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update profile"
      );

    }

  };

  const handleCancel = () => {

    setFormData({
      name: user.name,
      phone: user.phone,
      city: user.city,
      address: user.address || ""
    });

    setEditing(false);

  };

  if (loading) {

    return (
      <div className="container mt-5">
        <h3 className="text-center">
          Loading Profile...
        </h3>
      </div>
    );

  }

  return (

    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-header bg-danger text-white">

          <h3 className="mb-0">
            My Profile
          </h3>

        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                value={user.email}
                disabled
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Phone
              </label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Age
              </label>

              <input
                type="text"
                className="form-control"
                value={user.age}
                disabled
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Gender
              </label>

              <input
                type="text"
                className="form-control"
                value={user.gender}
                disabled
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Blood Group
              </label>

              <input
                type="text"
                className="form-control"
                value={user.bloodGroup}
                disabled
              />

            </div>
                        <div className="col-md-6 mb-3">

              <label className="form-label">
                City
              </label>

              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Address
              </label>

              <textarea
                className="form-control"
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Role
              </label>

              <input
                type="text"
                className="form-control"
                value={user.role}
                disabled
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Availability
              </label>

              <input
                type="text"
                className="form-control"
                value={user.available ? "Available" : "Unavailable"}
                disabled
              />

            </div>

          </div>

          <div className="text-center mt-4">
            {!editing ? (
              <button
                className="btn btn-primary me-2"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
              ) : (
              <>
              <button
              className="btn btn-success me-2"
              onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>

        )}

        <div className="mt-3">

            <button
                className="btn btn-warning"
                onClick={handleCurrentLocation}
            >
              📍 Use My Current Location
            </button>

            </div>
          </div>
        </div>

      </div>

    </div>

  );

}

export default Profile;