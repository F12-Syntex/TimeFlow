import "./pageheader.css";
import Modal from "../Modal/modal";
import { useState } from "react";

interface Props {
  title: string;
  editableView: boolean;
}

function PageHeader(props: Readonly<Props>) {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  const [filterCompleted, setFilterCompleted] = useState(false);
  const [dimCompleted, setDimCompleted] = useState(false);

  function closeModal() {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 300);
  }

  function changeShowCompleted() {
    setFilterCompleted((prev) => !prev);
  }

  function changeDimCompleted() {
    setDimCompleted((prev) => !prev);
  }

  return (
    <div className="header-bar">
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} closing={closing}>
          <div className="modal-container">
            <PageHeader title="View Options" editableView={false} />
            <div className="view-options-grid">
              <ToggleSwitch
                name="Show Completed Items"
                checked={filterCompleted}
                onChange={changeShowCompleted}
              />
              {filterCompleted && (
                <ToggleSwitch
                  name="Dim Completed Items"
                  checked={dimCompleted}
                  onChange={changeDimCompleted}
                />
              )}
            </div>
          </div>
        </Modal>
      )}
      <h2>{props.title}</h2>
      {props.editableView && (
        <button onClick={() => setShowModal(true)}>View</button>
      )}
    </div>
  );
}

function ToggleSwitch({
  name,
  checked,
  onChange,
}: Readonly<{ name: string; checked: boolean; onChange: () => void }>) {
  return (
    <button className="toggle-switch-container" onClick={onChange}>
      <div className="toggle-switch">
        <div className="toggle-container">
          <div className="round">
            <input
              type="checkbox"
              name={name}
              id={name}
              checked={checked}
              onChange={onChange}
            />
            <label htmlFor={name}></label>
          </div>
        </div>
        <div className="toggle-name">{name}</div>
      </div>
    </button>
  );
}

export default PageHeader;
