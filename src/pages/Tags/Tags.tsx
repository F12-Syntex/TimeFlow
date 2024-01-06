import "./tags.css";
import "../pages.css";
import PageHeader from "@/components/update/PageHeader/pageheader";
import TagListView from "@/components/update/TagListView/taglistview";
import useFetchTagList from "@/components/Functions/FetchTagList/fetchTagList";

function App() {
  const tagList = useFetchTagList();

  return (
    <div className="main-page-container">
      <PageHeader title="Tags" editableView={true} />
      <div className="page-content">
        <TagListView listViewItems={tagList} />
      </div>
    </div>
  );
}

export default App;
