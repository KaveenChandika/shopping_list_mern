const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const UsersSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    register_date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = Item = mongoose.model('user',UsersSchema);