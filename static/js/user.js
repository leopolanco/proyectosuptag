var mongoose                 = require("mongoose"),
    passportLocalMongoose    = require("passport-local-mongoose");

//Schema de cada user
var UserSchema = new mongoose.Schema({
    username: {type: String, required: [true, 'Por favor ingrese su usuario'], unique:true},
    password:{type: String, required: [true, 'Por favor ingrese su contraseña']},
});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
