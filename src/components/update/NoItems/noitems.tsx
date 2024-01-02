import React from "react";

function noItems(props: { name: string; } ) {

    function openAddTask() {
        // selectedtab = 0;
    }

	return (
		<div className="list-view-item" onClick={() => openAddTask()}>
		<div className="list-view-item-left">
		  <div className="container">
			<div className="round">

			</div>
		  </div>
		</div>
		<div className="list-view-item-right">
		  <div className="list-view-item-top">
			<div className="list-view-item-title">No {props.name}s</div>
		  </div>
		  <div className="list-view-item-bottom">
			<div className="list-view-item-description">Add a {props.name} to get started!</div>
		  </div>
		</div>
	  </div>
	);
  };

export default noItems;