const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Set up the SQLite database
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for in-memory database or provide a path for a file-based database

db.serialize(() => {
    db.run(`CREATE TABLE visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        dob TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        invited_by TEXT,
        gender TEXT NOT NULL,
        stay_or_visit TEXT NOT NULL,
        born_again TEXT NOT NULL,
        spiritual_need TEXT,
        comments TEXT,
        service_rating TEXT
    )`);
});

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submissions
app.post('/submit', (req, res) => {
    console.log('Form submission received:', req.body);
    const data = req.body;

    if (!data.gender) {
        return res.status(400).send('Gender is required');
    }
    const stmt = db.prepare(`INSERT INTO visitors (
        full_name, phone_number, dob, email, invited_by, gender, stay_or_visit, born_again, spiritual_need, comments, service_rating
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    
    stmt.run(
        data.full_name,
        data.phone_number,
        data.dob,
        data.email,
        data.invited_by,
        data.gender,
        data.stay_or_visit,
        data.born_again,
        data.spiritual_need,
        data.comments,
        data.service_rating,
        (err) => {
            if (err) {
                res.status(500).send('Database error: ' + err.message);
            } else {
                // Redirect to the thankyou.html page
                res.redirect('thankyou.html');
            }
        }
    );
    stmt.finalize();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
