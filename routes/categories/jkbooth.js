var express = require('express');
var router = express.Router();
var jkbooths = require('../../models/jkbooth')
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
    jkbooths.find( function(err,jkbooth){ 

categoryModel.findOne({ title : "jkbooth"}, function(err, category){ res.render('categories/jkbooth', {category : category, jkbooth : jkbooth, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const jkbooth = new jkbooths({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    jkbooth.save(function(err){
        res.redirect('/jkbooth')
    })


});

router.get('/delete/:_id', function(req, res){
    jkbooths.remove({_id : req.params._id}, function(err){
        res.redirect('/jkbooth')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;