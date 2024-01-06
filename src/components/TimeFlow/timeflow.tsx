import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./timeflow.css";
import "../../pages/pages.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Inbox from "../../pages/Inbox/Inbox";
import Search from "../../pages/Search/Search";
import Add from "../../pages/Add/Add";
import Calendar from "../../pages/Calendar/Calendar";
import Tags from "../../pages/Tags/Tags";
import Account from "../../pages/Account/Account";
import RegisterPage from "../../pages/Register/register";
import ForgotPasswordPage from "../../pages/ForgotPassword/forgotPassword";
import TaskDetails from "../update/TaskDetails/taskDetails";
import TagDetails from "../update/TagDetails/tagDetails";
import useFetchTaskList from '../../components/Functions/FetchTaskList/fetchTaskList'
import useFetchTagList from '../../components/Functions/FetchTagList/fetchTagList'

const TimeFlow = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(2);

  const todoList = useFetchTaskList();

  useEffect(() => {
    getLoginStatus();
  }, []);

  // array of button data
  const buttonData = [
    { name: "plus", selectedName: "plus", path: "/add", component: <Add /> },
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

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Account />} key={5} />
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
      </Router>
    );
  }

  return (
    <Router>
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-top">
            <div className="sidebar-buttons">
              {buttonData.map((button, index) => (
                <Link
                  key={index} // Add the key prop with a unique value (in this case, the index)
                  to={button.path}
                  className={getButtonClassName(index, index === selectedIndex)}
                  onClick={() => setSelectedIndex(index)}
                >
                  <i
                    className={getIconClassName(index, index === selectedIndex)}
                  ></i>
                </Link>
              ))}
            </div>
          </div>
          <div className="sidebar-bottom">{handlePersonButtonClick()}</div>
        </div>
        {/* <div className="sidebar">
          <div className="sidebar-top">
            <div className="sidebar-buttons">
              {buttonData.map((button, index) => (
                <Link
                  to={button.path}
                  className={getButtonClassName(index, index === selectedIndex)}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="icon-text-container">
                    <i
                      className={getIconClassName(
                        index,
                        index === selectedIndex
                      )}
                    ></i>
                    <p className="icon-text">
                      {button.name.charAt(0).toUpperCase() +
                        button.name.slice(1)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="sidebar-bottom">{handlePersonButtonClick()}</div>
        </div> */}
        <div className="homepage-container">
          <Routes>
            <Route path="/" element={<Inbox listViewItems={todoList} />} />
            <Route
              path="/task/:id"
              element={<TaskDetails />}
              key={selectedIndex}
            />
            <Route
              path="/tag/:id"
              element={<TagDetails />}
              key={selectedIndex}
            />

            <Route path="/register" element={<RegisterPage />} key={5} />
            <Route
              path="/forgotPassword"
              element={<ForgotPasswordPage />}
              key={5}
            />
            <Route path="/login" element={<Account />} key={5} />
            <Route path="/account" element={<Account />} key={5} />

            {buttonData.map((button, index) => (
              <Route
                key={index}
                path={button.path}
                element={button.component}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default TimeFlow;
