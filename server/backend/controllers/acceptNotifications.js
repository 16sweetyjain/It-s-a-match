const User = require('../models/User');

exports.acceptNotifications = (req,res) => {
    let { sender_of_accept_email, receiver_of_accept_email, notification_status } = req.body;  
    const notification_for_receiver_of_accept_request = {
        user_email: sender_of_accept_email,
        notification_status: notification_status
    };
    User.findOneAndUpdate({ email:sender_of_accept_email, 'notifications.user_email': receiver_of_accept_email }, { $set:{ 'notifications.$.notification_status': notification_status } }, { new:true })
        .then(response => {
            res.status(200).json({
                success:`${receiver_of_accept_email}'s request accepted`,
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });

    User.findOneAndUpdate({ email: receiver_of_accept_email }, { $addToSet:{ notifications: notification_for_receiver_of_accept_request } }, { new: true })
        .then(response => {
            res.status(200).json({
                success:`request accepted by ${sender_of_accept_email}`,
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });       
};