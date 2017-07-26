var express = require('express');
var router = express.Router();
var Supers = require('../../models/Super')
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
    Supers.find( function(err,Super){ 

categoryModel.findOne({ title : "Super"}, function(err, category){ res.render('categories/Super', {category : category, Super : Super, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const Super = new Supers({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    Super.save(function(err){
        res.redirect('/Super')
    })


});

router.get('/delete/:_id', function(req, res){
    Supers.remove({_id : req.params._id}, function(err){
        res.redirect('/Super')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;