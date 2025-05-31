import React, { useState, useEffect } from "react";

const App = () => {
  // State to manage notes, input text, loading status, and status messages
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Fetch notes from the backend on component mount
  useEffect(() => {
    loadNotes();
  }, []);

  // Function to load all notes from the backend
  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/notes"); // Fetch notes from backend
      const data = await response.json(); // Parse JSON response
      setNotes(data); // Update state with the fetched notes
    } catch (error) {
      showStatus('Failed to load notes', 'error'); // Show error message if fetching fails
      console.error(error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  // Function to add a new note
  const addNote = async () => {
    if (!text.trim()) return; // Prevent adding empty notes

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/notes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify({ text: text.trim() }), // Send note text in request body
      });
      const newNote = await response.json(); // Parse response to get the new note
      setNotes([...notes, newNote]); // Append new note to the current notes
      setText(""); // Clear input field
      showStatus('Note added successfully!', 'success'); // Show success message
    } catch (err) {
      showStatus('Failed to add note', 'error'); // Show error message
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to delete a note
  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8000/notes/${id}`, {
        method: 'DELETE', // Use DELETE HTTP method
      });
      setNotes(notes.filter((note) => note.id !== id)); // Remove the deleted note from state
      showStatus('Note deleted successfully!', 'success'); // Show success message
    } catch (err) {
      showStatus('Failed to delete note', 'error'); // Show error message
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Helper function to display status messages
  const showStatus = (message, type) => {
    setStatus({ message, type }); // Set the status message and type
    setTimeout(() => setStatus(null), 3000); // Auto-hide status message after 3 seconds
  };

  // Handle pressing the Enter key to add a note
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNote();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-2xl mx-auto p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tiny Notes
          </h1>
          <p className="text-gray-600">Your simple, beautiful note-taking app</p>
        </div>

        {/* Status Messages */}
        {status && (
          <div
            className={`p-3 mb-4 rounded-lg text-center font-medium transition-all duration-300 ${
              status.type === 'success'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Add Note Section */}
        <div className="flex gap-3 mb-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)} // Update text state on input change
            onKeyPress={handleKeyPress} // Handle Enter key press
            placeholder="What's on your mind?"
            disabled={loading} // Disable input while loading
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all duration-300 text-gray-700"
          />
          <button
            onClick={addNote} // Trigger addNote function on click
            disabled={loading || !text.trim()} // Disable button if loading or input is empty
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? '...' : 'Add Note'}
          </button>
        </div>

        {/* Notes List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Notes ({notes.length})
          </h2>

          {notes.length === 0 ? (
            // Display message if no notes exist
            <div className="text-center py-16 text-gray-500">
              <div className="text-6xl mb-6 opacity-50">📝</div>
              <p className="text-lg font-medium">No notes yet. Add your first note above!</p>
            </div>
          ) : (
            // Display list of notes
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="text-gray-800 flex-1 mr-4 break-words text-base leading-relaxed">
                    {note.text}
                  </span>
                  <button
                    onClick={() => deleteNote(note.id)} // Trigger deleteNote function on click
                    disabled={loading} // Disable button while loading
                    className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
