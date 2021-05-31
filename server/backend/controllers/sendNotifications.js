const User = require('../models/User');

exports.sendNotifications = (req,res) => {
    let { senderEmail, receiverEmail, notificationStatus, petName, image } = req.body;  //notif_status = 'pending'
    const notification = {
        user_email: senderEmail,
        notification_status: notificationStatus,
        pet_name:petName,
        image:image
    };

    User.findOneAndUpdate({ email: receiverEmail }, { $addToSet:{ notifications: notification } }, { new: true })
        .then(response => {
            res.status(200).json({
                success:'request sent',
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });
};