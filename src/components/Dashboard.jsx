
import React from 'react';
import Category from './Category';
import AddCategory from './AddCategory';
import { useDashboard } from '../context/DashboardContext';

const Dashboard = () => {
    const { categories } = useDashboard();

    return (
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
    );
};

export default Dashboard;