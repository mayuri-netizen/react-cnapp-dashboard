# Interactive Cloud Security (CNAPP) Dashboard

A feature-rich, responsive, and customizable dashboard UI built with React. This project simulates a real-world Cloud Native Application Protection Platform (CNAPP) dashboard, demonstrating a dynamic grid-based layout, interactive data visualizations, and advanced user interactivity.

**Live Demo:** https://react-cnapp-dashboard.vercel.app/


## Project Overview

This application provides a centralized and interactive interface for visualizing cloud security data. The entire dashboard is dynamically rendered and managed via React Context for efficient state management. Users have complete control over their workspace, with the ability to create sections, add/remove widgets, edit titles, and reorganize the layout using drag-and-drop. All user customizations are saved to `localStorage`, ensuring the layout persists across sessions.

## Key Features ✨

- **Dynamic Grid Layout**: The entire dashboard, including categories and widgets, is generated from a central data source.
- **Interactive Charts**: Utilizes the **Recharts** library to display meaningful and interactive data visualizations.
- **Full Customization**:
    - Add new widgets to any section from a master list.
    - Remove widgets from the view.
    - Create new custom sections on the fly.
    - Inline editing for widget titles, saved automatically.
- **Drag-and-Drop**: Full drag-and-drop functionality for reordering widgets within and between categories, built with **`react-beautiful-dnd`**.
- **Data Persistence**: The user's complete layout (widgets, sections, and their order) is saved to `localStorage` and reloaded on the next visit.
- **Light & Dark Modes**: A sleek, modern toggle switch allows users to choose their preferred theme, which is persisted across sessions. The UI is styled with CSS Variables for robust theming.
- **Responsive Design**: The layout is fully responsive and optimized for desktops, tablets, and mobile devices.
- **Toast Notifications**: Provides instant user feedback for all major actions, using **`react-toastify`**.
- **State Management**: Leverages React Context API for centralized and efficient state management without prop-drilling.

## Technologies & Libraries

- **Framework**: React (with Vite)
- **State Management**: React Context API
- **Drag & Drop**: `react-beautiful-dnd`
- **Charting**: `recharts`
- **Notifications**: `react-toastify`
- **Date Picker**: `react-datepicker`
- **Styling**: CSS with Custom Properties (Variables) for theming.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/react-cnapp-dashboard.git](https://github.com/your-username/react-cnapp-dashboard.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd react-cnapp-dashboard
    ```
3.  **Install dependencies:**
    *(Note: The `--legacy-peer-deps` flag is required due to `react-beautiful-dnd`'s incompatibility with React 19+)*
    ```bash
    npm install --legacy-peer-deps
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Screenshots

### **Light Mode**
<img width="1919" height="869" alt="Screenshot 2025-08-10 132906" src="https://github.com/user-attachments/assets/4e62731d-395c-405c-99f8-2651e2551453" />

### **Dark Mode**
<img width="1918" height="865" alt="Screenshot 2025-08-10 132919" src="https://github.com/user-attachments/assets/65b25e4c-f121-4689-9ba3-e790a61de262" />
