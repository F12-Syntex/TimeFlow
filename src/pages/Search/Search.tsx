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
  const [filterCompleted, setFilterCompleted] = useState<boolean>(true);
  const [dimCompleted, setDimCompleted] = useState<boolean>(false);

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
    setTodoList(response["tasks"]);
    setTagList(response["tags"]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  useEffect(() => {
    performSearch();
  }, [searchText, socket]);

  return (
    <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none w-[calc(100vw-96px)] dark:bg-zinc-900">
      <PageHeader
        title="Search"
        editableView={true}
        filterCompleted={filterCompleted}
        setFilterCompleted={setFilterCompleted}
        dimCompleted={dimCompleted}
        setDimCompleted={setDimCompleted}
      />
      <input
        type="text"
        className="flex flex-row w-[calc(100%-96px)] p-4 search-input"
        placeholder="Search"
        value={searchText}
        onChange={handleInputChange}
      />
      <div className="relative text-left flex flex-row items-center justify-between select-none -mt-3 w-[calc(100%-64px)]">
        <PageHeader title="Tasks" editableView={false} />
      </div>
      <div>{filterCompleted}</div>
      <ListView listViewItems={todoList} filterCompleted={filterCompleted} filterInverseDate={null} dimCompleted={dimCompleted} />
      <div className="relative text-left flex flex-row items-center justify-between select-none -mt-3 w-[calc(100%-64px)]">
        <PageHeader title="Tags" editableView={false} />
      </div>
      <div className="w-[calc(100%)] mb-8 flex justify-center">
        <TagListView tagListViewItems={tagList} />
      </div>
    </div>
  );
}

export default Search;
