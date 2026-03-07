import React, { useState } from 'react';
import { Calendar, MapPin, Users, Tag, User as UserIcon, X } from 'lucide-react';
import api from '../services/api';

const EventCard = ({ event, onRegister }: { event: any; onRegister?: () => void }) => {
  const [showAttendees, setShowAttendees] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isRegistered = event.attendees.some((a: any) => (a._id || a) === user._id);
  const isOrganizer = event.organizer?._id === user._id;

  const handleRegister = async () => {
    try {
      await api.post(`/events/${event._id}/register`);
      if (onRegister) onRegister();
      alert('Successfully registered!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 relative">
      {/* Event Header/Image */}
      <div className="relative h-48 bg-indigo-900 flex items-center justify-center">
        {event.image ? (
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <Calendar className="text-indigo-400 opacity-20" size={80} />
        )}
        <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-gray-700">
          <Tag size={12} className="text-indigo-400" /> {event.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-white truncate">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{event.description}</p>

        <div className="space-y-2.5 mb-6 text-sm text-gray-300">
          <div className="flex items-center gap-2.5">
            <Calendar size={16} className="text-indigo-400" />
            <span>{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="text-indigo-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users size={16} className="text-indigo-400" />
            <span>{event.attendees.length} / {event.capacity} Registered</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!isOrganizer && (
            <button
              onClick={handleRegister}
              disabled={isRegistered || event.attendees.length >= event.capacity}
              className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                isRegistered
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                  : event.attendees.length >= event.capacity
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
              }`}
            >
              {isRegistered ? 'Registered' : event.attendees.length >= event.capacity ? 'Event Full' : 'Register Now'}
            </button>
          )}

          {isOrganizer && (
            <button
              onClick={() => setShowAttendees(true)}
              className="flex-1 py-2.5 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-all flex items-center justify-center gap-2"
            >
              <UserIcon size={18} /> View Attendees
            </button>
          )}
        </div>
      </div>

      {/* Attendees Modal/Popup */}
      {showAttendees && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Attendee List</h2>
                <p className="text-gray-400 text-sm">{event.title}</p>
              </div>
              <button onClick={() => setShowAttendees(false)} className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
              {event.attendees.length > 0 ? (
                event.attendees.map((attendee: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                      {attendee.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{attendee.name || 'Anonymous'}</p>
                      <p className="text-gray-400 text-xs">{attendee.email || 'No email provided'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500 italic">No one has registered yet.</div>
              )}
            </div>

            <div className="p-4 bg-gray-800/20 text-center border-t border-gray-800 text-gray-400 text-xs">
              Total: {event.attendees.length} Attendee(s)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;