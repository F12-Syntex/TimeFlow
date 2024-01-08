import React from "react";
import { Link } from "react-router-dom";

function NoItems(props: { name: string }) {
  return (
    <Link to="/add" style={{ textDecoration: "none" }}>
      <div className="list-view-item">
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

export default NoItems;
