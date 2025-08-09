
import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import './AddCategory.css';

const AddCategory = () => {
    const [title, setTitle] = useState('');
    const { addCategory } = useDashboard();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            addCategory(title.trim());
            setTitle(''); // Reset input after submission
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-category-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new section title..."
            />
            <button type="submit">+ Create Section</button>
        </form>
    );
};

export default AddCategory;