#Notes App

A simple note-taking application with the following features:
- Add a new note
- View all notes
- Delete a note

Built with:
- **Backend**: Node.js + Express (in-memory storage)
- **Frontend**: React.js with Tailwind CSS for styling

---

## Installation & Running Instructions

### Prerequisites
- Ensure you have **Node.js** and **npm** installed.

### Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/AaYuShRana14/Notes
   cd notes
2. Install dependencies for the root project:
   ```bash
   npm install
3. Start the application (both backend and frontend):
   ```bash
   npm start
  

Approach
Backend
Stack: Node.js + Express.js

Data Store: An in-memory array (notes[]) is used to store notes.

Endpoints:

GET /notes: Fetch all notes.

POST /notes: Add a new note. Accepts a JSON body with { text: string }.

DELETE /notes/:id: Deletes a note by its unique id.

Error Handling: Ensures proper validations and HTTP status codes (400, 404, 500).

Frontend
Stack: React.js with functional components and hooks (useState, useEffect).

UI/UX:

Clean and minimal design with dynamic updates.

Includes a loading state and success/error messages for better feedback.

Integration:

Fetches notes from the backend.

Updates UI state dynamically on successful add/delete operations.

Styling: Tailwind CSS is used for styling.
