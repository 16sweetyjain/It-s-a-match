const User = require('../models/User');

exports.deleteMeet = (req,res) => {
    let { userEmail, current_user_email, petName } = req.body;
    
    User.findOneAndUpdate({ email:current_user_email }, { $pull: { meets: { user_email:userEmail } } }, { new:true } )
        .then( response => {
            res.status(200).json({
                result:response,
                success:`${petName}'s  meet request deleted`
            });
        })
        .catch( error => {
            res.status(500).json({
                errors:[{ error:error }]
            });
            
        });

};
