var express = require('express');
var router = express.Router();
const loginRequired = require('../libs/loginRequired');
var categoryModel = require('../models/CategoryModel')


router.get('/', function(req, res){
    categoryModel.find( function(err,category){ //첫번째 인자는 err, 두번째는 받을 변수명

        res.render( 'categoryselect' , { category : category });
    });
})
    

module.exports = router;