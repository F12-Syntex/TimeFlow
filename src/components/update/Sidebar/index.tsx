import React from 'react';
import './sidebar.css';
import "bootstrap-icons/font/bootstrap-icons.css";

    // if selected then add class selected
    // if selected instead of bi-{name} use bi-{name}-fill

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

function getIcon(index: number, selected: boolean) {
    if (selected) {
        return iconsSelected[index]
    } 
    return icons[index]
}

function getIconClassName(index: number, selected: boolean) {
    if (selected) {
        return `bi bi-${iconsSelected[index]}`
    } 
    return `bi bi-${icons[index]}`
}

function getButtonClassName(index: number, selected: boolean) {
    if (selected) {
        return `sidebar-button sidebar-selected`
    } 
    return `sidebar-button`
}

function getButton(index: number, selected: boolean) {
    // print index and selected
    console.log(index, selected)
    if (index === 0) {
        return (
            // if selected add sidebar-selected
            <button className={`sidebar-button sidebar-add ${selected ? 'sidebar-selected' : ''}`}>
                <i className="bi bi-plus"></i>
            </button>
        )
    } else {
        return (
            <button className={getButtonClassName(index, selected)}>
                <i className={getIconClassName(index, selected)}></i>
            </button>
        )
    }
}

function getButtons(selected: number) {
    return (
        <div className="sidebar-buttons">
            {icons.map((icon, index) => {
                return getButton(index, index === selected)
            })}
        </div>
    )
}

function getAddButton() {
    return (
        <button className="sidebar-button sidebar-add">
            <i className="bi bi-plus"></i>
        </button>
    )
}

const Sidebar = () => {
    return (
        <div className="sidebar">
            {getButtons(0)}
        </div>
    )
}

export default Sidebar