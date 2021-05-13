const User = require('../models/User');

exports.getAllPets=(req,res)=>{
    User.find({},{'_id':0,'profile':1})
        .then(response=>{
            res.status(200).json({
                result:response,
                message:'fetched all pets',
                statusCode:200
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:[{error:err}]
            });
        });
};