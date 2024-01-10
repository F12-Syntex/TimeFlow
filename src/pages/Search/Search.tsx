import "./search.css";
import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import ListView from "../../components/update/ListView/listview";
import { useState, useEffect } from "react";
import TodoItemWithTags from "express/src/types/TodoItemWithTags";
import useFetchTaskList from "../../components/Functions/FetchTaskList/fetchTaskList";
import useFetchTagList from "@/components/Functions/FetchTagList/fetchTagList";
import TagListView from "@/components/update/TagListView/taglistview";

function Search({ listViewItems }: { listViewItems: TodoItemWithTags[] }) {
  const todoList = useFetchTaskList();
  const tagList = useFetchTagList();

  const [filteredList, setFilteredList] = useState(todoList);
  const [filteredTagList, setFilteredTagList] = useState(tagList);

  const parseDate = (date: Date): string => {
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    // Check if the date is today
    if (date.toDateString() === currentDate.toDateString()) {
      return "Today";
    }

    // Check if the date is tomorrow
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }

    // Check if the date is within the next 7 days
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    if (date.getTime() < nextWeek.getTime()) {
      const dayOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return dayOfWeek[date.getDay()];
    }

    // Return the date as mm/dd/yyyy for dates outside the range
    const formattedDate = new Date(date);
    const mm = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(formattedDate.getDate()).padStart(2, "0");
    const yyyy = formattedDate.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    // Filter the list of items based on the search text
    setFilteredList(
      todoList.filter((item) => {
        // is array item.labels

        return (
          item.title.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.priority.toLowerCase().includes(searchText) ||
          item.labels.some((label) =>
            label.name == null
              ? false
              : label.name.toLowerCase().includes(searchText)
          ) ||
          parseDate(item.date).toLowerCase().includes(searchText) ||
          String(item.completed).toLowerCase().includes(searchText)
        );
      }, [])
    );
    // Filter the list of tags based on the search text
    setFilteredTagList(
      tagList.filter((tag) => {
        return tag.name.toLowerCase().includes(searchText);
      }, [])
    );
  };

  useEffect(() => {
    setFilteredList(todoList); // Update the filtered list whenever todoList changes
    setFilteredTagList(tagList); // Update the filtered list whenever tagList changes
  }, [todoList, tagList]);

  return (
    <div className="main-page-container">
      <div className="search-page-content">
        <PageHeader title="Search" editableView={true} />
        <input
          type="text"
          className="search-search-bar"
          placeholder="Search"
          onChange={handleSearch}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "calc(100% - 64px)",
            marginTop: "-20px",
          }}
        >
          <PageHeader title="Tasks" editableView={false} />
        </div>
        <ListView listViewItems={filteredList} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "calc(100% - 64px)",
            marginTop: "-8px",
          }}
        >
          <PageHeader title="Tags" editableView={false} />
        </div>
        <TagListView tagListViewItems={filteredTagList} />
      </div>
    </div>
  );
}

export default Search;
