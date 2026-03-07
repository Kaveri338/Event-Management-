import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Calendar, MapPin, Users, Tag, Image as ImageIcon, FileText, Loader2, Save } from 'lucide-react';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '', capacity: 10, category: 'Technology', image: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/events', formData);
      navigate('/');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-gray-600 shadow-sm";

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-700">
          <div className="bg-indigo-600/20 p-3 rounded-2xl text-indigo-400">
            <Calendar size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Event</h1>
            <p className="text-gray-400 mt-1">Fill in the details below to host your event</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-300 px-1">Event Title</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Ex: Tech Conference 2026"
                className={inputClass}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-300 px-1">Description</label>
            <textarea
              placeholder="Tell everyone what your event is about..."
              className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-gray-600 shadow-sm min-h-[120px]"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 px-1">Date & Time</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="datetime-local"
                className={inputClass}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 px-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Ex: San Francisco, CA"
                className={inputClass}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 px-1">Capacity</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="number"
                min="1"
                placeholder="100"
                className={inputClass}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 px-1">Category</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <select
                className={`${inputClass} appearance-none cursor-pointer`}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Technology">Technology</option>
                <option value="Workshop">Workshop</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Art">Art</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-300 px-1">Image URL (Optional)</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className={inputClass}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 group disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Launch Event</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
