const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config/keys');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


// Users Model
const User = require('../../models/Users');

// @route POST api/auth
// @desc Auth users
// @access Public
router.post('/', (req,res) =>{
    const {email,password} = req.body;

    //Simple valiation
    if(!email || !password){
        return res.status(400).json({msg:'Please Enter All Fileds'});
    }

    //Check for existing users 
    User.findOne({email})
        .then(user =>{
            if(!user) return res.status(400).json({msg:'User does not exists'});

            //Validate password
            bcrypt.compare(password,user.password)
                .then(isMatch =>{
                    if(!isMatch) return res.status(400).json({msg:'Invalid Credintial'})

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

                })
        })
})

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, (req,res) =>{
    User.findById(req.user.id)
        .select('-password')
        .then(user =>res.json(user))
})

module.exports = router;