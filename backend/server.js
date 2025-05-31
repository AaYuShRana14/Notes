const express = require('express'); // Import Express.js
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const app = express(); // Initialize Express app

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// In-memory array to store notes
const notes = [];

// GET route to fetch all notes
app.get('/notes', (req, res) => {
  res.json(notes); // Respond with the list of notes
});

// POST route to add a new note
app.post('/notes', (req, res) => {
  try {
    const { text } = req.body; // Extract text from request body
    // Validate that text is present and is a string
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid note text' });
    }
    // Create a new note with an auto-incremented ID
    const note = { id: notes.length + 1, text };
    notes.push(note); // Add note to the in-memory array
    res.status(201).json(note); // Respond with the newly created note
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Handle unexpected errors
  }
});

// DELETE route to delete a note by ID
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params; // Extract ID from route parameters
  try {
    const index = notes.findIndex(note => note.id === parseInt(id)); // Find the index of the note by ID
    if (index !== -1) {
      notes.splice(index, 1); // Remove the note from the array
      res.status(200).json({ message: 'Note deleted successfully' }); // Respond with success message
    } else {
      res.status(404).json({ error: 'Note not found' }); // Respond with error if note is not found
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); // Handle unexpected errors
  }
});

// Start the server on port 8000
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000'); // Log the server URL
});
