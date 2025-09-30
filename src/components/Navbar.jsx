import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { useState } from 'react';
import logo  from '../assets/logo_dark.svg';
import defaultAvatar from '../assets/default-avatar.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsExpanded(false);
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavLinkClick = () => {
    setIsExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom px-3">
      <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
        <img src={logo} alt="Vibbz logo" width="100" height="50" />
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

      <div className={`collapse navbar-collapse position-relative ${isExpanded ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav me-auto">
          
          {user && (
            <>
            <li className="nav-item">
            <NavLink to="/" className="nav-link" onClick={handleNavLinkClick}>Home</NavLink>
            </li>
             <li className="nav-item">
              <NavLink to="/posts/create" className="nav-link" onClick={handleNavLinkClick}>Create Post</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profiles" className="nav-link" onClick={handleNavLinkClick}>Profiles</NavLink>
            </li>
          </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {!user ? (
            <>
              <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={handleNavLinkClick}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" onClick={handleNavLinkClick}>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link" onClick={handleNavLinkClick}>Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                    to={`/profiles/${user.name}`}
                    className="nav-link d-flex align-items-center gap-2"
                    onClick={handleNavLinkClick}
                  >
                    <img
                      src={user.avatar || defaultAvatar}
                      alt="avatar"
                      width="30"
                      height="30"
                      className="rounded-circle"
                      style={{ objectFit: 'cover' }}
                    />
                    <span>Hi, {user.name}</span>
                </Link>
              </li>

              {/* Desktop logout button */}
              <li className="nav-item d-none d-lg-block">
                <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile logout button - bottom right */}
        {user && (
          <div className="d-lg-none position-absolute end-0 bottom-0 m-3">
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
