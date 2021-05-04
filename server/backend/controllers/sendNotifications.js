const User = require('../models/User');

exports.sendNotifications = (req,res) => {
    let { sender_email, receiver_email, notification_status, pet_name, image } = req.body;  //notif_status = 'pending'
    const notification = {
        user_email: sender_email,
        notification_status: notification_status,
        pet_name:pet_name,
        image:image
    }
    User.findOneAndUpdate({email: receiver_email}, { $addToSet:{notifications: notification}}, {new: true})
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