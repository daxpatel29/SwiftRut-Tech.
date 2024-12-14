import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventImage: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventAttendees: { type: Number, required: true },
  eventFacilities: { type: String, required: true }, 
});

export default mongoose.model('Event', eventSchema);
