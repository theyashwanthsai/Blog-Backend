const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('MONGODB_URL', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
 

// Routes
app.use('', authRoutes);
app.use('', postRoutes);
app.use('', profileRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
