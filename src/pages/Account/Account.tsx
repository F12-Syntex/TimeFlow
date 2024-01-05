import PageHeader from "@/components/update/PageHeader/pageheader";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./account.css";
import React, { useEffect, useState } from "react";

function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function getLoginStatus() {
    fetch("http://localhost:3000/api/get-login-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data["cookie"][0].value != "" && data["cookie"][0].value != null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoggedIn(false);
      });
  }

  useEffect(() => {
    getLoginStatus();
  }, []);

  if (isLoggedIn) {
    return (
      <AccountPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    );
  } else {
    return <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
  }

}

function AccountPage({ isLoggedIn, setIsLoggedIn }: any) {
  function logout() {
    fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["cookie"].name === "user") {
          if (data["cookie"].value === "") {
            setIsLoggedIn(false);
            window.location.reload();
          }
        }
      });
  }

  return (
    <div className="main-page-container">
      <div className="header-bar">
        <h2>Account</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="page-content">
        <p>Account information and settings go here.</p>
      </div>
    </div>
  );
}

function LoginPage({ isLoggedIn, setIsLoggedIn }: any) {
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
          setIsLoggedIn(true);
          window.location.reload();
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
    <div className="auth-page-container">
      <PageHeader title="Login" editableView={false} />
      <div className="page-content">
        <div className="login-form">
          <div className="login-form-item">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="login-form-item">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="login-form-item-row">
            <div className="login-form-bottom-left">
              <button className="login-form-submit" onClick={login}>
                Login
              </button>
            </div>
            <div className="login-form-bottom-right">
              <Link className="login-form-submit" to="/register">
                <button>Register</button>
              </Link>
              <Link className="login-form-submit" to="/forgotpassword">
                <button>Forgot Password</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
