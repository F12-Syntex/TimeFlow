import React, { useState } from "react";
import TagListItem from "../TagListItem/taglistitem";
import TagItem from "../../../../express/src/types/TagItem";
import NoItems from "../NoItems/noitems";

interface ListViewProps {
  listViewItems: TagItem[];
}

function ListView({ listViewItems }: ListViewProps) {
  return (
    <div className="list-view-container">
      {(listViewItems.length === 0 && <NoItems name="tag" />) ||
        listViewItems.map((item) => <TagListItem item={item} />)}
    </div>
  );
}

export default ListView;
