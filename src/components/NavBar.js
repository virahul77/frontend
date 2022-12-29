import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary text-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Sports Club
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                Rahul Vishwakarma
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  All Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/myevents">
                  My Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/createevent">
                  Create Event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/participate">
                  Participated Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pending">
                  Requested
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <Link className="btn btn-danger" to='/login'>
                Logout
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
