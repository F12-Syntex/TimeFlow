import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/update/PageHeader/pageheader";

function ForgotPasswordPage() {
  function resetPassword() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;

    if (!email || !username) {
      alert("Please fill in all fields");
      return;
    }

    fetch("http://localhost:3000/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, username: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["user"] != null) {
          window.location.href = "/";
        } else {
          alert("Error resetting password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error) {
          alert("Error resetting password");
        }
      });
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-x-hidden overflow-y-auto bg-white select-none dark:bg-zinc-900">
      <PageHeader title="Forgot Password" editableView={false} />
      <div className="login-form">
        <div className="login-form-item">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="btn"
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
        <div className="login-form-item-row">
          <div className="login-form-bottom-left">
            <button className="login-form-submit btn" onClick={resetPassword}>
              Reset Password
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

export default ForgotPasswordPage;
