const User = require('../models/User');

exports.profile = (req,res,next) => {
    
    let {email, pet_name, interests, dislikes, short_description} = req.body;
    let image_of_pet = req.file.originalname
    console.log(image_of_pet)
    const profile={
        pet_name: pet_name,
        interests: interests,
        dislikes: dislikes,
        short_description: short_description,
        image_of_pet:image_of_pet
    }
 
    let errors=[];
    if(!profile.pet_name){
        errors.push({pet_name:'required'});
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOneAndUpdate({email:email},{profile:profile},{new: true})
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