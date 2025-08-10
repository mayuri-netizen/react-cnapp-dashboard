
import React from 'react';
import Category from './Category';
import AddCategory from './AddCategory';
import './Dashboard.css';
import { useDashboard } from '../context/DashboardContext';
import { DragDropContext } from 'react-beautiful-dnd';

const Dashboard = () => {
    const { categories, handleDragEnd } = useDashboard();
    return (

        <DragDropContext onDragEnd={handleDragEnd}>
            <main className="dashboard">
                <AddCategory />
                {categories.map((category) => (
                    <Category
                        key={category.id}
                        categoryId={category.id}
                        title={category.title}
                        widgets={category.widgets}
                    />
                ))}
            </main>
        </DragDropContext>
    );
};

export default Dashboard;