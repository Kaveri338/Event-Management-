import React, { useEffect, useState } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { User, Calendar, PlusCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchData = async () => {
    try {
      const { data } = await api.get('/events');
      setRegisteredEvents(data.filter((e: any) => e.attendees.includes(user._id)));
      setCreatedEvents(data.filter((e: any) => e.organizer._id === user._id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={48} /></div>;

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user.name?.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome, {user.name}</h1>
            <p className="text-gray-400">Manage your events and registrations in one place</p>
          </div>
        </div>
        {user.role === 'organizer' && (
          <Link to="/create-event" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all">
            <PlusCircle size={20} /> Create New Event
          </Link>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Calendar className="text-indigo-400" /> My Registrations
          </h2>
          {registeredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {registeredEvents.map((event: any) => (
                <EventCard key={event._id} event={event} onRegister={fetchData} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 p-10 rounded-2xl border border-dashed border-gray-700 text-center text-gray-500">
              No events registered yet. <Link to="/" className="text-indigo-400 hover:underline">Explore events</Link>
            </div>
          )}
        </section>

        {user.role === 'organizer' && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <PlusCircle className="text-violet-400" /> My Hosted Events
            </h2>
            {createdEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {createdEvents.map((event: any) => (
                  <EventCard key={event._id} event={event} onRegister={fetchData} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 p-10 rounded-2xl border border-dashed border-gray-700 text-center text-gray-500">
                You haven't hosted any events yet.
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
