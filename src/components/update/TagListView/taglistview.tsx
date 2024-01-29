import React, { useState, useEffect } from "react";
import TagItem from "express/src/types/TagItem";
import TagListItem from "../TagListItem/taglistitem";
import NoItems from "../NoItems/noitems";
import useFetchTagsWebSocket from "../../Functions/fetchWebSockets/fetchTagsWebSocket";

// optional prop tagListViewItems, use this if you want to pass in a list of tags to display
// otherwise, fetch the list of tags from the server
interface TagListProps {
  tagListViewItems?: TagItem[]; // Optional prop for the list of tags to display
}

const TagList: React.FC<TagListProps> = ({ tagListViewItems }) => {
  const [tagList, setTagList] = useState<TagItem[]>([]);

  useEffect(() => {
    if (tagListViewItems) {
      // If the tagListViewItems prop is passed in, use that
      setTagList(tagListViewItems);
    }
  }, [tagListViewItems]); // Re-run this effect if the tagListViewItems prop changes

  useFetchTagsWebSocket(setTagList);

  const handleTagDelete = (tagId: string) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) {
      return;
    }

    fetch(`http://localhost:3000/api/sample/tags/delete/${tagId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // After successful deletion, update the tag list state
        setTagList((prevTagList) =>
          prevTagList.filter((tag) => tag._id.toString() !== tagId),
        );
        // alert("Tag deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting tag: " + error);
      });
  };

  return (
<div className="grid gap-3 w-[calc(100%-64px)] grid-cols-[repeat(auto-fit,minmax(500px,1fr))]">
      {(tagList.length === 0 && <NoItems name="tag" />) ||
        tagList.map((item) => (
          <TagListItem
            key={String(item._id)}
            item={item}
            handleTagDelete={handleTagDelete}
          />
        ))}
    </div>
  );
};

export default TagList;
