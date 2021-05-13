const User = require('../models/User');

exports.getPet=(req,res)=>{
    //console.log('create')
    let {email}=req.body;

    User.find({'email':email},{'_id':0 , 'profile':1})
        .then(response=>{
            res.status(200).json({
                success:'updated',
                result:response
            });
        })
        .catch(err=>{
            res.status(500).json({
                errors:[{error:err}]
            });
        });
};