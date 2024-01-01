import { useState } from "react";
import "./timeflow.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Today from "../../pages/Today/Today";
import Inbox from "../../pages/Inbox/Inbox";
import Search from "../../pages/Search/Search";
import Add from "../../pages/Add/Add";
import Calendar from "../../pages/Calendar/Calendar";
import Tags from "../../pages/Tags/Tags";

const buttonData = [
  { name: 'plus', selectedName: 'plus', component: <Add /> },
  { name: 'search', selectedName: 'search', component: <Search /> },
  { name: 'inbox', selectedName: 'inbox-fill', component: <Inbox /> },
  { name: 'calendar-day', selectedName: 'calendar-day-fill', component: <Today /> },
  { name: 'calendar', selectedName: 'calendar-fill', component: <Calendar /> },
  { name: 'tag', selectedName: 'tag-fill', component: <Tags /> },
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
        {buttonData.map((button, index) => { // Use buttonData instead of undefined icons
          return getButton(index, index === selectedIndex);
        })}
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="sidebar">{getButtons()}</div>
      <div className="homepage-container">{buttonData[selectedIndex].component}</div>
    </div>
  );
};

export default TimeFlow;
