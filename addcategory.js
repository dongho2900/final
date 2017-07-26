var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var categoryModel = require('./models/CategoryModel')



/* GET home page. */
router.get('/', function(req, res) {
    res.render('addcategory')
});
router.post('/', function(req, res){
    var title = req.body.title;
    // fs.writeFile(path.join(__dirname + '/views/categories/' + title + ".ejs"), "ehhlaskdasdl", function(err){
    //     if(err) throw err;
    //     console.log("complete")
    // })

    fs.readFile(path.join(__dirname + '/views/addcategory.ejs'), 'utf-8', function (err, data) {
        if (err) throw err;
        //Do your processing, MD5, send a satellite to the moon, etc.
        fs.writeFile (path.join(__dirname + '/views/categories/' + title + ".ejs"), "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "    <meta charset=\"utf-8\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
            "\n" +
            "    <script src=\"https://code.jquery.com/jquery-3.2.1.min.js\"></script>\n" +
            "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\n" +
            "    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">\n" +
            "    <link href=\"http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.6/summernote.css\" rel=\"stylesheet\">\n" +
            "    <script src=\"http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.6/summernote.js\"></script>\n" +
            "    <title>JK's BOOTH ROOM</title>\n" +
            "    <style>\n" +
            "        body{\n" +
            "\n" +
            "            background-color: rgba(189, 189, 189, 0.17);\n" +
            "\n" +
            "        }\n" +
            "        hr{\n" +
            "            border :  solid 1px black;\n" +
            "        }\n" +
            "\n" +
            "        .main_banner{\n" +
            "            padding-top: 30px;\n" +
            "            border-radius : 10px;\n" +
            "            margin-bottom: 30px;\n" +
            "            color: inherit;\n" +
            "\n" +
            "\n" +
            "        }\n" +
            "        .main_booth_banner{\n" +
            "            padding-top: 30px;\n" +
            "            padding-bottom: 30px;\n" +
            "            margin-bottom: 30px;\n" +
            "            color: inherit;\n" +
            "            background-color : white;\n" +
            "        }\n" +
            "\n" +
            "        img {\n" +
            "\n" +
            "\n" +
            "            width : 100%;\n" +
            "            height : 100%;\n" +
            "            border-radius: 5px;\n" +
            "\n" +
            "\n" +
            "        }\n" +
            "\n" +
            "        .btn-file {\n" +
            "            position: relative;\n" +
            "            overflow: hidden;\n" +
            "        }\n" +
            "        .btn-file input[type=file] {\n" +
            "            position: absolute;\n" +
            "            top: 0;\n" +
            "            right: 0;\n" +
            "            min-width: 100%;\n" +
            "            min-height: 100%;\n" +
            "            font-size: 100px;\n" +
            "            text-align: right;\n" +
            "            filter: alpha(opacity=0);\n" +
            "            opacity: 0;\n" +
            "            outline: none;\n" +
            "            background: white;\n" +
            "            cursor: inherit;\n" +
            "            display: block;\n" +
            "\n" +
            "        }\n" +
            "    </style>\n" +
            "</head>\n" +
            "<body>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "<div class=\"container\">\n" +
            "    <div class=\"main_banner\">\n" +
            "        <a href=\"/\" class=\"btn btn-align-left\" style=\"color : black\">\n" +
            "            <span class=\"glyphicon glyphicon-home\"></span>\n" +
            "        </a>\n" +
            "        <a href=\"/categoryselect\"><h1 style=\"color : black; text-align: center\">JK's BOOTH</h1></a>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "        <div class=\"row\">\n" +
            "        <hr>\n" +
            "        </div>\n" +
            "        <div class=\"row\">\n" +
            "        <%" + title + ".forEach(function(" + title +"){%>\n" +
            "\n" +
            "        <div class=\"col-md-3\" style=\"height : 250px;margin-bottom:30px\">\n" +
            "\n" +
            "            <img src=\"photo/<%=" + title + ".photoName%>\" data-toggle=\"modal\" data-target=\"#myModal<%=" + title + ".id%>\">\n" +
            "\n" +
            "        </div>\n" +
            "\n" +
            "        <%});%>\n" +
            "        </div>\n" +
            "\n" +
            "\n" +
            "\n" +
            "    </div>\n" +
            "\n" +
            "\n" +
            "</div>\n" +
            "\n" +
            "<div class=\"container\">\n" +
            "<div class=\"row\">\n" +
            "\n" +
            "\n" +
            "\n" +
            "        <hr>\n" +
            "\n" +
            "        <div class=\"col-xs-4\">\n" +
            "\n" +      "<a href=\"/" + title + "/category_delete/<%=category._id%>\"" + "class=\"btn btn-danger\" onclick=\"return confirm('삭제 하시겠습니까?')\">카테고리 삭제</a>" +
            "        </div>\n" +
            "        <div class=\"col-xs-4\">\n" +
            "            <h5 style=\"text-align: center; color : black\">Copyright &copy; 2017 JK All Rights Reserved</h5>\n" +
            "            <h5 style=\"text-align: center; color : black\">Made by Dongho Choi</h5>\n" +
            "        </div>\n" +
            "    <%if(isLogin){%>\n" +
            "        <div class=\"col-xs-4\">\n" +
            "            <div class=\"pull-right\">\n" +
            "            <a href=\"#\" class=\"btn btn-align-left\" style=\"color : black\" data-toggle=\"modal\" data-target=\"#upload_image_modal\">\n" +
            "                <span class=\"glyphicon glyphicon-circle-arrow-up\" style=\"font-size : 30px;\"></span>\n" +
            "            </a>\n" +
            "\n" +
            "            <a href=\"#\" class=\"btn btn-align-left\" style=\"color : black\">\n" +
            "                <span class=\"glyphicon glyphicon-music\" style=\"font-size : 30px;\"></span>\n" +
            "            </a>\n" +
            "            <a href=\"/logout\" class=\"btn btn-align-left\" style=\"color : black\">\n" +
            "                <span class=\"glyphicon glyphicon-log-out\" style=\"font-size : 30px;\"></span>\n" +
            "            </a>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    <%}%>\n" +
            "\n" +
            "</div>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "</div>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "<%" + title + ".forEach(function(" + title + "){%>\n" +
            "<!-- image_view_Modal -->\n" +
            "<div class=\"modal fade\" id=\"myModal<%=" + title + ".id%>\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n" +
            "    <div class=\"modal-dialog\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\" style=\"background-color: #F0F0F0\">\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" ><span aria-hidden=\"true\" >&times;</span></button>\n" +
            "                <h4 class=\"modal-title\" id=\"myModalLabel\"><%=" + title + ".name%></h4>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "\n" +
            "                <img  src=\"photo/<%=" + title + ".photoName%>\">\n" +
            "\n" +
            "\n" +
            "                <h5><%=" + title + ".content%></h5>\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\" style=\"background-color: #F0F0F0\">\n" +
            "\n" +
            "                <%if(isLogin){%>\n" +
            "                <a href=\"/" + title + "/delete/<%=" + title + "._id%>\" type=\"button\" class=\"btn btn-primary\" onclick=\"return confirm('삭제 하시겠습니까?')\">삭제하기</a>\n" +
            "                <%}%>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "<%});%>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "<!-- upload_Modal -->\n" +
            "<div class=\"modal fade\" id=\"upload_image_modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n" +
            "    <div class=\"modal-dialog\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\" style=\"background-color: #F0F0F0\">\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" ><span aria-hidden=\"true\" >&times;</span></button>\n" +
            "                <h4 class=\"modal-title\" id=\"myModalLabel\">게시물 작성</h4>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "\n" +
            "                <form id=\"upload_form\" action=\"\" method=\"post\" enctype=\"multipart/form-data\">\n" +
            "                    <input type=\"text\" name=\"name\" class=\"form-control\" placeholder=\"제목\">\n" +
            "\n" +
            "                    <img name=\"blah\" id=\"blah\" src=\"/img/white.jpg\" alt=\"your image\" style=\"width : 100%; height : 100%;\"/>\n" +
            "                    <span class=\"btn btn-default btn-lg btn-file\">\n" +
            "                    사진 찾기 <input type=\"file\" id=\"imgInp\" name=\"photo\">\n" +
            "                </span>\n" +
            "                    <br>\n" +
            "                    <br>\n" +
            "                    <textarea id=\"summernote\" name=\"content\"></textarea>\n" +
            "                    <input type=\"submit\" class=\"btn btn-default\" value=\"올리기\">\n" +
            "                </form>\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\" style=\"background-color: #F0F0F0\">\n" +
            "\n" +
            "\n" +
            "            </div>\n" +
            "\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "<script type=\"text/javascript\">\n" +
            "    $(document).ready(function() {\n" +
            "        $('#summernote').summernote();\n" +
            "    });\n" +
            "\n" +
            "\n" +
            "    $(function() {\n" +
            "        $(\"#imgInp\").on('change', function(){\n" +
            "            readURL(this);\n" +
            "        });\n" +
            "    });\n" +
            "\n" +
            "    function readURL(input) {\n" +
            "        if (input.files && input.files[0]) {\n" +
            "            var reader = new FileReader();\n" +
            "\n" +
            "            reader.onload = function (e) {\n" +
            "                $('#blah').attr('src', e.target.result);\n" +
            "            }\n" +
            "\n" +
            "            reader.readAsDataURL(input.files[0]);\n" +
            "        }\n" +
            "    }\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "</script>\n" +
            "\n" +
            "\n" +
            "</body>\n" +
            "</html>\n", function(err) {
            // if (err) throw err;
            // res.redirect('/categoryselect')

            fs.readFile(path.join(__dirname + '/routes/categories/category1.js'), 'utf-8', function(err, data){
                if(err) throw err;
                fs.writeFile(path.join(__dirname + '/routes/categories/') + title + ".js", "var express = require('express');\n" +
                    "var router = express.Router();\n" +
                    "var " + title + "s = require('../../models/" + title + "')\n" +
                    "var commentModel = require('../../models/CommentModel')\n" +
                    "var multer = require('multer');\n" +
                    "var categoryModel = require('../../models/CategoryModel');" +
                    "var fs = require('fs')\n" +
                    "var path = require('path')\n" +
                    "var uploadDir = path.join(__dirname , '../../public/photo')\n" +
                    "var stripTags = require('striptags')\n" +
                    "var csrf = require('csurf')\n" +
                    "var csrfProtection = csrf({cookie : true})\n" +
                    "\n" +
                    "\n" +
                    "var storage = multer.diskStorage({\n" +
                    "    destination: function (req, file, cb) {\n" +
                    "        cb(null, uploadDir)\n" +
                    "    },\n" +
                    "    filename: function (req, file, cb) {\n" +
                    "        cb(null, file.originalname)\n" +
                    "    }\n" +
                    "})\n" +
                    "\n" +
                    "var upload = multer({ storage: storage })\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "router.get('/', csrfProtection,function(req, res){\n" +
                    "    " + title + "s.find( function(err," + title + "){ \n" +
                    "\n" +  "categoryModel.findOne({ title : " + "\"" + title + "\"}, function(err, category){ res.render('categories/" + title + "', {category : category, " + title + " : " + title + ", csrfToken : req.csrfToken()});" +
                    "        });\n" +
                    "    });\n" +
                    "});\n" +
                    "\n" +
                    "router.post('/', upload.single('photo'), function (req, res, next) {\n" +
                    "    const " + title + " = new " + title + "s({\n" +
                    "        name : req.body.name,\n" +
                    "        photoName : req.file.filename,\n" +
                    "        content : stripTags(req.body.content)\n" +
                    "\n" +
                    "    })\n" +
                    "    " + title + ".save(function(err){\n" +
                    "        res.redirect('/" + title + "')\n" +
                    "    })\n" +
                    "\n" +
                    "\n" +
                    "});\n" +
                    "\n" +
                    "router.get('/delete/:_id', function(req, res){\n" +
                    "    " + title + "s.remove({_id : req.params._id}, function(err){\n" +
                    "        res.redirect('/" + title + "')\n" +
                    "    })\n" +
                    "})\n" +
                    "\n" +
                    "\n" +
                      "router.get('/category_delete/:_id', function(req, res){ categoryModel.remove({_id : req.params._id}, function(err){ res.redirect('/categoryselect') }) });"   +
                    "module.exports = router;", function(err){
                    if(err) throw err;
                    const category = new categoryModel({
                        title : req.body.title


                    })
                    category.save(function(err){
                        fs.readFile(path.join(__dirname + '/models/PhotoModel.js'), 'utf-8', function(err, data){
                            if(err) throw err;
                            fs.writeFile(path.join(__dirname + '/models/' + title + ".js"), "const mongoose = require('mongoose')\n" +
                                "const Schema = mongoose.Schema\n" +
                                "const autoIncrement = require('mongoose-auto-increment')\n" +
                                "\n" +
                                "const " + title + " = new Schema({\n" +
                                "    name : String,\n" +
                                "    photoName : String,\n" +
                                "    content : String,\n" +
                                "    created_at : {\n" +
                                "        type : Date,\n" +
                                "        default : Date.now()\n" +
                                "    }\n" +
                                "});\n" +
                                "\n" +
                                "\n" +
                               title +".virtual('getDate').get(function(){\n" +
                                "    var date = new Date(this.created_at);\n" +
                                "    return {\n" +
                                "        year : date.getFullYear(),\n" +
                                "        month : date.getMonth()+1,\n" +
                                "        day : date.getDate()\n" +
                                "    };\n" +
                                "});\n" +
                                "\n" +
                                "\n" +
                                "autoIncrement.initialize(mongoose.connection)\n" +
                                title +".plugin( autoIncrement.plugin , { model : \""+ title + "\", field : \"id\" , startAt : 1 } );\n" +
                                "module.exports = mongoose.model('" + title + "' , " + title + ");", function(err){
                                fs.appendFile('server.js', "const " + title +  " = require('./routes/categories/" + title +  "')\n" +
                                    "app.use('/" + title + "', " + title + ");", function (err) {
                                    if (err) throw err;
                                    res.redirect('/categoryselect');
                                });
                            })
                        })
                    })

                })
            })

        });





    });



})
module.exports = router;