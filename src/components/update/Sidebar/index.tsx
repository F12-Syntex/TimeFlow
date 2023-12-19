import React from 'react';
import './sidebar.css';
import "bootstrap-icons/font/bootstrap-icons.css";

let selectedIndex = 3

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
        if (index === 0) {
            return `sidebar-button sidebar-add sidebar-add-selected`
        }
        return `sidebar-button sidebar-selected`
    } 
    return `sidebar-button`
}

function getButton(index: number, selected: boolean) {
    if (index === 0) {
        return (
            // onclick not working
            <button className={`sidebar-button sidebar-add ${selected ? 'sidebar-add-selected' : ''}`} onClick={() => {selectedIndex = 0}}>
                <i className="bi bi-plus"></i>
            </button>
        )
    } else {
        return (
            <button className={getButtonClassName(index, selected)} onClick={() => {selectedIndex = index}}>
                <i className={getIconClassName(index, selected)}></i>
            </button>
        )
    }
}

function getButtons() {
    return (
        <div className="sidebar-buttons">
            {icons.map((icon, index) => {
                return getButton(index, index === selectedIndex)
            })}
        </div>
    )
}

const Sidebar = () => {
    return (
        <div className="sidebar">
            {getButtons()}
        </div>
    )
}

export default Sidebar