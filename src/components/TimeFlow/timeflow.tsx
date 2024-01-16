import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./timeflow.css";
import "../../pages/pages.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Inbox from "../../pages/Inbox/Inbox";
import Search from "../../pages/Search/Search";
import Calendar from "../../pages/Calendar/Calendar";
import Tags from "../../pages/Tags/Tags";
import Account from "../../pages/Account/Account";
import RegisterPage from "../../pages/Register/register";
import ForgotPasswordPage from "../../pages/ForgotPassword/forgotPassword";
import useFetchTaskList from "../../components/Functions/FetchTaskList/fetchTaskList";
import AddModal from "../../components/update/AddModal/addmodal";
import LoginPage from "../../pages/Login/login";

const TimeFlow = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(2);

  const todoList = useFetchTaskList();

  useEffect(() => {
    getLoginStatus();

    // check which page is currently being viewed and set the selected index accordingly
    const currentPath = window.location.pathname;
    if (currentPath === "/search") {
      setSelectedIndex(1);
    } else if (currentPath === "/inbox") {
      setSelectedIndex(2);
    } else if (currentPath === "/calendar") {
      setSelectedIndex(3);
    } else if (currentPath === "/tags") {
      setSelectedIndex(4);
    } else if (currentPath === "/account") {
      setSelectedIndex(5);
    }
  }, []);

  // State for Add modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [previousSelectedIndex, setPreviousSelectedIndex] = useState(2);

  // Open Add modal
  function openAddModal() {
    setPreviousSelectedIndex(selectedIndex);
    setSelectedIndex(0);
    setIsAddModalOpen(true);
  }

  function closeAddModal() {
    setSelectedIndex(previousSelectedIndex);
    setIsAddModalOpen(false);
  }

  // array of button data
  const buttonData = [
    {
      name: "plus",
      selectedName: "plus",
      path: "",
      component: <></>,
    },
    {
      name: "search",
      selectedName: "search",
      path: "/search",
      component: <Search listViewItems={todoList} />,
    },
    {
      name: "inbox",
      selectedName: "inbox-fill",
      path: "/inbox",
      component: <Inbox listViewItems={todoList} />,
    },
    {
      name: "calendar",
      selectedName: "calendar-fill",
      path: "/calendar",
      component: <Calendar />,
    },
    {
      name: "tag",
      selectedName: "tag-fill",
      path: "/tags",
      component: <Tags />,
    },
  ];

  // gets the classes for the icon
  function getIconClassName(index: number, selected: boolean) {
    if (selected) {
      return `bi bi-${buttonData[index].selectedName}`;
    }
    return `bi bi-${buttonData[index].name}`;
  }

  // get the classes for the button
  function getButtonClassName(index: number, selected: boolean) {
    if (selected) {
      if (index === 0) {
        return `sidebar-add sidebar-add-selected`;
      }
      return `sidebar-button sidebar-selected`;
    }
    if (index === 0) {
      return `sidebar-add`;
    }
    return `sidebar-button`;
  }

  const handlePersonButtonClick = () => {
    const classes = `sidebar-account-button sidebar-button ${
      selectedIndex === 5 ? "sidebar-selected" : ""
    }`;
    return (
      <Link
        to="/account"
        className={classes}
        onClick={() => setSelectedIndex(5)}
      >
        <i className="bi bi-person-fill"></i>
      </Link>
    );
  };

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

  // control or cmd n to open add modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "n") {
          openAddModal();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // control or cmd f to open search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "f") {
          setSelectedIndex(1);
          navigate("/search");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigator, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "1") {
          if (isAddModalOpen) {
            closeAddModal();
            setSelectedIndex(previousSelectedIndex);
          } else {
            setPreviousSelectedIndex(selectedIndex);
            openAddModal();
            setSelectedIndex(0);
          }
        } else if (event.key === "2") {
          setSelectedIndex(1);
          navigate("/search");
        } else if (event.key === "3") {
          setSelectedIndex(2);
          navigate("/inbox");
        } else if (event.key === "4") {
          setSelectedIndex(3);
          navigate("/calendar");
        } else if (event.key === "5") {
          setSelectedIndex(4);
          navigate("/tags");
        } else if (event.key === "6") {
          setSelectedIndex(5);
          navigate("/account");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigator, selectedIndex]);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} key={5} />
        <Route path="/account" element={<Account />} key={5} />
        <Route path="/register" element={<RegisterPage />} key={5} />
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPage />}
          key={5}
        />
        {buttonData.map((button, index) => (
          <Route key={index} path={button.path} element={button.component} />
        ))}
      </Routes>
    );
  }

  return (
    <div className="main-container">
      <div className="sidebar">
        <div className="sidebar-buttons sidebar-top">
          {/* Render sidebar buttons */}
          {buttonData.map((button, index) => (
            <div key={index}>
              {/* For "Add" button, open modal; for other buttons, handle navigation */}
              {index === 0 ? (
                <button
                  className={getButtonClassName(index, index === selectedIndex)}
                  onClick={openAddModal}
                >
                  <i
                    className={getIconClassName(index, index === selectedIndex)}
                  ></i>
                </button>
              ) : (
                <Link
                  to={button.path}
                  className={getButtonClassName(index, index === selectedIndex)}
                  onClick={() => setSelectedIndex(index)}
                >
                  <i
                    className={getIconClassName(index, index === selectedIndex)}
                  ></i>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="sidebar-bottom">{handlePersonButtonClick()}</div>
      </div>
      {isAddModalOpen && (
        <AddModal
          modal={isAddModalOpen}
          closeModal={closeAddModal}
          type="all"
        />
      )}

      <Routes>
        {/* Add route for Account/Login/Register/Forgot Password */}
        <Route path="/login" element={<Account />} key="login" />
        <Route path="/account" element={<Account />} key="account" />
        <Route path="/register" element={<RegisterPage />} key="register" />
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPage />}
          key="forgotPassword"
        />

        {/* default page inbox */}
        <Route path="/" element={<Inbox listViewItems={todoList} />} />

        {/* Add routes for other main sections */}
        <Route path="/inbox/*" element={<Inbox listViewItems={todoList} />} />

        {/* Add routes for Add/Search/Calendar/Tags */}
        {buttonData.map((button, index) => (
          <Route
            key={button.path}
            path={button.path}
            element={button.component}
          />
        ))}

        {/* Catch-all route (should be at the end) */}
        <Route path="/*" element={<Inbox listViewItems={todoList} />} />
      </Routes>
    </div>
  );
};

export default TimeFlow;
