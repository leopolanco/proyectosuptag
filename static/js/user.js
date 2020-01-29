var mongoose                 = require("mongoose"),
    passportLocalMongoose    = require("passport-local-mongoose");

//Schema de cada user
var UserSchema = new mongoose.Schema({
    username:   {type: String, required: [true, 'Por favor ingrese su nombre de usuario'], unique:true},
    email: {type: String, required: [true, 'Por favor ingrese su email'], unique:true},
    preguntaSecreta:String,
    codigo:   {type: String, required: [true, 'Por favor ingrese su codigo']},
    password:String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
