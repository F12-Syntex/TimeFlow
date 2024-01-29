import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import Calendar from "../../components/update/Calendar/calendar";

function App() {
  return (
    <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none w-[calc(100vw-96px)] dark:bg-zinc-900">
      <PageHeader title="Calendar" editableView={true} />
      <Calendar />
    </div>
  );
}

export default App;
