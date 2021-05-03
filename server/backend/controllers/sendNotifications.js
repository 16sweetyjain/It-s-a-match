const User = require('../models/User');

exports.sendNotifications = (req,res) => {
    let { sender_email, receiver_email, notification_status } = req.body;  //notif_status = 'pending'
    const notification = {
        user_email: receiver_email,
        notification_status: notification_status
    }
    User.findOneAndUpdate({email: sender_email}, { $push:{notifications: notification}}, {new: true})
    .then(response=>{
        res.status(200).json({
            success:'request sent',
            result:response
        })
    })
    .catch(err=>{
        res.status(500).json({
            errors:[{error:err}]
        });
        });


    
       
}