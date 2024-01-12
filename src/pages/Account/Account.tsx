import PageHeader from "@/components/update/PageHeader/pageheader";
import { Link } from "react-router-dom";
import "./account.css";

function AccountPage() {
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
            window.location.href = "/";
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

export default AccountPage;