const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://taddishetty34:Tsaiyashwanth2498@cluster0.oao2b28.mongodb.net/?retryWrites=true&w=majority', {
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