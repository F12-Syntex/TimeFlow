import "./tags.css";
import "../pages.css";
import PageHeader from "@/components/update/PageHeader/pageheader";
import TagListView from "@/components/update/TagListView/taglistview";

function App() {
  return (
    <div className="main-page-container">
      <PageHeader title="Tags" editableView={true} />
      <TagListView />
    </div>
  );
}

export default App;
