import React from "react";
import ReactDOM from "react-dom"; 
import "./index.css";
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; 
import App from "./App";



ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
