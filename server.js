const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const userDataPath = 'users.json';
const postDataPath = 'posts.json';
const reservationDataPath = 'reservations.json';

app.use(cors());

app.use(express.json());

// User API's
// Get all users
app.get('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    res.json(data.users);
});

// Add new user
app.post('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const newUser = req.body;
    newUser.id = data.users.length + 1;
    data.users.push(newUser);
    fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newUser);
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const user = data.users.find(user => user.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Update a specific user by ID
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    const userIndex = data.users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        data.users[userIndex] = { ...data.users[userIndex], ...req.body }; // Merge existing user data with new data
        fs.writeFileSync(userDataPath, JSON.stringify(data, null, 2));
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Post APi's
// Get all posts
app.get('/posts', (req, res) => {
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    res.json(data.posts);
});

// Add new post
app.post('/posts', (req, res) => {
    const data = JSON.parse(fs.readFileSync(postDataPath, 'utf8'));
    const newPost = req.body; 
    newPost.id = data.posts.length + 1;
    data.posts.push(newPost);
    fs.writeFileSync(postDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newPost);
});

// Reservation API's
// Get all reservations
app.get('/reservations', (req, res) => {
    const data = JSON.parse(fs.readFileSync(reservationDataPath, 'utf8'));
    res.json(data.reservations);
});

// Add new reservation
app.post('/reservations', (req, res) => {
    const data = JSON.parse(fs.readFileSync(reservationDataPath, 'utf8'));
    const newReservation = req.body; 
    newReservation.id = data.reservations.length + 1;
    data.reservations.push(newReservation);
    fs.writeFileSync(reservationDataPath, JSON.stringify(data, null, 2), 'utf8');
    res.json(newReservation);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});