import "../pages.css";
import PageHeader from "@/components/update/PageHeader/pageheader";
import TagListView from "@/components/update/TagListView/taglistview";

function App() {
  return (
    <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none w-[calc(100vw-96px)] dark:bg-zinc-900">
      <PageHeader title="Tags" editableView={true} />
      <div className="w-[calc(100%)] mb-8 flex justify-center">
        <TagListView />
      </div>
    </div>
  );
}

export default App;
