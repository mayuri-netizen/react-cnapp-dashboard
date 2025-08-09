
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Header.css';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState([new Date(), null]);
    const [startDate, endDate] = dateRange;
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="app-header">
            <div className="header-left">
                <div className="breadcrumb">
                    <span>Home</span> / <span className="current-page">Dashboard V2</span>
                </div>
            </div>

            <div className="header-right">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search anything..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="date-picker-wrapper">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => setDateRange(update)}
                        isClearable={true}
                        placeholderText="Select a date range"
                        className="date-picker-input"
                    />
                </div>

                <ThemeSwitcher />

                <div className="profile-wrapper">
                    <button className="header-button profile-button" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                        👤 ▼
                    </button>
                    {isProfileOpen && (
                        <div className="profile-dropdown">
                            <a href="#profile">My Profile</a>
                            <a href="#settings">Settings</a>
                            <a href="#logout">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;