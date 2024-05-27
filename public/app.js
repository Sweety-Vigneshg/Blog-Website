// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Schema and Model
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

// Set up body-parser and ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Routes
app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('home', { posts: posts });
    });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postContent
    });

    post.save((err) => {
        if (!err) {
            res.redirect('/');
        }
    });
});

app.get('/posts/:postId', (req, res) => {
    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, (err, post) => {
        res.render('post', {
            title: post.title,
            content: post.content
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
