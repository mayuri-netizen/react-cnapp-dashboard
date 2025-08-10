// src/components/Widget.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Widget.css';
import { useDashboard } from '../context/DashboardContext';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Draggable } from 'react-beautiful-dnd';

// A specific component for the Donut Chart
const DonutChartWidget = ({ data }) => (
    <ResponsiveContainer width="100%" height={250}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={90}
                dataKey="value"
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
            />
        </PieChart>
    </ResponsiveContainer>
);

// A specific component for the Bar Chart
const BarChartWidget = ({ data }) => (
    <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={60} />
            <Tooltip cursor={{ fill: '#f5f5f5' }} />
            <Bar dataKey="value" barSize={20}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

// A specific component for a List
const ListWidget = ({ data }) => (
    <ul className="list-widget">
        {data.map((item) => (
            <li key={item.id} className={`list-item severity-${item.severity.toLowerCase()}`}>
                <span className="severity-dot"></span>
                {item.description}
            </li>
        ))}
    </ul>
);


const Widget = ({ title, content, categoryId, widgetId, type, data, index }) => {
    const { removeWidget, editWidgetTitle } = useDashboard();
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleRemove = () => removeWidget(categoryId, widgetId);

    const handleSave = () => {
        if (currentTitle.trim()) {
            editWidgetTitle(categoryId, widgetId, currentTitle.trim());
        } else {
            setCurrentTitle(title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setCurrentTitle(title);
            setIsEditing(false);
        }
    };

    const renderContent = () => {
        switch (type) {
            case 'donut':
                return <DonutChartWidget data={data} />;
            case 'bar':
                return <BarChartWidget data={data} />;
            case 'list':
                return <ListWidget data={data} />;
            default:
                return <p className="widget-content">{content}</p>;
        }
    };

    return (
        <Draggable draggableId={widgetId} index={index}>
            {(provided) => (
                <div
                    className="widget"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="widget-header">
                        <div className="widget-title-area">
                            {isEditing ? (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={currentTitle}
                                    onChange={(e) => setCurrentTitle(e.target.value)}
                                    onBlur={handleSave}
                                    onKeyDown={handleKeyDown}
                                    className="widget-title-input"
                                />
                            ) : (
                                <h3 className="widget-title">{title}</h3>
                            )}
                        </div>
                        <div className="widget-actions">
                            <button className="widget-action-button" onClick={() => setIsEditing(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button className="widget-action-button" onClick={handleRemove}>&times;</button>
                        </div>
                    </div>
                    <div className="widget-body">{renderContent()}</div>
                </div>
            )}
        </Draggable>
    );
};

export default Widget;