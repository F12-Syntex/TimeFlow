import "./search.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import ListView from "../../components/update/ListView/listview";
import { useEffect, useState } from "react";
import TodoItemWithTags from "express/src/types/TodoItemWithTags";
import TagListView from "@/components/update/TagListView/taglistview";
import TagItem from "express/src/types/TagItem";

function Search() {
  const [todoList, setTodoList] = useState<TodoItemWithTags[]>([]);
  const [tagList, setTagList] = useState<TagItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
      setSocket(newSocket);
    });

    newSocket.addEventListener("message", handleSearchResponse);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  function performSearch() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const searchTerm = searchText.toLowerCase();
      const message = JSON.stringify({ searchTerm });
      socket.send(message);
    }
  }

  const handleSearchResponse = (event: MessageEvent) => {
    const response = JSON.parse(event.data);
    setTodoList(response.tasks);
    setTagList(response.tags);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  useEffect(() => {
    performSearch();
  }, [searchText, socket]);

  return (
    <div className="main-page-container">
      <PageHeader title="Search" editableView={true} />
      <input
        type="text"
        className="search-search-bar"
        placeholder="Search"
        onChange={handleInputChange}
      />
      <div className="subheader-bar">
        <PageHeader title="Tasks" editableView={false} />
      </div>
      <ListView listViewItems={todoList} />
      <div className="subheader-bar">
        <PageHeader title="Tags" editableView={false} />
      </div>
      <TagListView tagListViewItems={tagList} />
    </div>
  );
}

export default Search;
