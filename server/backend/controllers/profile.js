const User = require('../models/User');

exports.profile=(req,res)=>{
    let {email,pet_name,hobbies,dislikes,likes}=req.body;
    const pet={
        pet_name:pet_name,
        hobbies:hobbies,
        dislikes:dislikes,
        likes:likes
    };
    let errors=[];
    if(!pet_name){
        errors.push({pet_name:'required'});
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOne({email:email}).then(user=>{
        if(!user){
            return res.status(404).json({
                errors:[{user:'not found'}]
            });
        }
        else{
            return res.status(200).json({
                success:true,
                profile:pet
            });
        }
    }).catch(err=>res.status(500).json({errors:[{error:err}]}));
}