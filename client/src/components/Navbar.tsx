import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, PlusCircle, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
          <Calendar /> EventHub
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Events</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                <UserIcon size={18} /> Dashboard
              </Link>
              {user.role === 'organizer' && (
                <Link to="/create-event" className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md transition-colors">
                  <PlusCircle size={18} /> Create Event
                </Link>
              )}
              <button onClick={handleLogout} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
