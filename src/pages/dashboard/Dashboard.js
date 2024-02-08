import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useLocation } from "react-router-dom"; 
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";
import ColorPicker from "../../components/ColorPicker";

// import styles
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation(); 

  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      // Clear the success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer); // Clear the timer when component unmounts
    }
  }, [location.state]);

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;

          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "development":
          case "design":
          case "analysis":
            console.log(document.category, currentFilter);
            return document.category === currentFilter;

          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      <ColorPicker />
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
