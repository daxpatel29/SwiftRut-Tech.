import Event from '../models/eventscema.js';


export const addEvent = async (req, res) => {
    console.log('Incoming data:', req.body); 
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: 'Event added successfully!', event: newEvent });
    } catch (error) {
        console.error('Error saving event:', error); 
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(400).json({ error: 'An error occurred while adding the event' });
    }
};


export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error('Error fetching event by ID:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const editEvent = async (req, res) => {
    const { id } = req.params;
    console.log('Incoming data for editing:', req.body);
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully!', event: updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(400).json({ error: error.message });
    }
};


export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
