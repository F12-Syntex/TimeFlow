import PageHeader from "@/components/update/PageHeader/pageheader";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./account.css";
import React from "react";

function Account() {
    const isLoggedIn = false;

    if (isLoggedIn) {
        return AccountPage();
    } else {
        return LoginPage();
    }
}

function AccountPage() {
    return (
        <div className="main-page-container">
            <PageHeader title="Account" editableView={false} />
            <p>Account information goes here</p>
        </div>
    );
}
function LoginPage() {

    function login() {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

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
                    window.location.href = '/';
                } else {
                    alert('Error logging in');
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
function RegisterPage() {
    return (
        <div className="main-page-container">
            <PageHeader title="Register" editableView={false} />
            <div className="page-content">
                <div className="register-form">
                    <div className="register-form-item">
                        <input type="text" id="username" name="username" placeholder="Username" />
                    </div>
                    <div className="register-form-item">
                        <input type="password" id="password" name="password" placeholder="Password" />
                    </div>
                    <div className="register-form-item">
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" />
                    </div>
                    <div className="register-form-item-row">
                        <div className="register-form-bottom-left">
                            <button className="register-form-submit">Register</button>
                        </div>
                        <div className="register-form-bottom-right">
                            <Link className="register-form-submit" to="/login"><button>Login</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function ForgotPasswordPage() {
    return (
        <div className="main-page-container">
            <PageHeader title="Forgot Password" editableView={false} />
            <div className="page-content">
                <div className="forgot-password-form">
                    <div className="forgot-password-form-item">
                        <input type="text" id="username" name="username" placeholder="Username" />
                    </div>
                    <div className="forgot-password-form-item-row">
                        <div className="forgot-password-form-bottom-left">
                            <button className="forgot-password-form-submit">Reset Password</button>
                        </div>
                        <div className="forgot-password-form-bottom-right">
                            <Link className="forgot-password-form-submit" to="/login"><button>Login</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;