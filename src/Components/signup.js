//  SignupForm.js

import React, { useState } from "react";
import { signupForm } from "../api";
import "./signup.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupForm = () => {
  const [signupData, setSignupData] = useState({
    uname: "",
    email: "",
    psw: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupForm(signupData);
      console.log("User signed up successfully", response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container">
      <form id="signup-form" onSubmit={handleSubmit} className="login-form">
        <h2 id="title" className="mb-4 text-center">
          Sign up
        </h2>

        <div className="mb-3">
          <input
            id="namefield"
            type="text"
            className="form-control"
            placeholder="Username"
            name="uname"
            value={signupData.uname}
            onChange={handleChange}
          />
          <small className="text-danger" id="uname-validation"></small>
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            required
          />
          <small className="text-danger" id="uname-validation"></small>
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="psw"
            value={signupData.psw}
            onChange={handleChange}
            required
          />
          <small className="text-danger" id="pass-validation"></small>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="remember"
            id="remember"
            checked={signupData.remember}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="remember">
            Remember me
          </label>
        </div>
        <div className="d-grid gap-2">
          <button type="submit" id="signup-btn" className="btn btn-primary">
            Sign up
          </button>
          <a href="/login" aria-label="Already have an account?">
            Already have an account?
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
