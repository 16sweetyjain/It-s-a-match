const User = require('../models/User');

exports.getAllUsers=(req,res)=>{
    User.find({}).
        then(response=>{
            res.status(200).json({
                result:response,
                message:'fetched all users',
                statusCode:200
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:[{error:err}]
            });
        });
};