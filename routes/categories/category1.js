var express = require('express');
var router = express.Router();
var photoModel = require('../../models/PhotoModel')
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
    photoModel.find( function(err,photo){ //첫번째 인자는 err, 두번째는 받을 변수명

        res.render( 'categories/category1' , { photo : photo, csrfToken : req.csrfToken() });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const photo = new photoModel({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    photo.save(function(err){
        res.redirect('/category1')
    })


});

router.get('/delete/:_id', function(req, res){
    photoModel.remove({_id : req.params._id}, function(err){
        res.redirect('/category1')
    })
})


module.exports = router;