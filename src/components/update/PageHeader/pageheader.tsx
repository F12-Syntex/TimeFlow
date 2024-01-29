import "./pageheader.css";
import Modal from "../Modal/modal";
import { useState } from "react";

interface Props {
  title: string;
  editableView: boolean;
  filterCompleted?: boolean;
  setFilterCompleted?: (filterCompleted: boolean) => void;
  dimCompleted?: boolean;
  setDimCompleted?: (dimCompleted: boolean) => void;
}

function PageHeader(props: Readonly<Props>) {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  const [filterCompleted, setFilterCompleted] = useState(
    props.filterCompleted ?? false
  );

  const [dimCompleted, setDimCompleted] = useState(props.dimCompleted ?? false);

  function closeModal() {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 300);
  }

  // Update parent component's state when filterCompleted changes
  const changeShowCompleted = () => {
    // toggle between true and null
    const updatedFilterCompleted = !filterCompleted;
    setFilterCompleted(updatedFilterCompleted);
    if (props.setFilterCompleted) {
      props.setFilterCompleted(updatedFilterCompleted);
    }
  };

  // Update parent component's state when dimCompleted changes
  const changeDimCompleted = () => {
    const updatedDimCompleted = !dimCompleted;
    setDimCompleted(updatedDimCompleted);
    if (props.setDimCompleted) {
      props.setDimCompleted(updatedDimCompleted);
    }
  };

  return (
    <div className="relative text-left flex flex-row items-center justify-between select-none pt-2 -mb-2 w-[calc(100%-64px)]">
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} closing={closing}>
          <div className="relative flex flex-col items-center h-full overflow-x-hidden overflow-y-auto bg-white select-none w-[calc(100vw-96px)] dark:bg-zinc-900 pb-9">
            <PageHeader title="View Options" editableView={false} />
            <div className="view-options-grid">
              <ToggleSwitch
                name="Show Completed Items"
                checked={filterCompleted}
                onChange={changeShowCompleted}
              />
              {/* {filterCompleted && (
                <ToggleSwitch
                  name="Dim Completed Items"
                  checked={dimCompleted}
                  onChange={changeDimCompleted}
                />
              )} */}
            </div>
          </div>
        </Modal>
      )}
      <h2>{props.title}</h2>
      {props.editableView && (
        <button className="btn" onClick={() => setShowModal(true)}>
          View
        </button>
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
    <button className="h-16 btn" onClick={onChange}>
      <div className="flex -mt-1">
        <div className="round">
          <input
            className="btn"
            type="checkbox"
            name={name}
            id={name}
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={name}></label>
        </div>
        <div className="toggle-name">{name}</div>
      </div>
    </button>
  );
}

export default PageHeader;
