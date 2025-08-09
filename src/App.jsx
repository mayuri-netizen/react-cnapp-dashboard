import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { DashboardProvider } from './context/DashboardContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </div>
  );
}

export default App;