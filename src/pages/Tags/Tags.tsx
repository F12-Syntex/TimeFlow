import "./tags.css";
import "../pages.css";
import PageHeader from "@/components/update/PageHeader/pageheader";
import TagListView from "@/components/update/TagListView/taglistview";
import useFetchTagList from "@/components/Functions/FetchTagList/fetchTagList";
import NoItems from "@/components/update/NoItems/noitems";

function App() {
  const tagList = useFetchTagList();
  
  return (
    <div className="main-page-container">
      <div className="page-content">
        <PageHeader title="Tags" editableView={true} />
        <TagListView />
      </div>
    </div>
  );
}

export default App;
