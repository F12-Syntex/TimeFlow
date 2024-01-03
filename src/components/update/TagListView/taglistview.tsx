import React, { useState } from "react";
import TagListItem from "../TagListItem/taglistitem";
import TagItem from "../../../../express/src/types/TagItem";
import NoItems from "../NoItems/noitems";

interface ListViewProps {
  listViewItems: TagItem[];
}

function ListView({
  listViewItems,
}: ListViewProps) {
  let filteredItems = listViewItems;

  return (
    <div>
      {(filteredItems.length === 0 && (
		<NoItems name="tag" />
      )) ||
		  filteredItems.map((item) => <TagListItem item={item} />)
    }
    </div>
  );
}

export default ListView;
