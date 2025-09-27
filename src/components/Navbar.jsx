import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { useState } from 'react';
import Logo from './Logo';



export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <Logo size={32} />
        <span className="fw-bold">Vibbz</span>
        </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={isExpanded}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          {user && (
            <li className="nav-item">
              <NavLink to="/posts/create" className="nav-link">Create Post</NavLink>
            </li>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {!user ? (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={`/profiles/${user.name}`} className="nav-link">
                Hi, {user.name}
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
