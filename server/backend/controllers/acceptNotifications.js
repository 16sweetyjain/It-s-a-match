const User = require('../models/User');

exports.acceptNotifications = (req,res) => {
    let { senderOfAcceptEmail, receiverOfAcceptEmail, notificationStatus, petName, image  } = req.body;  
    const notification_for_receiver_of_accept_request = {
        user_email: senderOfAcceptEmail,
        notification_status: notificationStatus,
        petName:petName,
        image:image
    };
    User.findOneAndUpdate({ email:senderOfAcceptEmail, 'notifications.user_email': receiverOfAcceptEmail }, { $set:{ 'notifications.$.notification_status': notificationStatus } }, { new:true })
        .then(response => {
            res.status(200).json({
                success:`${receiverOfAcceptEmail}'s request accepted`,
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });

    User.findOneAndUpdate({ email: receiverOfAcceptEmail }, { $addToSet:{ notifications: notification_for_receiver_of_accept_request } }, { new: true })
        .then(response => {
            res.status(200).json({
                success:`request accepted by ${senderOfAcceptEmail}`,
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });       
};