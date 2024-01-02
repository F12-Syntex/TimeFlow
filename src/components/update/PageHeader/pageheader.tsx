import "./pageheader.css";

interface Props {
  title: string;
  editableView: boolean;
}

function PageHeader(props: Props) {
  return (
    <div className="header-bar" style={{marginTop: props.title == "Inbox" ? "-16px" : ""}}>
      <h2>{props.title}</h2>
      {props.editableView && <button>View</button>}
    </div>
  );
}

export default PageHeader;
