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
    <div className="auth-page-container">
      <PageHeader title="Forgot Password" editableView={false} />
      <div className="auth-page-content">
        <div className="login-form">
          <div className="login-form-item">
            <input type="text" id="email" name="email" placeholder="Email" />
          </div>
          <div className="login-form-item">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="login-form-item-row">
            <div className="login-form-bottom-left">
              <button className="login-form-submit" onClick={resetPassword}>
                Reset Password
              </button>
            </div>
            <div className="login-form-bottom-right">
              <Link className="login-form-submit" to="/account">
                <button>Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
