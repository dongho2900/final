var express = require('express');
var router = express.Router();
var Nevers = require('../../models/Never')
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
    Nevers.find( function(err,Never){ //첫번째 인자는 err, 두번째는 받을 변수명

        res.render( 'categories/Never' , { Never : Never, csrfToken : req.csrfToken() });
    });
});

router.post('/', upload.single('photo'), function (req, res, next) {
    const Never = new Nevers({
        name : req.body.name,
        photoName : req.file.filename,
        content : stripTags(req.body.content)

    })
    Never.save(function(err){
        res.redirect('/Never')
    })


});

router.get('/delete/:_id', function(req, res){
    Nevers.remove({_id : req.params._id}, function(err){
        res.redirect('/Never')
    })
})


module.exports = router;