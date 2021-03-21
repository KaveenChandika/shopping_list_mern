const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config/keys');
const jwt = require('jsonwebtoken');

// Users Model
const User = require('../../models/Users');

// @route GET api/Users
// @desc Register new users
// @access Public
router.post('/', (req,res) =>{
    const {name,email,password} = req.body;

    //Simple valiation
    if(!name || !email || !password){
        return res.status(400).json({msg:'Please Enter All Fileds'});
    }

    //Check for existing users 
    User.findOne({email})
        .then(user =>{
            if(user) return res.status(400).json({msg:'User Already Exists'});

            const newUser = User({
                name,
                email,
                password
            })

            //Create salt & hash
            bcrypt.genSalt(10, (err,salt) =>{
                bcrypt.hash(newUser.password, salt, (err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user =>{

                            jwt.sign(
                                {id:user.id},
                                config.jwtSecret,
                                {expiresIn:3600},
                                (err, token) =>{
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user:{
                                            id:user.id,
                                            name:user.name,
                                            email:user.email
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
})


module.exports = router;