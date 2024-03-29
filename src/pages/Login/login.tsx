import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/update/PageHeader/pageheader";
import "../Account/account.css";

function LoginPage() {
  function login() {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["user"] != null) {
          window.location.href = "/";
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error) {
          alert("Error logging in");
        }
      });
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-x-hidden overflow-y-auto bg-white select-none dark:bg-zinc-900">
      <PageHeader title="Login" editableView={false} />
      <div className="login-form">
        <div className="login-form-item">
          <input
            className="btn"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="login-form-item">
          <input
            className="btn"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="login-form-item-row">
          <div className="login-form-bottom-left">
            <button className="login-form-submit btn" onClick={login}>
              Login
            </button>
          </div>
          <div className="login-form-bottom-right">
            <Link className="login-form-submit" to="/register">
              <button className="btn">Register</button>
            </Link>
            <Link className="login-form-submit" to="/forgotpassword">
              <button className="btn">Forgot Password</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
