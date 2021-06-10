const User = require('../models/User');

exports.sendMeetRequest = (req,res) => {
    let { senderEmail, receiverEmail, meetRequestStatus, petName, image, meetDate, meetTime } = req.body;  //notif_status = 'pending'
    const meetNotification = {
        user_email: senderEmail,
        meetRequestStatus: meetRequestStatus,
        pet_name:petName,
        image:image,
        meetDate:meetDate,
        meetTime:meetTime
    };

    User.findOneAndUpdate({ email: receiverEmail }, { $addToSet:{ meets: meetNotification } }, { new: true })
        .then(response => {
            res.status(200).json({
                success:'meet request sent',
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });
};