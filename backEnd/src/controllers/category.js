const Category = require('../models/category');
const slugify = require('slugify')

exports.addCategory = (req,res)=> {
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
}

exports.getCategories = (req,res) => {
    Category.find({})
    .then((categories) => {
        return res.status(200).json({categories})      
    }).catch(function (error) {
       return res.status(400).json({error})
    });
}