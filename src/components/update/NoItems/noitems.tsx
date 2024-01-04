import React from "react";
import { Link } from "react-router-dom";

function noItems(props: { name: string }) {
  function openAddTask() {}

  return (
    <Link to="/add">
      <div className="list-view-item" onClick={() => openAddTask()}>
        <div className="list-view-item-left">
          <div className="container">
            <div className="round"></div>
          </div>
        </div>
        <div className="list-view-item-right">
          <div className="list-view-item-top">
            <div className="list-view-item-title">No {props.name}s</div>
          </div>
          <div className="list-view-item-bottom">
            <div className="list-view-item-description">
              Add a {props.name} to get started!
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default noItems;
