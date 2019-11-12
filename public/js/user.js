var mongoose                 = require("mongoose"),
    passportLocalMongoose    = require("passport-local-mongoose");

//Schema de cada user
var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
