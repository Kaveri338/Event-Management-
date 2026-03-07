import React, { useEffect, useState } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { Search, Loader2, Sparkles } from 'lucide-react';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchEvents(); }, []);

  const filteredEvents = events.filter((e: any) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16 w-full">
      {/* Hero Section */}
      <header className="text-center space-y-6 pt-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-400 text-sm font-medium mb-4">
          <Sparkles size={16} /> <span>The #1 Event Platform</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black tracking-tight">
          Manage Events <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
            Like Never Before
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Create, register, and experience world-class events. The most colorful and intuitive multi-event management system.
        </p>
      </header>

      {/* Search Bar - Perfectly Centered */}
      <div className="max-w-2xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400" size={24} />
          <input
            type="text"
            placeholder="Search for amazing events..."
            className="w-full bg-gray-900/80 backdrop-blur-xl border-2 border-gray-800 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-indigo-500 transition-all text-white text-lg shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-indigo-500" size={48} />
          <p className="text-gray-400 animate-pulse">Fetching magic...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map((event: any) => (
            <EventCard key={event._id} event={event} onRegister={fetchEvents} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;