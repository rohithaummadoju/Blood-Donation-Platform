import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import SearchDonor from "./pages/SearchDonor";
import RequestBlood from "./pages/RequestBlood";

import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* Protected Routes */}
        <Route
          path="/donor"
          element={
            <PrivateRoute>
              <DonorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/request/:donorId"
          element={
            <PrivateRoute>
            <RequestBlood />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipient"
          element={
            <PrivateRoute>
              <RecipientDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchDonor />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;