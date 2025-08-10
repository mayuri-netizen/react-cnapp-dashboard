// src/context/DashboardContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { buildInitialState } from '../data/dashboardData';
import { toast } from 'react-toastify';

const DashboardContext = createContext();

export const useDashboard = () => {
    return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }) => {
    const [categories, setCategories] = useState(() => {
        try {
            const savedState = localStorage.getItem('dashboardState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                if (Array.isArray(parsedState)) {
                    return parsedState;
                }
            }
        } catch (error) { console.error("Could not parse saved state", error); }
        return buildInitialState();
    });

    useEffect(() => {
        try {
            localStorage.setItem('dashboardState', JSON.stringify(categories));
        } catch (error) { console.error("Could not save state to localStorage", error); }
    }, [categories]);

    const removeWidget = (categoryId, widgetId) => {
        setCategories(prev => prev.map(cat => cat.id === categoryId ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) } : cat));
        toast.error('Widget removed');
    };

    const addWidget = (categoryId, widgetsToAdd) => {
        setCategories(prev => prev.map(cat => cat.id === categoryId ? { ...cat, widgets: [...cat.widgets, ...widgetsToAdd] } : cat));
        toast.success('Widget(s) added successfully!');
    };

    const addCategory = (categoryTitle) => {
        const newCategory = { id: `c${Date.now()}`, title: categoryTitle, widgets: [] };
        setCategories(prev => [...prev, newCategory]);
        toast.info('New section created!');
    };

    const editWidgetTitle = (categoryId, widgetId, newTitle) => {
        setCategories(prev => prev.map(cat => (cat.id === categoryId ? { ...cat, widgets: cat.widgets.map(w => (w.id === widgetId ? { ...w, title: newTitle } : w)) } : cat)));
        toast.success('Widget title updated!');
    };

    // --- THIS FUNCTION WAS MISSING ---
    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        const sourceCategoryId = source.droppableId;
        const destCategoryId = destination.droppableId;

        if (sourceCategoryId === destCategoryId) {
            const category = categories.find(cat => cat.id === sourceCategoryId);
            const newWidgets = Array.from(category.widgets);
            const [reorderedItem] = newWidgets.splice(source.index, 1);
            newWidgets.splice(destination.index, 0, reorderedItem);
            setCategories(prev => prev.map(cat => cat.id === sourceCategoryId ? { ...cat, widgets: newWidgets } : cat));
        } else {
            const sourceCategory = categories.find(cat => cat.id === sourceCategoryId);
            const destCategory = categories.find(cat => cat.id === destCategoryId);
            const sourceWidgets = Array.from(sourceCategory.widgets);
            const [movedItem] = sourceWidgets.splice(source.index, 1);
            const destWidgets = Array.from(destCategory.widgets);
            destWidgets.splice(destination.index, 0, movedItem);
            setCategories(prev => prev.map(cat => {
                if (cat.id === sourceCategoryId) return { ...cat, widgets: sourceWidgets };
                if (cat.id === destCategoryId) return { ...cat, widgets: destWidgets };
                return cat;
            }));
        }
    };
    // --- END OF MISSING FUNCTION ---

    // --- UPDATE THE VALUE OBJECT TO INCLUDE THE FUNCTION ---
    const value = { categories, removeWidget, addWidget, addCategory, editWidgetTitle, handleDragEnd };

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};