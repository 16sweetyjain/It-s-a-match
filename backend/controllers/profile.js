const User = require('../models/User');

exports.profile = (req,res, err) => {
    if(err){
        console.log(err);
    }
    
    let { email, pet_name, interests, dislikes, short_description } = req.body;
    let userEmail = email;
    console.log(req.body);
    console.log(req.file);
    let image = req.file;
    let errors = [];

    if(!pet_name){
        errors.push({ error:'Pet name required' });
    }
    if(!interests){
        errors.push({ error:'Interests required' });
    }
    if(!dislikes){
        errors.push({ error:'Dislikes required' });
    }
    if(!short_description){
        errors.push({ error:'Description required' });
    }
    if(!image){
        errors.push({ error:'Image of pet required' });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    let image_of_pet = req.file.path;
    const petProfile = {
        pet_name: pet_name,
        interests: interests,
        dislikes: dislikes,
        short_description: short_description,
        image_of_pet:image_of_pet
    };
 
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