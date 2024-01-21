import "./inbox.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import ListView from "../../components/update/ListView/listview";
import useFetchWebSocket from "@/components/Functions/FetchTaskList/fetchWebSocket";
import TodoItemWithTags from "express/src/types/TodoItemWithTags";
import { useState } from "react";

function Inbox() {
  const filterCompleted: boolean = false;
  const filterDate: Date = new Date();

  const [todoList, setTodoList] = useState<TodoItemWithTags[]>([]);

  useFetchWebSocket(setTodoList);

  return (
    <div className="main-page-container">
      <PageHeader title="Today" editableView={true} />
      <ListView listViewItems={todoList} filterDate={filterDate} />
      <PageHeader title="Inbox" editableView={false} />
      <ListView listViewItems={todoList} filterInverseDate={filterDate} />
    </div>
  );
}

export default Inbox;
