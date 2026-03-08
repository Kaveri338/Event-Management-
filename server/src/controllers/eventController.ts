import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { User } from '../models/User';

export const createEvent = async (req: any, res: Response) => {
  try {
    const event = new Event({ ...req.body, organizer: req.user.id });
    await event.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { createdEvents: event._id } });
    res.status(201).send(event);
  } catch (error: any) {
    console.error('Create Event Error:', error);
    res.status(400).send({ error: error.message || 'Failed to create event' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name email')
      .populate('attendees', 'name email');
    res.send(events);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const registerForEvent = async (req: any, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send({ error: 'Event not found' });
    if (event.attendees.length >= event.capacity) return res.status(400).send({ error: 'Event full' });
    if (event.attendees.includes(req.user.id)) return res.status(400).send({ error: 'Already registered' });

    event.attendees.push(req.user.id);
    await event.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { registeredEvents: event._id } });
    res.send(event);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};