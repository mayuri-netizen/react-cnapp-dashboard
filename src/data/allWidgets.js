
export const allWidgets = {
    // Category c1: Google Cloud Security Posture
    c1: [
        {
            id: 'w101',
            title: 'Cloud Asset Inventory',
            type: 'donut',
            data: [
                { name: 'Compute Engine', value: 400, fill: '#4285F4' },
                { name: 'Cloud Storage', value: 300, fill: '#34A853' },
                { name: 'BigQuery', value: 300, fill: '#FBBC05' },
                { name: 'GKE Clusters', value: 200, fill: '#EA4335' },
            ],
        },
        {
            id: 'w102',
            title: 'IAM Policy Violations',
            type: 'bar',
            data: [
                { name: 'Critical', value: 12, fill: '#EA4335' },
                { name: 'High', value: 35, fill: '#FBBC05' },
                { name: 'Medium', value: 88, fill: '#4285F4' },
            ],
        },
        { id: 'w103', title: 'CSPM Policy Violations', content: 'Shows recent policy violations.', type: 'text' },
        { id: 'w104', title: 'Security Posture Score', content: 'Displays the overall posture score.', type: 'text' },
    ],
    // Category c2: GKE Workload Protection
    c2: [
        {
            id: 'w201',
            title: 'Live Threat Events',
            type: 'list',
            data: [
                { id: 't1', severity: 'High', description: 'Anomalous API usage in pod "frontend-7b..."' },
                { id: 't2', severity: 'Medium', description: 'Privilege escalation attempt in container "db-init"' },
                { id: 't3', severity: 'Low', description: 'Non-standard port access from "worker-3c..."' },
            ],
        },
        { id: 'w202', title: 'Top 5 Namespace Specific Alerts', content: 'No Graph data available', type: 'text' },
    ],
    // Category c3: Registry Scan
    c3: [],
};