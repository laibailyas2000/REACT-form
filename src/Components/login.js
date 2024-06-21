import React, { useState } from "react";
import "../login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    try {
      const response = await fetch("http://localhost:1000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.status === 401) {
        window.alert("Unauthorized: Incorrect email or password.");
      } else if (response.ok) {
        const data = await response.json();
        console.log("User logged in successfully");
        console.log("Token:", data.token);

        if (loginData.remember) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }

        navigate("/user");
      } else {
        window.alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <form
            id="login-form"
            onSubmit={handleSubmit}
            className="login-form active-form"
          >
            <h2 id="title" className="mb-4 text-center">
              Login
            </h2>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={loginData.email}
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
                name="password"
                value={loginData.password}
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
                checked={loginData.remember}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" id="login-btn" className="btn btn-primary">
                Log in
              </button>
              <a href="/signup" aria-label="Signup">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
