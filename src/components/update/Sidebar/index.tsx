import { useEffect, useState } from 'react';
import './sidebar.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const icons = [
    'plus',
    'search',
    'inbox',
    'calendar-day',
    'calendar',
    'tag',
]

const iconsSelected = [
    'plus',
    'search',
    'inbox-fill',
    'calendar-day-fill',
    'calendar-fill',
    'tag-fill',
]

const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(3);

    // gets the classes for the icon
    function getIconClassName(index: number, selected: boolean) {
        if (selected) {
            return `bi bi-${iconsSelected[index]}`
        } 
        return `bi bi-${icons[index]}`
    }

    // get the classes for the button
    function getButtonClassName(index: number, selected: boolean) {
        if (selected) {
            if (index === 0) {
                return `sidebar-button sidebar-add sidebar-add-selected`
            }
            return `sidebar-button sidebar-selected`
        } 
        return `sidebar-button`
    }

    // changes the selected index to the index of the button that was clicked
    function handleButtonClick(index: number) {
        setSelectedIndex(index);
    }

    // gets a single button for the sidebar
    function getButton(index: number, selected: boolean) {
        if (index === 0) {
            return (
                <button className={`sidebar-button sidebar-add ${selected ? 'sidebar-add-selected' : ''}`} onClick={() => handleButtonClick(0)}>
                    <i className="bi bi-plus"></i>
                </button>
            )
        } else {
            return (
                <button className={getButtonClassName(index, selected)} onClick={() => handleButtonClick(index)}>
                    <i className={getIconClassName(index, selected)}></i>
                </button>
            )
        }
    }

    // gets all the buttons for the sidebar
    function getButtons() {
        return (
            <div className="sidebar-buttons">
                {icons.map((icon, index) => {
                    return getButton(index, index === selectedIndex)
                })}
            </div>
        )
    }

    return (
        <div className="sidebar">
            {getButtons()}
        </div>
    )
}

export default Sidebar;