const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
require('dotenv').config();

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send('Something broke!'); // Send a generic error response
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
   
app.get('/about', (req, res) => {
  res.send('Hello World! its all about me');
});
const users = require('./routes/user');
const authRoute = require('./routes/authRoutes');

app.use('/users', users);

app.post('/data', (req, res) => {
    const { name, email } = req.body;
 if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }
  return res.status(201).send('Data received');
});


app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


