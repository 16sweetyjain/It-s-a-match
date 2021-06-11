const User = require('../models/User');

exports.acceptMeetRequest = (req,res) => {
    let { senderOfAcceptEmail, receiverOfAcceptEmail, meetRequestStatus, pet_name, image, meetDate, meetTime  } = req.body;  
    const notification_for_receiver_of_accept_request = {
        user_email: senderOfAcceptEmail,
        meetRequestStatus: meetRequestStatus,
        pet_name:pet_name,
        image:image,
        meetDate:meetDate,
        meetTime:meetTime
    };
    User.findOneAndUpdate({ email:senderOfAcceptEmail, 'meets.user_email': receiverOfAcceptEmail }, { $set:{ 'meets.$.meetRequestStatus': meetRequestStatus } }, { new:true })
        .then(response => {
            res.status(200).json({
                success:`${receiverOfAcceptEmail}'s  meet request accepted`,
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });

    User.findOneAndUpdate({ email: receiverOfAcceptEmail }, { $addToSet:{ meets: notification_for_receiver_of_accept_request } }, { new: true })
        .then(response => {
            res.status(200).json({
                success:`meet request accepted by ${senderOfAcceptEmail}`,
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });       
};