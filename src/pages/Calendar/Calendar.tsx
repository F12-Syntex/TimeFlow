import "../pages.css";
import PageHeader from "../../components/update/PageHeader/pageheader";
import Calendar from "../../components/update/Calendar/calendar";

function App() {
  return (
    <div className="main-page-container">
      <PageHeader title="Calendar" editableView={true} />
      <Calendar />
    </div>
  );
}

export default App;
