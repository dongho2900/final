const express = require('express')
const app = express()
const path = require('path');
var logger = require('morgan');




const index = require('./routes/index')
const categoryselect = require('./routes/categoryselect')
const category1 = require('./routes/categories/category1')
const auth = require('./routes/auth')
const addcategory = require('./addcategory')

const passport = require('passport')
const session = require('express-session')
var MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const autoIncrement = require('mongoose-auto-increment')

var db = mongoose.connection;
db.on('error', console.error);
db.on('open', function(){
    console.log('mongodb connect');
});

var connect = mongoose.connect('mongodb://127.0.0.1:27017/JKBOOTH', {useMongoClient : true});
autoIncrement.initialize(connect);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// //session 관련 셋팅
// var sessionMiddleWare = session({
//     secret: 'JKBOOTH',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 2000 * 60 * 60 //지속시간 2시간
//     }
// });
// app.use(sessionMiddleWare);

//passport 적용
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    app.locals.isLogin = req.isAuthenticated();
    //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
    //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
    app.locals.userData = req.user
    app.locals.onName = req.body.displayName
    next();
});


app.use('/', index);
app.use('/categoryselect', categoryselect)
app.use('/category1', category1)
app.use('/auth', auth)
app.use('/addcategory', addcategory)
app.get('/login_warning', function(req, res){
    res.render('login_warning')
})

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});



app.listen(3000, function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Server was started....")
    }
})



const FirstCategory = require('./routes/categories/FirstCategory')
app.use('/FirstCategory', FirstCategory);const Never = require('./routes/categories/Never')
app.use('/Never', Never);const nlln = require('./routes/categories/nlln')
app.use('/nlln', nlln);const nin = require('./routes/categories/nin')
app.use('/nin', nin);const Make = require('./routes/categories/Make')
app.use('/Make', Make);const Super = require('./routes/categories/Super')
app.use('/Super', Super);const NodeJs = require('./routes/categories/NodeJs')
app.use('/NodeJs', NodeJs);const Test = require('./routes/categories/Test')
app.use('/Test', Test);const Test2 = require('./routes/categories/Test2')
app.use('/Test2', Test2);const Fun = require('./routes/categories/Fun')
app.use('/Fun', Fun);const jkbooth = require('./routes/categories/jkbooth')
app.use('/jkbooth', jkbooth);