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
const upload = multer({storage: storage});

const { signup, signin } = require('../controllers/auth');
const {profile}=require('../controllers/profile');
const{getAllUsers}= require('../controllers/getAll');
const {getPet} = require('../controllers/getPet');
const {getAllPets} = require('../controllers/getAllPets');
const { sendNotifications } = require('../controllers/sendNotifications');
const { acceptNotifications } = require('../controllers/acceptNotifications');
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/create',upload.single('image_of_pet'),profile), 
router.get('/getAllUsers',getAllUsers);
router.get('/getAllPets',getAllPets);
router.get('/getPet',getPet);
router.put('/sendNotifications',sendNotifications);
router.put('/acceptNotifications',acceptNotifications);

module.exports = router;