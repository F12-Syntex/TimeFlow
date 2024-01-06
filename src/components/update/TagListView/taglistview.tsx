// import React, { useState } from "react";
// import TagListItem from "../TagListItem/taglistitem";
// import TagItem from "../../../../express/src/types/TagItem";
// import NoItems from "../NoItems/noitems";

// interface ListViewProps {
//   listViewItems: TagItem[];
// }

// function ListView({ listViewItems }: ListViewProps) {

//   return (
//     <div className="list-view-container">
//       {(listViewItems.length === 0 && <NoItems name="tag" />) ||
//         listViewItems.map((item) => <TagListItem key={String(item._id)} item={item} />)}
//     </div>
//   );
// }

// export default ListView;

import React, { useState, useEffect } from "react";
import TagItem from "express/src/types/TagItem";
import TagListItem from "../TagListItem/taglistitem";
import NoItems from "../NoItems/noitems";

const TagList = () => {
  const [tagList, setTagList] = useState<TagItem[]>([]);

  useEffect(() => {
    // Fetch tag list on initial load
    fetchTagList();
  }, []);

  const fetchTagList = () => {
    fetch("http://localhost:3000/api/sample/tags")
      .then((response) => response.json())
      .then((data) => {
        setTagList(data.tags);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  };

  const handleTagDelete = (tagId: string) => {
    fetch(`http://localhost:3000/api/sample/tags/delete/${tagId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // After successful deletion, update the tag list state
        setTagList((prevTagList) =>
          prevTagList.filter((tag) => tag._id.toString() !== tagId)
        );
      })
      .catch((error) => {
        console.error("Error deleting tag:", error);
      });
  };

  return (
    <div className="list-view-container">
      {(tagList.length === 0 && <NoItems name="tag" />) ||
        tagList.map((item) => <TagListItem key={String(item._id)} item={item} handleTagDelete={handleTagDelete} />)}
    </div>
  );
};

export default TagList;
