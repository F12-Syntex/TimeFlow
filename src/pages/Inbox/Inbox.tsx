import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import ListView from "../../components/update/ListView/listview";
import useFetchWebSocket from "@/components/Functions/fetchWebSockets/fetchWebSocket";
import TodoItemWithTags from "express/src/types/TodoItemWithTags";
import { useState } from "react";

function Inbox() {
  const filterDate: Date = new Date();
  const [filterCompleted, setFilterCompleted] = useState<boolean>(false);
  const [dimCompleted, setDimCompleted] = useState<boolean>(false);

  const [todoList, setTodoList] = useState<TodoItemWithTags[]>([]);

  useFetchWebSocket(setTodoList);

  return (
    <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none w-[calc(100vw-96px)] dark:bg-zinc-900">
      <PageHeader title="Today" editableView={true} filterCompleted={filterCompleted} setFilterCompleted={setFilterCompleted} dimCompleted={dimCompleted} setDimCompleted={setDimCompleted} />
      <ListView listViewItems={todoList} filterDate={filterDate} filterCompleted={filterCompleted} dimCompleted={dimCompleted} />
      <div className="relative text-left flex flex-row items-center justify-between select-none -mt-3 w-[calc(100%-64px)]">
        <PageHeader title="Inbox" editableView={false} />
      </div>
      <div className="w-[calc(100%)] mb-8 flex justify-center">
        <ListView listViewItems={todoList} filterInverseDate={filterDate} filterCompleted={filterCompleted} dimCompleted={dimCompleted} />
      </div>
    </div>
  );
}

export default Inbox;
