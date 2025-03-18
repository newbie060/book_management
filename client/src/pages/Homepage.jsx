import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import CSS for background styling

const HomePage = () => {
  return (
    <div>
        <div className="page-text">
            <h1>Welcome to CSIT VAULT</h1>
            <p>Your one-stop eLibrary for CSIT resources</p>
        </div>
        <div className="page-button">
            <Link hrefLang="">
              <button className="login-button">Login</button>
            </Link>
            
            <button className="signup-buttom">SignUp</button>
        </div>
            
    </div>
  );
};

export default HomePage;
