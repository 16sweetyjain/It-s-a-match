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
    .connect(process.env.MONGODB_URI,{
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

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
}
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});