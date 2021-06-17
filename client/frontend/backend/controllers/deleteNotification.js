const User = require('../models/User');

exports.deleteNotification = (req,res) => {
    let { userEmail, current_user_email, petName } = req.body;
    
    User.findOneAndUpdate({ email:current_user_email }, { $pull: { notifications: { user_email:userEmail } } }, { new:true } )
        .then( response => {
            res.status(200).json({
                result:response,
                success:`${petName}'s friend request deleted`
            });
        })
        .catch( error => {
            res.status(500).json({
                errors:[{ error:error }]
            });
            
        });

};
