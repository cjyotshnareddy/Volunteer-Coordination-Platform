// routes/eventRoutes.js
const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();

// Add sample events (for testing)
// router.post('/seed', async (req, res) => {
//   try {
//     const sampleEvents = [
//       {
//         title: "Tree Plantation Drive",
//         description: "Join us to plant trees in the local park.",
//         date: new Date("2025-05-20T10:00:00Z"),
//         location: "City Park",
//         volunteers: []
//       }
//     ];

//     const result = await Event.insertMany(sampleEvents);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to seed events' });
//   }
// });
// Add a new event (Admin functionality)
router.post('/add', async (req, res) => {
  const { title, description, date, location } = req.body;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const newEvent = new Event({
      title,
      description,
      date: new Date(date),
      location,
      volunteers: []
    });

    await newEvent.save();
    res.status(201).json({ msg: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Event creation error:', error);
    res.status(500).json({ msg: 'Server error while creating event' });
  }
});

// Get all available events
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all events');
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
});

// Sign up for an event
// Fix: Change to accept eventId as a route param
router.post('/signup/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  console.log('User ID:', userId);
  console.log('Event ID:', eventId);

  try {
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).send('User or Event not found');
    }

    if (user.events.includes(eventId)) {
      return res.status(400).send('Already signed up for this event');
    }
 if (!event.volunteers.includes(userId)) {
      event.volunteers.push(userId);
      await event.save();
    }
    user.events.push(eventId);
    await user.save();

    res.send('Successfully signed up for the event');
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send('Error signing up for event');
  }
});


// Get user's signed up events
router.get('/my-events/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('events');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user.events);
  } catch (err) {
    res.status(500).send('Error fetching user events');
  }
});
// GET all events with volunteer details (Admin only)
router.get('/admin/overview', async (req, res) => {
  try {
    const events = await Event.find().populate('volunteers', 'name email');
    const formattedEvents = events.map(event => ({
      _id: event._id,
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
      volunteerCount: event.volunteers.length,
      volunteers: event.volunteers
    }));
    res.json(formattedEvents);
  } catch (err) {
    console.error('Error fetching admin event overview:', err);
    res.status(500).json({ msg: 'Server error fetching event overview' });
  }
});

module.exports = router;
