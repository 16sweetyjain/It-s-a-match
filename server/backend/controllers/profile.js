const User = require('../models/User');

exports.profile=(req,res)=>{
    console.log('create')
    let {email,profile}=req.body;
    const pet={
        pet_name:req.body.profile.pet_name,
        hobbies:req.body.profile.hobbies,
        dislikes:req.body.profile.dislikes,
        likes:req.body.profile.likes
    };
  //profile.push(pet);
    console.log(pet);
    let errors=[];
    if(!profile.pet_name){
        errors.push({pet_name:'required'});
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOneAndUpdate({email:email},{profile:profile},{new:true})
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