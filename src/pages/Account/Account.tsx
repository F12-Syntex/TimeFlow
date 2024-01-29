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
    <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none w-[calc(100vw-96px)] dark:bg-zinc-900">
      <div className="relative text-left flex flex-row items-center justify-between select-none pt-2 -mb-2 w-[calc(100%-64px)]">
        <h2>Account</h2>
        <button onClick={logout}>Logout</button>
      </div>
      <p>Account information and settings go here.</p>
    </div>
  );
}

export default AccountPage;
