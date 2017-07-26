var express = require('express');
var router = express.Router();
var Test2s = require('../../models/Test2')
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
    Test2s.find( function(err,Test2){ 

categoryModel.findOne({ title : "Test2"}, function(err, category){ res.render('categories/Test2', {category : category, Test2 : Test2, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const Test2 = new Test2s({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    Test2.save(function(err){
        res.redirect('/Test2')
    })


});

router.get('/delete/:_id', function(req, res){
    Test2s.remove({_id : req.params._id}, function(err){
        res.redirect('/Test2')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;