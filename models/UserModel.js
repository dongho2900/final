const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const UserSchema = new Schema({
    userID : String,
    userPassword : String,
    displayName : String,
    created_at : {
        type : Date,
        default : Date.now()
    }
})

autoIncrement.initialize(mongoose.connection)
module.exports = mongoose.model('user' , UserSchema);