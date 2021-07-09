const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
//import routes
const authRoutes = require('./routes/auth');
//app
const app = express();
// db
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb+srv://new_user-24:likemebetter@cluster0.jmvyg.mongodb.net/its-a-match?retryWrites=true&w=majority&ssl=true',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('uploads'));
//routes middleware
app.use('/api', authRoutes);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});