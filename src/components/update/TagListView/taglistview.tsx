import React, { useState, useEffect } from "react";
import TagItem from "express/src/types/TagItem";
import TagListItem from "../TagListItem/taglistitem";
import NoItems from "../NoItems/noitems";

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
      return;
    }
    // Fetch tag list on initial load
    fetchTagList();
  }, [tagListViewItems]); // Re-run this effect if the tagListViewItems prop changes

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
