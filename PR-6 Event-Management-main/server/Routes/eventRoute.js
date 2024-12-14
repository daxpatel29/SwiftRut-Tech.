import express from 'express';
import { addEvent, deleteEvent, editEvent, getEvents, getEventById } from '../Controller/eventcon.js';

const router = express.Router();


router.post('/add', addEvent);


router.get('/all', getEvents);


router.get('/:id', getEventById);


router.put('/edit/:id', editEvent);


router.delete('/delete/:id', deleteEvent);

export default router;
