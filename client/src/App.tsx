import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* This main tag ensures everything is centered horizontally */}
        <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
          <div className="w-full max-w-7xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
        <footer className="py-8 text-center text-gray-500 text-sm">
          © 2026 EventHub Platform. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;