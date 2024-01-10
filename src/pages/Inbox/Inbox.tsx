import "./inbox.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import ListView from "../../components/update/ListView/listview";
import useFetchTaskList from '../../components/Functions/FetchTaskList/fetchTaskList'
import TodoItemWithTags from "express/src/types/TodoItemWithTags";

function Inbox({ listViewItems }: { listViewItems: TodoItemWithTags[] }) {
  
  const filterCompleted: boolean = false;
  const filterDate: Date = new Date();

  const todoList = useFetchTaskList();

  return (
    <div className="main-page-container">
      <div className="page-content">
        <PageHeader title="Today" editableView={true} />
        <ListView listViewItems={todoList || listViewItems} filterDate={filterDate} />
        <PageHeader title="Inbox" editableView={false} />
        <ListView listViewItems={todoList || listViewItems} filterInverseDate={filterDate} />
      </div>
    </div>
  );
}

export default Inbox;
