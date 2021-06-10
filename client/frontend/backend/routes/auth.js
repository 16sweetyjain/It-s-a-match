const express = require('express');
const router = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
const upload = multer({ storage: storage });

const { signup, signin } = require('../controllers/auth');
const { profile } = require('../controllers/profile');
const{ getAllUsers } = require('../controllers/getAll');
const { sendNotifications } = require('../controllers/sendNotifications');
const { acceptNotifications } = require('../controllers/acceptNotifications');
const {sendMeetRequest} = require('../controllers/sendMeetRequest');
const {acceptMeetRequest} = require('../controllers/acceptMeetRequest');
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/create',upload.single('image_of_pet'),profile), 
router.get('/getAllUsers',getAllUsers);
router.put('/sendNotifications',sendNotifications);
router.put('/acceptNotifications',acceptNotifications);
router.put('/sendMeetRequest',sendMeetRequest);
router.put('/acceptMeetRequest',acceptMeetRequest);

module.exports = router;