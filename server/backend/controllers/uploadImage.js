const User = require('../models/User');

exports.uploadImage = (req,res) => {
    const email=req.body.email;
    console.log(req.file);
    const profile={
        image_of_pet:req.file
    }
    let errors=[];
    User.findOneAndUpdate({email:email},{profile:profile})
    .then(response=>{
        res.status(200).json({
            success:'updated',
            result:response
        })
    })
    .catch(err=>{
        res.status(500).json({
            errors:[{error:err}]
        });
        });
       
}