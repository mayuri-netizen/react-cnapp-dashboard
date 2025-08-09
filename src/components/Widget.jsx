
import React from 'react';
import './Widget.css';
import { useDashboard } from '../context/DashboardContext';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts';

// A specific component for the Donut Chart
const DonutChartWidget = ({ data }) => (
    // 1. Increased height from 200 to 250 to give more space
    <ResponsiveContainer width="100%" height={250}>
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="45%" // 2. Moved the center of the pie up slightly
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
                verticalAlign="bottom" // 3. Ensure legend is at the bottom
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

const Widget = ({ title, content, categoryId, widgetId, type, data }) => {
    const { removeWidget } = useDashboard();

    const handleRemove = () => {
        removeWidget(categoryId, widgetId);
    };

    // This function decides which visualization to render
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
        <div className="widget">
            <div className="widget-header">
                <h3 className="widget-title">{title}</h3>
                <button className="widget-close-button" onClick={handleRemove}>
                    &times;
                </button>
            </div>
            <div className="widget-body">{renderContent()}</div>
        </div>
    );
};

export default Widget;