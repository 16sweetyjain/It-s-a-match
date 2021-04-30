const User = require('../models/User');

exports.acceptNotifications = (req,res) => {
    let { sender_of_accept_email, receiver_of_accept_email, notification_status } = req.body;  //in this case the user will accept request so we have to change the notifi_status to accepted for the sender of request and receiver_email will be of the one who accepts the request
    const notifications = {
        user_email: sender_of_accept_email,
        notification_status: notification_status
    }
    User.findOneAndUpdate({email: receiver_of_accept_email}, { notifications: notifications}, {new: true})
    .then(response=>{
        res.status(200).json({
            success:'request accepted',
            result:response
        })
    })
    .catch(err=>{
        res.status(500).json({
            errors:[{error:err}]
        });
        });


    
       
}