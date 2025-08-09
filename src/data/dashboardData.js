
import { allWidgets } from './allWidgets';

// This is the blueprint. It only contains IDs.
// It defines WHICH widgets to show on the initial load.
const initialLayout = [
    {
        id: 'c1',
        title: 'Google Cloud Security Posture',
        widgets: ['w101', 'w102'], // Show the donut chart and bar chart by default
    },
    {
        id: 'c2',
        title: 'GKE Workload Protection',
        widgets: ['w201'], // Show the list widget by default
    },
    {
        id: 'c3',
        title: 'Registry Scan',
        widgets: [], // This category starts empty
    },
];

// This function builds the state. It reads the blueprint and fetches the
// full widget data from the master catalog (`allWidgets`).
// This structure makes it IMPOSSIBLE to have default duplicates.
export const buildInitialState = () => {
    return initialLayout.map(category => {
        const fullWidgets = category.widgets.map(widgetId => {
            return allWidgets[category.id]?.find(w => w.id === widgetId);
        }).filter(Boolean);

        return {
            ...category,
            widgets: fullWidgets,
        };
    });
};