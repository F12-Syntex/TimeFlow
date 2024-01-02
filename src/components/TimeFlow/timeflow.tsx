import { useState } from "react";
import "./timeflow.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Inbox from "../../pages/Inbox/Inbox";
import Search from "../../pages/Search/Search";
import Add from "../../pages/Add/Add";
import Calendar from "../../pages/Calendar/Calendar";
import Tags from "../../pages/Tags/Tags";
import Account from "../../pages/Account/Account";

const buttonData = [
  { name: "plus", selectedName: "plus", component: <Add /> },
  { name: "search", selectedName: "search", component: <Search /> },
  { name: "inbox", selectedName: "inbox-fill", component: <Inbox /> },
  { name: "calendar", selectedName: "calendar-fill", component: <Calendar /> },
  { name: "tag", selectedName: "tag-fill", component: <Tags /> },
];

const TimeFlow = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);

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

  // gets a single button for the sidebar
  function getButton(index: number, selected: boolean) {
    return (
      <a
        className={getButtonClassName(index, selected)}
        onClick={() => setSelectedIndex(index)}
      >
        <i className={getIconClassName(index, selected)}></i>
      </a>
    );
  }

  // gets all the buttons for the sidebar
  function getButtons() {
    return (
      <div className="sidebar-buttons">
        {buttonData.map((button, index) => {
          // Use buttonData instead of undefined icons
          return getButton(index, index === selectedIndex);
        })}
      </div>
    );
  }

  const handlePersonButtonClick = () => {
    const classes = `sidebar-account-button sidebar-button ${selectedIndex === 5 ? "sidebar-selected" : ""}`;
    return (
      <a className={classes} onClick={() => setSelectedIndex(5)}>
        <i className="bi bi-person-fill"></i>
      </a>
    );
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <div className="sidebar-top">
          {getButtons()}
        </div>
        <div className="sidebar-bottom">
          {handlePersonButtonClick()}
        </div>
      </div>
      <div className="homepage-container">
        {selectedIndex === 5 ? (<Account />) : buttonData[selectedIndex].component}
      </div>
    </div>
  );
};

export default TimeFlow;
