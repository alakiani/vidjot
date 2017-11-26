const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//Connect to DataBase
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/vidjot-dev', {
    useMongoClient: true
  })
  .then(() => {
    console.log('Connected to DB on localHost');
  })
  .catch(e => {
    console.log('Cannot Connect to DB');
  });

//Load idea Model
require('./../models/Idea');
const Idea = mongoose.model('ideas');

//Handlebar Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//GET '/'
app.get('/', (req, res) => {
  const title = 'About';
  res.render('index', { title });
});

//GET '/about'
app.get('/about', (req, res) => {
  const title = 'About';
  res.render('about', { title });
});

//GET '/ideas/add'
app.get('/ideas/add', (req, res) => {
  const title = 'Add Idea';
  res.render('ideas/add', { title });
});

//POST '/ideas'
app.post('/ideas', (req, res) => {
  var errors = [];
  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!req.body.details) {
    errors.push({ text: 'Please add some detail' });
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newIdea = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newIdea).save().then(idea => {
      res.redirect('/ideas');
    });
  }
});

//Server configuration
const port = 5000;

app.listen(port, () => {
  console.log(`Server starts on port ${port}`);
});
