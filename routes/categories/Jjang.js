var express = require('express');
var router = express.Router();
var Jjangs = require('../../models/Jjang')
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
    Jjangs.find( function(err,Jjang){ 

categoryModel.findOne({ title : "Jjang"}, function(err, category){ res.render('categories/Jjang', {category : category, Jjang : Jjang, csrfToken : req.csrfToken()});        });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const Jjang = new Jjangs({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    Jjang.save(function(err){
        res.redirect('/Jjang')
    })


});

router.get('/delete/:_id', function(req, res){
    Jjangs.remove({_id : req.params._id}, function(err){
        res.redirect('/Jjang')
    })
})


router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });module.exports = router;