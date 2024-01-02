import PageHeader from "@/components/update/PageHeader/pageheader";
import "./account.css";
import React from "react";

function Account() {
    const isLoggedIn = false;
    // fetch user info, if logged in then set isLoggedIn to true

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

    const redirectRegister = () => {
        // Redirect to the registration page
    }

    const redirectForgotPass = () => {
        // Redirect to the forgot password page
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
                            <button className="login-form-submit">Login</button>
                        </div>
                        <div className="login-form-bottom-right">
                            <button className="login-form-submit" onClick={() => redirectRegister()}>Register</button>
                            <button className="login-form-submit" onClick={() => redirectForgotPass()}>Forgot Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;