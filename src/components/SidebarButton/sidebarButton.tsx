// SidebarButton.tsx
import React from "react";
import { Link } from "react-router-dom";

interface SidebarButtonProps {
  button: {
    name: string;
    selectedName: string;
    path: string;
    component: React.ReactNode;
  };
  index: number;
  selectedIndex: number;
  openAddModal: () => void;
  setSelectedIndex: (index: number) => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  button,
  index,
  selectedIndex,
  openAddModal,
  setSelectedIndex,
}) => {
  // Get classes for icon
  const getIconClassName = (selected: boolean) =>
    selected ? `bi bi-${button.selectedName}` : `bi bi-${button.name}`;

  // Get classes for button
  const getButtonClassName = (selected: boolean) => {
    if (selected) {
      if (index === 0) {
        return "sidebar-add sidebar-add-selected";
      } else {
        return "sidebar-button sidebar-selected";
      }
    } else if (index === 0) {
      return "sidebar-add";
    } else {
      return "sidebar-button";
    }
  };

  return (
    <div key={button.path}>
      <Link
        to={button.path}
        className={getButtonClassName(index === selectedIndex)}
        onClick={() => (index === 0 ? openAddModal() : setSelectedIndex(index))}
      >
        <i className={getIconClassName(index === selectedIndex)}></i>
      </Link>
    </div>
  );
};

export default SidebarButton;
