const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const Make = new Schema({
    name : String,
    photoName : String,
    content : String,
    created_at : {
        type : Date,
        default : Date.now()
    }
});


Make.virtual('getDate').get(function(){
    var date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});


autoIncrement.initialize(mongoose.connection)
Make.plugin( autoIncrement.plugin , { model : "Make", field : "id" , startAt : 1 } );
module.exports = mongoose.model('Make' , Make);