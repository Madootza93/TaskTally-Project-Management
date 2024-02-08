import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


//styles & images
import "./Navbar.css";
import Done from "../assets/done.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <div className="logo-content">
            <img src={Done} alt="done logo" />
            <span>TaskTally</span>
          </div>
        </li>
        <div className="motto">
           <p>"Organize, Track, and Thrive: A Unified Platform for All Your Projects."</p>
        </div>
       
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
