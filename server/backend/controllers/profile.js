const User = require('../models/User');

exports.profile = (req,res, err) => {
    if(err){
        console.log(err);
    }
    
    let { email, pet_name, interests, dislikes, short_description } = req.body;
    console.log(req.body);
    console.log(req.file);
    let userEmail = email;
    let image_of_pet = req.file.path;
    const petProfile = {
        pet_name: pet_name,
        interests: interests,
        dislikes: dislikes,
        short_description: short_description,
        image_of_pet:image_of_pet
    };
 
    let errors = [];
    if(!petProfile.pet_name){
        errors.push({ pet_name:'required' });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOneAndUpdate({ email:userEmail },{ $set:{ profile:petProfile } }, { new: true })
        .then(response => {
            //console.log(response);
            res.status(200).json({
                success:'updated',
                result:response
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{ error:err }]
            });
        });      
};