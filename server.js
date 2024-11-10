// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Verbindung zur MongoDB-Datenbank
mongoose.connect('mongodb://localhost:27017/socialMediaNews', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Datenbank verbunden'))
    .catch((err) => console.log('Datenbank Fehler:', err));

// Kommentar-Schema
const commentSchema = new mongoose.Schema({
    postId: Number,
    author: String,
    content: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// Route, um Kommentare abzurufen
app.get('/comments/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId });
    res.json(comments);
});

// Route, um Kommentare hinzuzufügen
app.post('/comments', async (req, res) => {
    const { postId, author, content } = req.body;
    const newComment = new Comment({ postId, author, content });
    await newComment.save();
    res.json(newComment);
});

// Server starten
app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
