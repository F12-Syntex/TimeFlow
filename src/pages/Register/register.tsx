import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/update/PageHeader/pageheader";

function RegisterPage() {
  function register() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirm-password") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!email || !username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (!username.match(/^[a-zA-Z0-9_]+$/)) {
      alert("Username can only contain letters, numbers, and underscores");
      return;
    }

    fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["user"] != null) {
          window.location.href = "/";
        } else {
          alert("Error registering");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error) {
          alert("Error registering");
        }
      });
  }
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-x-hidden overflow-y-auto bg-white select-none dark:bg-zinc-900">
      <PageHeader title="Register" editableView={false} />
      <div className="login-form">
        <div className="login-form-item">
          <input
            className="btn"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
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
        <div className="login-form-item">
          <input
            className="btn"
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="login-form-item-row">
          <div className="login-form-bottom-left">
            <button className="login-form-submit btn" onClick={register}>
              Register
            </button>
          </div>
          <div className="login-form-bottom-right">
            <Link className="login-form-submit" to="/">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
