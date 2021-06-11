const User = require('../models/User');

exports.sendMeetRequest = (req,res) => {
    let { senderEmail, receiverEmail, meetRequestStatus, pet_name, image, meetDate, meetTime } = req.body;  //notif_status = 'pending'
    console.log(req.body);
    let errors = [];
    if(!meetDate){
        errors.push({ error: 'Pick a date' }); 

    }
    if(!meetTime){
        errors.push({ error: 'Pick a time' });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    const meetNotification = {
        user_email: senderEmail,
        meetRequestStatus: meetRequestStatus,
        pet_name:pet_name,
        image:image,
        meetDate:meetDate,
        meetTime:meetTime
    };

    User.findOneAndUpdate({ email: receiverEmail }, { $addToSet:{ meets: meetNotification } }, { new: true })
        .then(response => {
            console.log(response);
            res.status(200).json({
                success:'meet request sent',
                result:response
            });
        })
        .catch(err => {
            console.log(err);
        });
};