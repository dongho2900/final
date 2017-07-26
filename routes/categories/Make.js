var express = require('express');
var router = express.Router();
var Makes = require('../../models/Make')
var commentModel = require('../../models/CommentModel')
var multer = require('multer');
var categoryModel = require('../../models/CategoryModel');var fs = require('fs')
var path = require('path')
var uploadDir = path.join(__dirname , '../../public/photo')
var stripTags = require('striptags')
var csrf = require('csurf')
var csrfProtection = csrf({cookie : true})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })



router.get('/', csrfProtection,function(req, res){
    Makes.find( function(err,Make){ 

categoryModel.findOne({ title : "Make"}, function(err, category){ res.render('categories/Make', {category : category, Make : Make, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const Make = new Makes({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    Make.save(function(err){
        res.redirect('/Make')
    })


});

router.get('/delete/:_id', function(req, res){
    Makes.remove({_id : req.params._id}, function(err){
        res.redirect('/Make')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;