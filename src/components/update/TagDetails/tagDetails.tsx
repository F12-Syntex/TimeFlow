import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../PageHeader/pageheader";
import TagItem from "express/src/types/TagItem";
import { ObjectId } from "mongodb";

function TagDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tag, setTag] = useState<TagItem>({} as TagItem);

  function formatDate(date: Date): string {
    const formattedDate = new Date(date);
    const mm = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(formattedDate.getDate()).padStart(2, "0");
    const yyyy = formattedDate.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  function getTagDetails() {
    const url = `http://localhost:3000/api/sample/tags/${id}`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(url, { method, headers })
      .then((response) => response.json())
      .then((data) => {
        setTag(data["tag"]);
        (document.getElementById("name") as HTMLInputElement).value =
            data["tag"].name;
        (document.getElementById("id") as HTMLInputElement).value =
          data["tag"]._id;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getTagDetails();
    getTags();
  }, []);

  const [tagList, setTagList] = useState<TagItem[]>([]);

  const getTags = () => {
    fetch("http://localhost:3000/api/sample/tags")
      .then((response) => response.json())
      .then((data) => {
        // Check if data.tags is an array
        if (Array.isArray(data.tags)) {
          // Manipulate the data to get TagItem array
          const parsedTagList: TagItem[] = data.tags.map((tag: any) => ({
            name: tag.name,
            _id: tag._id,
          }));
          setTagList(parsedTagList);
        } else {
          console.error("Invalid data format for tags");
        }
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  };

  return (
    <div className="main-page-container">
      <PageHeader title={tag.name} editableView={false} />
      <div className="page-content">
        <div className="add-task-form">
          <div className="add-task-form-item">
            <input type="text" id="name" name="title" placeholder="Title" />
          </div>
          <div className="add-task-form-item">
            <input type="hidden" id="id" name="id" />
          </div>

          <div className="add-task-form-item-row">
            <button className="add-task-form-submit">Save</button>
            <button className="add-task-form-submit">Delete</button>
            {/* link to whatever page came before (not static) */}
            <button
              className="add-task-form-submit"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TagDetails;
