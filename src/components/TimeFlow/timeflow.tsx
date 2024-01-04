import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./timeflow.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Inbox from "../../pages/Inbox/Inbox";
import Search from "../../pages/Search/Search";
import Add from "../../pages/Add/Add";
import Calendar from "../../pages/Calendar/Calendar";
import Tags from "../../pages/Tags/Tags";
import Account from "../../pages/Account/Account";
import RegisterPage from "../../pages/Register/register";
import ForgotPasswordPage from "../../pages/ForgotPassword/forgotPassword";
import TodoItem from "../../../express/src/types/TodoItem";
import TagItem from "../../../express/src/types/TagItem";
import TodoItemWithTags from "../../../express/src/types/TodoItemWithTags";
import { ObjectId } from "mongodb";

const TimeFlow = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [todoList, setTodoList] = useState<TodoItemWithTags[]>([]);
  const [tagList, setTagList] = useState<TagItem[]>([]);

  useEffect(() => {
    fetchTaskList();
    fetchTagList();
  }, []);

  const fetchTaskList = () => {
    fetch("http://localhost:3000/api/sample/tasks")
      .then((response) => response.json())
      .then((data) => {
        const tasks: TodoItem[] = data["tasks"];
        console.log(tasks.map((task) => task.labels));
        const fetchLabelPromises: Promise<TagItem[]>[] = tasks.map((task: TodoItem) =>
          Promise.all(
            task.labels.map((labelId: ObjectId) =>
              fetch(`http://localhost:3000/api/sample/tags/${labelId}`)
                .then((response) => response.json())
                .then((labelData: TagItem) => {
                  console.log(labelData);
                  return labelData;
                })
                .catch((error) => {
                  console.error("Error fetching label:", error);
                  return null;
                })
            )
          )
          .then((labelResults: (TagItem | null)[]) => labelResults.filter((label) => label !== null) as TagItem[])
        );
  
        Promise.all(fetchLabelPromises)
          .then((labelResults: TagItem[][]) => {
            const updatedTodoList: TodoItemWithTags[] = tasks.map((task: TodoItem, index: number) => ({
              user: "", // Add the missing user property
              title: task.title,
              description: task.description,
              date: new Date(task.date),
              priority: task.priority,
              labels: labelResults[index],
              completed: task.completed,
              _id: task._id,
            }));
            setTodoList(updatedTodoList);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };
  
  
  const fetchTagList = () => {
    fetch("http://localhost:3000/api/sample/tags")
      .then((response) => response.json())
      .then((data) => {
        const updatedTagList: TagItem[] = data["tags"].map(
          (element: TagItem) => ({
            name: element.name,
            _id: element._id,
          })
        );
        setTagList(updatedTagList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const buttonData = [
    { name: "plus", selectedName: "plus", path: "/add", component: <Add /> },
    { name: "search", selectedName: "search", path: "/search", component: <Search listViewItems={todoList} /> },
    { name: "inbox", selectedName: "inbox-fill", path: "/inbox", component: <Inbox listViewItems={todoList} /> },
    { name: "calendar", selectedName: "calendar-fill", path: "/calendar", component: <Calendar listViewItems={todoList} /> },
    { name: "tag", selectedName: "tag-fill", path: "/tags", component: <Tags listViewItems={tagList} /> },
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
      <Link to="/account" className={classes} onClick={() => setSelectedIndex(5)}>
        <i className="bi bi-person-fill"></i>
      </Link>
    );
  };

  return (
    <Router>
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-top">
            <div className="sidebar-buttons">
              {buttonData.map((button, index) => (
                <Link to={button.path} className={getButtonClassName(index, index === selectedIndex)} onClick={() => setSelectedIndex(index)}>
                  <i className={getIconClassName(index, index === selectedIndex)}></i>
                </Link>
              ))}
            </div>
          </div>
          <div className="sidebar-bottom">
            {handlePersonButtonClick()}
          </div>
        </div>
        <div className="homepage-container">
          <Routes>
          <Route path="/" element={<Inbox listViewItems={todoList} />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />

            <Route path="/account" element={<Account />} />
            {buttonData.map((button, index) => (
              <Route key={index} path={button.path} element={button.component} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default TimeFlow;
