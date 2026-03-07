export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'attendee' | 'organizer' | 'admin';
  createdEvents: string[];
  registeredEvents: string[];
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: User;
  attendees: string[];
  capacity: number;
  category: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
