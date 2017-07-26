var express = require('express');
var router = express.Router();
var FirstCategorys = require('../../models/FirstCategory')
var categoryModel = require('../../models/CategoryModel')
var commentModel = require('../../models/CommentModel')
var multer = require('multer');
var fs = require('fs')
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
    // FirstCategorys.find( function(err,FirstCategory){ //첫번째 인자는 err, 두번째는 받을 변수명
    //
    //     res.render( 'categories/FirstCategory' , { FirstCategory : FirstCategory, csrfToken : req.csrfToken() });
    // });

    FirstCategorys.find(function(err, FirstCategory){
        categoryModel.findOne({ title : "FirstCategory" }, function(err,category){ //첫번째 인자는 err, 두번째는 받을 변수명

            res.render( 'categories/FirstCategory' , { category : category, FirstCategory: FirstCategory });
        });
    })
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const FirstCategory = new FirstCategorys({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    FirstCategory.save(function(err){
        res.redirect('/FirstCategory')
    })


});

router.get('/delete/:_id', function(req, res){
    FirstCategorys.remove({_id : req.params._id}, function(err){
        res.redirect('/FirstCategory')
    })
})

router.get('/category_delete/:_id', function(req, res){
    categoryModel.remove({_id : req.params._id}, function(err){
        res.redirect('/categoryselect')
    })
})

module.exports = router;