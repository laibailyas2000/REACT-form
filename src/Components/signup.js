import React, { useState } from "react";
import "../signup.css";

const SignupForm = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const signupValidation = () => {
    console.log("vaidatuons runeddd");
    const name = signupData.name.trim();
    if (name.length < 5) {
      document.getElementById("name-validation").innerText =
        "Name must be at least 5 characters";
      return false;
    } else {
      document.getElementById("name-validation").innerText = "";
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signupValidation()) {
      console.log("Form validation failed");
      return;
    }

    try {
      const response = await fetch("http://localhost:1000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.status === 400) {
        window.alert("Email already exists");
      } else if (!response.ok) {
        console.log("Server side error");
      }

      const data = await response.json();
      console.log("Data from server:", data.message);

      if (data.message === "signup data inserted successfully") {
        console.log("signup successful");
        window.alert("signup successful");
      } else {
        console.error("signup failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form id="signup-form" onSubmit={handleSubmit} className="abc">
            <h2 id="title" className="mb-4 text-center">
              Sign up
            </h2>
            <div className="mb-3">
              <input
                id="namefield"
                type="text"
                className="form-control"
                placeholder="Username"
                name="name"
                value={signupData.name}
                onChange={handleChange}
              />
              <small className="text-danger" id="name-validation"></small>
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />
              <small className="text-danger"></small>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
              <small className="text-danger"></small>
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
      </div>
    </div>
  );
};

export default SignupForm;
