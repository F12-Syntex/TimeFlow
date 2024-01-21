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
import AddModal from "../../components/update/AddModal/addmodal";
import LoginPage from "../../pages/Login/login";
import SidebarButton from "../SidebarButton/sidebarButton";
import { getLoginStatus } from "../Functions/utils";

const TimeFlow: React.FC = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previousSelectedIndex, setPreviousSelectedIndex] = useState(2);

  useEffect(() => {
    getLoginStatus(setIsLoggedIn);
    const currentPath = window.location.pathname;
    const index = buttonData.findIndex((button) => button.path === currentPath);
    setSelectedIndex(index !== -1 ? index : 2);
  }, []);

  const openAddModal = () => {
    setPreviousSelectedIndex(selectedIndex);
    setSelectedIndex(0);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setSelectedIndex(previousSelectedIndex);
    setIsAddModalOpen(false);
  };

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
      component: <Search />,
    },
    {
      name: "inbox",
      selectedName: "inbox-fill",
      path: "/inbox",
      component: <Inbox />,
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

  // Account button click handler
  const handlePersonButtonClick = () => (
    <Link
      to="/account"
      className={`sidebar-account-button sidebar-button ${
        selectedIndex === 5 ? "sidebar-selected" : ""
      }`}
      onClick={() => setSelectedIndex(5)}
    >
      <i className="bi bi-person-fill"></i>
    </Link>
  );

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const keyMap: {
        [key: string]: {
          action: (index: number, path: string) => void;
          index: number;
          path?: string;
        };
      } = {
        "1": { action: toggleModalOrNavigate, index: 0 },
        n: { action: closeAndSetPreviousIndex, index: 0 },
        "2": { action: closeAndNavigate, index: 1, path: "/search" },
        f: { action: closeAndNavigate, index: 1, path: "/search" },
        s: { action: closeAndNavigate, index: 1, path: "/search" },
        "3": { action: closeAndNavigate, index: 2, path: "/inbox" },
        i: { action: closeAndNavigate, index: 2, path: "/inbox" },
        "4": { action: closeAndNavigate, index: 3, path: "/calendar" },
        c: { action: closeAndNavigate, index: 3, path: "/calendar" },
        "5": { action: closeAndNavigate, index: 4, path: "/tags" },
        t: { action: closeAndNavigate, index: 4, path: "/tags" },
        "6": { action: closeAndNavigate, index: 5, path: "/account" },
        a: { action: closeAndNavigate, index: 5, path: "/account" },
      };

      const mapping = keyMap[key];

      if (event.ctrlKey || event.metaKey) {
        if (mapping) {
          mapping.action(mapping.index, mapping.path ?? "");
        }
      }
    };

    const toggleModalOrNavigate = (index: number, path: string) => {
      if (isAddModalOpen) {
        closeAndSetPreviousIndex();
      } else {
        setPreviousSelectedIndex(selectedIndex);
        openAddModal();
        setSelectedIndex(index);
        if (path) {
          navigate(path);
        }
      }
    };

    const closeAndSetPreviousIndex = () => {
      closeAddModal();
      setSelectedIndex(previousSelectedIndex);
    };

    const closeAndNavigate = (index: number, path: string) => {
      closeAddModal();
      setSelectedIndex(index);
      navigate(path);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAddModalOpen, navigate, selectedIndex, previousSelectedIndex]);

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
          <Route
            key={button.path}
            path={button.path}
            element={button.component}
          />
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
            <SidebarButton
              key={button.path}
              button={button}
              index={index}
              selectedIndex={selectedIndex}
              openAddModal={openAddModal}
              setSelectedIndex={setSelectedIndex}
            />
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
        <Route path="/" element={<Inbox />} />

        {/* Add routes for other main sections */}
        <Route path="/inbox/*" element={<Inbox />} />

        {/* Add routes for Add/Search/Calendar/Tags */}
        {buttonData.map((button, index) => (
          <Route
            key={button.path}
            path={button.path}
            element={button.component}
          />
        ))}

        {/* Catch-all route (should be at the end) */}
        <Route path="/*" element={<Inbox />} />
      </Routes>
    </div>
  );
};

export default TimeFlow;
