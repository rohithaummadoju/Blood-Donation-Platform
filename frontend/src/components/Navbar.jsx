import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow">
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    🩸 Blood Donation
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    {/* Left Menu */}
                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/search">
                                Search Donor
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/request">
                                Request Blood
                            </Link>
                        </li>

                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                        )}

                    </ul>

                    {/* Right Menu */}
                    <ul className="navbar-nav">

                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-white fw-bold">
                                        Welcome, {user.name}
                                    </span>
                                </li>

                                <li className="nav-item">
                                    <button
                                        className="btn btn-light ms-2"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;