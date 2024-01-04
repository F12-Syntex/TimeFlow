import PageHeader from "@/components/update/PageHeader/pageheader";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./account.css";
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";

function Account() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function getLoginStatus() {
        // get data from cookie
        const cookie = document.cookie;
        console.log("cookie1:", cookie);
        if (cookie && cookie.includes("loggedIn=true")) {
            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        getLoginStatus();
    }, []);

    if (isLoggedIn) {
        return AccountPage();
    } else {
        return LoginPage();
    }
}

function AccountPage() {

    function logout() {
        document.cookie.split(";").forEach((cookie) => {
            const parts = cookie.split("=");
            const cookieName = parts.shift()
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
          });
        console.log('cookie:', document.cookie);
        window.location.href = '/';
    }

    return (
        <div className="main-page-container">
            <div className="header-bar">
            <h2>Account</h2>
                <button onClick={logout} >Logout</button>
            </div>
            <div className="page-content">
                <p>Account information goes here</p>
            </div>
        </div>
    );
}

function LoginPage() {

    function login() {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(response => response.json())
            .then(data => {
                if (data['user'] != null) {
                    ipcRenderer.on('cookie-from-main', (event, cookieData) => {
                        console.log('Received cookie in renderer:', cookieData);
                        document.cookie = cookieData;
                        console.log('cookie2:', document.cookie);
                    });
                    // window.location.href = '/';
                } else {
                    alert('Invalid username or password');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                if (error) {
                    alert('Error logging in');
                }
            });

    }

    return (
        <div className="main-page-container">
            <PageHeader title="Login" editableView={false} />
            <div className="page-content">
                <div className="login-form">
                    <div className="login-form-item">
                        <input type="text" id="username" name="username" placeholder="Username" />
                    </div>
                    <div className="login-form-item">
                        <input type="password" id="password" name="password" placeholder="Password" />
                    </div>
                    <div className="login-form-item-row">
                        <div className="login-form-bottom-left">
                            <button className="login-form-submit" onClick={login}>Login</button>
                        </div>
                        <div className="login-form-bottom-right">
                            <Link className="login-form-submit" to="/register"><button>Register</button></Link>
                            <Link className="login-form-submit" to="/forgotpassword"><button>Forgot Password</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;