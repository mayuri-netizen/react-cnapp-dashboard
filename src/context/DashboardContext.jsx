
import React, { createContext, useContext, useState } from 'react';
import { buildInitialState } from '../data/dashboardData';

const DashboardContext = createContext();

export const useDashboard = () => {
    return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }) => {
    const [categories, setCategories] = useState(buildInitialState());

    const removeWidget = (categoryId, widgetId) => {
        // --- LOGGING FOR REMOVE ---
        console.log(`%c[CONTEXT] Attempting to REMOVE widget '${widgetId}' from category '${categoryId}'`, 'color: red; font-weight: bold;');

        setCategories((prevCategories) => {
            const newCategories = prevCategories.map((category) => {
                if (category.id === categoryId) {
                    const updatedWidgets = category.widgets.filter((widget) => widget.id !== widgetId);
                    console.log('[CONTEXT] Widgets in this category AFTER removal:', updatedWidgets.map(w => w.id));
                    return { ...category, widgets: updatedWidgets };
                }
                return category;
            });
            return newCategories;
        });
    };

    const addWidget = (categoryId, widgetsToAdd) => {
        // --- LOGGING FOR ADD ---
        console.log(`%c[CONTEXT] Attempting to ADD ${widgetsToAdd.length} widget(s) to category '${categoryId}'`, 'color: green; font-weight: bold;');
        console.log('[CONTEXT] Widget(s) to add:', widgetsToAdd.map(w => w.id));

        setCategories((prevCategories) => {
            const newCategories = prevCategories.map((category) => {
                if (category.id === categoryId) {
                    const updatedWidgets = [...category.widgets, ...widgetsToAdd];
                    console.log('[CONTEXT] Widgets in this category AFTER adding:', updatedWidgets.map(w => w.id));
                    return { ...category, widgets: updatedWidgets };
                }
                return category;
            });
            return newCategories;
        });
    };

    const addCategory = (categoryTitle) => {
        const newCategory = {
            id: `c${Date.now()}`, // Create a unique ID using the current timestamp
            title: categoryTitle,
            widgets: [], // New categories start with no widgets
        };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    const value = {
        categories,
        removeWidget,
        addWidget,
        addCategory,
    };
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};