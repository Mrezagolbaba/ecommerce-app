const express = require('express');
const Category = require('../models/category');
const slugify = require('slugify')
const router = express.Router();


router.post('/category/create', (req,res)=> {

    const categoryObj ={
        name:req.body.name,
        slug:slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    const cat = Category(categoryObj);

    cat.save()
        .then((category) =>{
            return res.status(201).json({category})      
        }).catch(function (error) {
            res.status(400).json({error})
    });
});

module.exports=router;