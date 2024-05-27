const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const BlogPost = require('./models/BlogPost');

// Route for displaying all blog posts
app.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.render('index', { posts: posts });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route for displaying the form to create a new blog post
app.get('/new', (req, res) => {
    res.render('new');
});

// Route for handling the submission of a new blog post
app.post('/new', async (req, res) => {
    const newPost = new BlogPost({
        title: req.body.title,
        content: req.body.content
    });
    try {
        await newPost.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});
