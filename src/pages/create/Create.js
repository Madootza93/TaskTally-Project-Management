import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

// import styles
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "analysis", label: "Analysis" },
];


//customizing the create project form to change the predefined theme/css
const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "transparent",
    primary50: "#7f986f",
    primary75: "transparent",
    primary: "transparent",
    danger: "#fff",
    dangerLight: "#7f986f",
  },
});

const customSelectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    background:
      "linear-gradient(to bottom, rgba(245, 243, 244, 0.85) 0%, #D4CFCB 50%, rgba(245, 243, 244, 0.85) 100%)",
    opacity: 0.9,
    borderColor: isFocused ? "transparent" : "transparent",
    boxShadow: "none",
    border: "1px solid black",
  }),
  option: (styles, { isDisabled, isFocused }) => ({
    ...styles,
    backgroundColor: isFocused
      ? "linear-gradient(to bottom, #7f986f 0%, #7f986f 100%)"
      : "white",
    color: "black",
    fontWeight: "bold",
    cursor: isDisabled ? "not-allowed" : "default",
  }),
  menu: (styles) => ({
    ...styles,
    background:
      "linear-gradient(to bottom, rgba(245, 243, 244, 0.85) 0%, #D4CFCB 50%, rgba(245, 243, 244, 0.85) 100%)",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "linear-gradient(to bottom, #7f986f 0%, #7f986f 100%)",
    color: "black",
    fontWeight: "bold",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    cursor: "pointer",
    color: "black",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "black",
    fontWeight: "bold",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: "black",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "black",
  }),
};

export default function Create() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const [localNotification, setLocalNotification] = useState("");

  //form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalNotification("");

    if (!category) {
      setFormError("Please select a project category.");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user.");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };
    await addDocument(project);
    if (!response.error) {
      setName("");
      setDetails("");
      setDueDate("");
      setCategory("");
      setAssignedUsers([]);
      setLocalNotification("Successfully created project! Redirecting...");
      setTimeout(() => navigate("/"), 5000);
    } else {
      setLocalNotification("Error creating project");
    }
  };

  return (
    <div className="create-form">
      {localNotification && (
        <div className="form-notification">{localNotification}</div>
      )}
      <h2 className="create-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>

        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            className="custom-select"
            styles={customSelectStyles}
            theme={customTheme}
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            className="custom-select"
            styles={customSelectStyles}
            theme={customTheme}
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Add project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
