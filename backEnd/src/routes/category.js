const express = require('express');
const {addCategory,getCategories,updateCategories} = require ('../controllers/category');
const { requireSignin, adminMiddleware } = require('../middleware');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname)
    }
  })
  
  var upload = multer({ storage })

router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImg'),addCategory);
router.get('/category/getCategory', getCategories);
// array for upload multiple image
router.post('/category/update',upload.array('categoryImg'),updateCategories);

module.exports=router;