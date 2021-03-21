const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc get all items
// @access Public
router.get('/', (req,res) =>{
    Item.find()
    .sort({date:-1})
    .then(items => res.json(items))
})

// @route POST api/items
// @desc create a item
// @access Private
router.post('/', auth, (req,res) =>{
    const newItem = new Item({
        name:req.body.name
    });

    newItem.save()
      .then(item => res.json(item))
})


// @route POST api/items
// @desc delete a item
// @access Private
router.delete('/:id',auth,(req,res) =>{
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success:true})))
    .catch(err => res.status(404).json({success:false}))
})

module.exports = router;