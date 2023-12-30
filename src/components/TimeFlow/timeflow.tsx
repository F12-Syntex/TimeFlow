import { useEffect, useState } from 'react';
import './timeflow.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Today from '../../pages/Today/Today'
import Inbox from '../../pages/Inbox/Inbox'
import Search from '../../pages/Search/Search'
import Add from '../../pages/Add/Add'
import Calendar from '../../pages/Calendar/Calendar'
import Tags from '../../pages/Tags/Tags'

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

const TimeFlow = () => {
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
                return `sidebar-add sidebar-add-selected`
            }
            return `sidebar-button sidebar-selected`
        } 
        if (index === 0) {
            return `sidebar-add`
        }
        return `sidebar-button`
    }

    // changes the selected index to the index of the button that was clicked
    function handleButtonClick(index: number) {
        setSelectedIndex(index);
    }

    // gets a single button for the sidebar
    function getButton(index: number, selected: boolean) {
        return (
            <a className={getButtonClassName(index, selected)} onClick={() => handleButtonClick(index)}>
                <i className={getIconClassName(index, selected)}></i>
            </a>
        )
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

    // gets the url for the page
    function getPageURL() {
        if (selectedIndex === 0) {
            return (
                <Add/>
            )
        } else if (selectedIndex === 1) {
            return (
                <Search/>
            )
        } else if (selectedIndex === 2) {
            return (
                <Inbox/>
            )
        } else if (selectedIndex === 3) {
            return (
                <Today/>
            )
        } else if (selectedIndex === 4) {
            return (
                <Calendar/>
            )
        } else if (selectedIndex === 5) {
            return (
                <Tags/>
            )
        }
    }

    return (
        <div className="main-container">
            <div className="sidebar">
                {getButtons()}
            </div>
            <div className="homepage-container">
                {getPageURL()}
            </div>
        </div>
    )
}

export default TimeFlow;
