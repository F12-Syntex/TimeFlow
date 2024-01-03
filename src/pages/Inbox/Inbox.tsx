import "./inbox.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import ListView from "../../components/update/ListView/listview";
import React, { useEffect, useState } from "react";
import TodoItem from "../../../express/src/types/TodoItem";

function App({ listViewItems }: { listViewItems: TodoItem[] }) {
  
  const filterCompleted: boolean = false;
  const filterDate: Date = new Date();

  return (
    <div className="main-page-container">
      <div className="page-content">
        <PageHeader title="Today" editableView={true} />
        <ListView listViewItems={listViewItems} filterDate={filterDate} />
        <PageHeader title="Inbox" editableView={false} />
        <ListView listViewItems={listViewItems} filterInverseDate={filterDate} />
      </div>
    </div>
  );
}

export default App;
