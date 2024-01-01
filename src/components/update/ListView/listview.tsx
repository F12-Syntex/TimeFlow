import "../ListView/listview.css";
import React from "react";
import ListItem from "../ListItem/listitem";
import TodoItem from "../../../../express/src/types/TodoItem";

interface ListViewProps {
  listViewItems: TodoItem[];
}

function ListView({ listViewItems }: ListViewProps) {
  const openTask = () => {
    console.log("Open task");
  };

  return (
    <div className="list-view">
      {listViewItems.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ListView;
