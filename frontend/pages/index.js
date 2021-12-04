import { useEffect, useState } from "react";
import config from "../config";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/Home.module.css";
import capitalizeFirstLetter from "../lib/capitalize";

export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errors: {
      username: "",
      password: "",
    },
    success: "",
    error: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      fetch(config.url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      }).then(async (res) => {
        let json = await res.json();
        if (res.status == 200) {
          setFormData({
            ...formData,
            success: json.msg,
            error: "",
          });
        } else {
          setFormData({
            ...formData,
            error: json.msg,
            success: "",
          });
        }
      });
    } else {
      setFormData({
        ...formData,
        error: "Inputs are not valid",
        success: "",
      });
    }
  };

  const handleErrors = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          [name]: `${capitalizeFirstLetter(name)} is required`,
        },
        error: "",
        success: "",
      });
    } else {
      setFormData({
        ...formData,
        errors: {
          [name]: "",
        },
        error: "",
        success: "",
      });
    }
  };

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Simple Log in</h3>
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Email address</label>
                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  id="username"
                  className="form-control form-control-sm"
                  onBlur={handleErrors}
                  value={formData.username}
                />
                <div>{formData.errors.username}</div>
                <br />
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  onChange={handleChange}
                  onBlur={handleErrors}
                  className="form-control form-control-sm"
                  id="password"
                  type="password"
                  value={formData.password}
                />
                <div>{formData.errors.password}</div>
                <br />
                {formData.success && (
                  <div className="alert alert-success">{formData.success}</div>
                )}
                {formData.error && (
                  <div className="alert alert-danger">{formData.error}</div>
                )}
                <button className="btn btn-primary btn-block" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
