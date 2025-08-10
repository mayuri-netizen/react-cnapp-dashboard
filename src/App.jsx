
import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { DashboardProvider } from './context/DashboardContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>

      {/* Add the ToastContainer here. It's invisible until a toast is triggered. */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;