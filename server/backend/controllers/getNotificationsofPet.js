const User = require('../models/User');

exports.getNotificationsofPet = (req,res) => {
    User.find({},{ '_id':0,'notifications':1 })
        .then(response => {
            res.status(200).json({
                result:response,
                message:'fetched all notifications of pet',
                statusCode:200
            });
        })
        .catch(err => {
            res.status(500).json({
                error:[{ error:err }]
            });
        });
};