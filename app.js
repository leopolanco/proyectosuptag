//Dependencias
var methodOverride = require("method-override"), //para utilizar metodos put y delete
    express = require("express"), 
    mongoose = require("mongoose"),
    passport = require("passport"), //para controlar los logins y registros
    LocalStrategy = require("passport-local"),
    User = require("./static/js/user"), //archivo de user
    flash = require('connect-flash'), //para mensajes
    { exec } = require('child_process'), //para los respaldos
    http = require('http') //para localhost
    autoIncrement = require('mongoose-auto-increment'),
    multer = require("multer"), //para leer formulario multipartes
    fs = require("fs"), //leer y cambiar nombre de archivos
    app = express();
    
//para habilitar el localhost    
var port = normalizePort(process.env.PORT || '0130');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
function normalizePort(val) {
   var port= parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
   return false;
 }

//Esta base de datos es de localhost
mongoose.connect("mongodb://localhost/proyecto_app", { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true}); 

//Esta base de datos es remota (recomendada)
//mongoose.connect("mongodb+srv://leo:polanco@uptag-qexum.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true,useFindAndModify: false,useCreateIndex: true,useUnifiedTopology: true});
//Si se necesita entrar desde el cmd a la base de datos remota, se escribe "mongo mongodb+srv://leo:polanco@uptag-qexum.mongodb.net"
app.use(express.static("static"));
app.use(methodOverride("_method"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash());

//Configuraciones de sessions y passport (para login)
app.use(require("express-session")({
    secret: "secreto",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize()); //Activamos passport
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Para activar estas funciones en todas las paginas, documentacion: https://expressjs.com/es/guide/using-middleware.html
app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    Proy.find({}).sort({ _id: 'desc' }).exec(function(err, proys) {
                if (err) {
                    console.log(err);
                } else {
                    res.locals.proys = proys;
                }
                next();
            });
});

//Funcion para verificar login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Debe ingresar para continuar.");
    res.redirect("/login");
}

//Schema de cada proyecto
var proySchema = new mongoose.Schema({
    tituloProyecto:    {type: String, required: [true, 'Por favor ingrese el titulo del proyecto']},      
    pnf:               {type: String, required: [true, 'Por favor ingrese el pnf del proyecto'],  }, 
    comunidad:         {type: String, required: [true, 'Por favor ingrese la comunidad del proyecto'],  },        
    trayecto:          {type: String, required: [true, 'Por favor ingrese el trayecto del proyecto'],  },        
    seccion:           {type: String,   },        
    profGuia:          {type: String,   }, 
    profTutor:         {type: String,   }, 
    resumenProyecto:   String,
    statusProyecto:    {type: String, required: [true, 'Por favor ingrese el estatus del proyecto']},
    municipio:         {type: String, required: [true, 'Por favor ingrese el municipio del proyecto']},          
    lapsoAcademico:    {type: String, required: [true, 'Por favor ingrese el lapso academico del proyecto'],  },
    lineaInv:          {type: String,   }, 
    cantIntegrantes:   String,
    nombreEstudiante1: {type: String, required: [true, 'Por favor ingrese integrante/s del proyecto'],   },
    nombreEstudiante2: {type: String,   }, 
    nombreEstudiante3: {type: String,   }, 
    nombreEstudiante4: {type: String,   }, 
    nombreEstudiante5: {type: String,   }, 
    cedulaEstudiante1: {type: String, required: [true, 'Por favor ingrese la cedula del integrante/s del proyecto']},
    cedulaEstudiante2: {type: String,   }, 
    cedulaEstudiante3: {type: String,   }, 
    cedulaEstudiante4: {type: String,   }, 
    cedulaEstudiante5: {type: String,   }, 
    notaEstudiante1:   String,
    notaEstudiante2:   String,
    notaEstudiante3:   String,
    notaEstudiante4:   String,
    notaEstudiante5:   String,
    cod:               {type: String, unique:true},
    created:           {type: Date, default: Date.now}
});

autoIncrement.initialize(mongoose.connection);
proySchema.plugin(autoIncrement.plugin, 'Proy');

var Proy = mongoose.model("Proy", proySchema);

proySchema.set('autoIndex', false);
proySchema.index({ '$**': 'text' });

//Rutas de inicio
app.get("/", function(req, res) {
    res.redirect("/inicio");
});
app.get("/inicio", function(req, res) {
    res.render("../views/inicio.ejs");
});

//Ruta de registro
app.get("/registro", function(req, res) {
    res.render("../views/registro.ejs");
});

//Registro de cada usuario
app.post("/registro", function(req, res) {
    var newUser = new User({
        username: req.body.username,
        preguntaSecreta: req.body.preguntaSecreta,
        codigo: req.body.codigo,
        email: req.body.email
    });
    User.register(newUser, req.body.password, function(err, User) {
        if (err) {
            req.flash("error", err);
            console.log(err);
            return res.redirect('/registro');
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/inicio");
        });
    });
});


//Falta activar la funcion de validar ambas contrase;as

//Login

var limitedeTiempo=0,//Estos valores sirven para controlar el numero de intentos de login
contadordeIntentos=0;

app.get("/login", function(req, res) {
    req.session.destroy();
    var temporizador = new Date().getTime();
    if (temporizador > limitedeTiempo ){
        contadordeIntentos=0;
    };
    res.render("../views/login.ejs", {
        contadordeIntentos: contadordeIntentos
    });
});

app.post("/login",  function(req, res, next) {
    passport.authenticate('local', {session : false},
    function(err, user, info) {
        if (err) {
            //Para cuando el login falla por alguna razon
            req.flash("error", err.message);
            return res.redirect("/login")
            //Para cuando no se ingresan datos correctos
        } else if (!user) {
            if (contadordeIntentos<2) {
                contadordeIntentos++;
                limitedeTiempo = new Date().getTime()+12000;
                req.flash("error", "Los datos ingresados son invalidos");
                return res.redirect("/login");
            } else {
                contadordeIntentos++;
                req.flash("error", "Ha superado el numero de intentos permitidos"); 
                req.flash("success", "Actualice la página en 10 segundos");
                return res.redirect("/login");
            }
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("/login");
            }
            return res.redirect("/inicio");
        });
    })(req, res, next);
});

//Cambio de contrase;as
app.get("/cambio-de-contrasena", function(req, res) {
    req.session.destroy();
    res.render("../views/cambio-de-contrasena.ejs");
});

app.post("/cambio-de-contrasena", function(req, res) {
    User.findOne({email: req.body.email}, function(err, userVerified) {
                if (err) {
                    console.log(err);
                } else {
                    if (!userVerified) {
                        req.flash("success", "No se pudo verificar su identidad.");
                        res.redirect("/cambio-de-contrasena");
                        console.log(err);
                    } else {
                        req.session.user = userVerified;
                        res.redirect("/cambio-de-contrasena2");                      
                    }
                }
            });
});

app.get("/cambio-de-contrasena2", function(req, res) {
    res.render("../views/cambio-de-contrasena2.ejs", {user: req.session.user});
});

app.post("/cambio-de-contrasena2", function(req, res) {
    User.findOne({email: req.session.user.email, codigo: req.body.codigo}, function(err, userVerified) {
        if(!userVerified) {
            req.flash("success", "Su respuesta secreta es invalida.");
            res.redirect("/cambio-de-contrasena");
        } else {
            userVerified.setPassword(req.body.password, function(err){
                if (err) {                
                    console.log(err);
                } else {
                    userVerified.save();
                    req.flash("success", "Su contraseña fue cambiada con exito.");
                    res.redirect("/login");
                }
            });
        }                    
    });
});

//Logout o salida
app.get("/logout", function(req, res) {
    req.flash("success", "Usted ha salido.");
    req.logout();
    res.redirect("/login");
});

//Ruta de muestra general
app.get("/index", function(req, res) {
    if (req.query.search) {
        Proy.find({$text: { $search: `"${req.query.search}"`} }, function(err, foundProys) {
            if (err) {
                console.log(err);
            } else {
                Proy.find({}).sort({ _id: 'desc' }).exec(function(err, proys) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render("../views/index.ejs", {
                            proy: foundProys,
                            proys: proys
                        });
                    }
                });
            }
        });
    } else {
        Proy.find({}).sort({ _id: 'desc' }).exec(function(err, proys) {
            if (err) {
                console.log(err);
            } else {
                res.render("../views/index.ejs", {proys: proys, proy:false});
            }
        });
    }
});
    
function normalizarId(id, pnf, trayecto) {

    if(pnf=="PNF en Instrumentacion y Control"){
        pnf="IYC";
    } else if(pnf=="PNF en Electricidad"){
        pnf="ELC";
    } else {
        pnf="ECA";
    }
 finalId=pnf+trayecto+"0"+id;
    return finalId;
 }

var upload = multer({ 
    dest: './pdfProyectos/' 
})

//Envio de formulario de creacion
app.post("/index", upload.single("file"), isLoggedIn, function(req, res) {
    req.flash("success", "Su proyecto fue agregado.");
    Proy.find({}, function(err, proys) {
        if (err) {
            console.log(err);
            res.redirect("/index");
        } else {
            Proy.create(req.body.proy, function(err, newProy) {
                if (err) {
                    req.flash("error", err.message);
                    console.log(err);
                    res.redirect("/archivar");
                } else {
                    req.body.proy.cod=normalizarId(newProy._id, req.body.proy.pnf, req.body.proy.trayecto); //Para colocar el codigo al documento
                    Proy.findByIdAndUpdate(newProy._id, req.body.proy, {new: true}, function(err, finalNewProy){
                        if (err) {
                            req.flash("error", err.message);
                            console.log(err);
                        }});
                    if(req.file){
                        fs.rename(req.file.path, 'pdfProyectos\\'+req.body.proy.cod+'.pdf', function(err){
                            if (err){
                            console.log(err);
                            res.redirect("/index");
                            }
                        });
                    };    
                    res.redirect("/index");
                }
            });
        }
    });
});

//Ruta de vista simple
app.get("/indexsimple", function(req, res) {
        res.render("../views/indexsimple.ejs");
});

//Ruta de archivar o guardar
app.get("/archivar", isLoggedIn, function(req, res) {
        res.render("../views/archivar.ejs");
});


//Ruta de muestra individual
app.get("/index/:id", function(req, res) {
    Proy.findById(req.params.id, function(err, foundProy) {
        if (err) {
            res.redirect("../views/index.ejs");
        } else {
            res.render("show.ejs", {
                proy: foundProy
            });
        }
    });
});

app.get("/pdfProyectos/:cod", function(req,res){
    fs.readFile('.\\pdfProyectos\\'+req.params.cod+'.pdf', "binary", function(err,file){
        if(err){
            console.log(err);
            req.flash("error", "Su archivo no se encontró"); 
            res.redirect("/index");
        } else {
            res.writeHead(200, {"Content-Type" : "application/pdf" });
            res.write(file, "binary" );
            res.end();
        }
    })
});

//Ruta de edicion
app.get("/index/:id/edit",isLoggedIn, function(req, res) {
    Proy.findById(req.params.id, function(err, foundProy) {
        if (err) {
            req.flash("error", "Su proyecto no pudo ser editado.");
            console.log(err);
            res.redirect("/index");
        } else {
            Proy.find({}, function(err, proys) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("../views/edit.ejs", {
                        proy: foundProy,
                        proys: proys
                    });
                }
            });
        }
    });
});

//Envio de formulario editado
app.put("/index/:id", upload.single('file'),isLoggedIn, function(req, res) {
    if(req.file){
        fs.rename(req.file.path, 'pdfProyectos\\'+req.body.proy.cod+'.pdf', function(err){
            if (err){
            console.log(err);
            }
    })}
    Proy.findByIdAndUpdate(req.params.id, req.body.proy, function(err, updatedProy) {
        if (err) {
            req.flash("error", "Su proyecto no pudo ser editado.");
            console.log(err);
            res.redirect("/index");
        } else {
            req.flash("success", "Su proyecto fue editado con exito.");
            res.redirect("/index/" + req.params.id);
        }
    });
});

//Ruta de eliminado
app.delete("/index/:id", isLoggedIn, function(req, res) {
    req.flash("error", "Su proyecto fue eliminado con exito.");
    Proy.findById(req.params.id, function(err, foundProy) {
        if (err) {
            res.redirect("../views/index.ejs");
            console.log(err);
        } else {//Este codigo comprueba si existe el archivo y luego lo elimina
            if(fs.existsSync('pdfProyectos\\'+foundProy.cod+'.pdf')) {
                fs.unlink('pdfProyectos\\'+foundProy.cod+'.pdf', function(err){
                    if(err){console.log(err); res.redirect("/index")}
                });
            }
            Proy.findByIdAndRemove(req.params.id, function(err) {
                if (err) {
                    res.redirect("/index");
                    console.log(err);
                } else {
                    res.redirect("/index/");
                }
            });
        }
    });
});


//Pagina de ayuda, seguida por los archivos descargables
app.get("/ayuda", function(req, res) { 
    //El comando crea el respaldo de la base de datos desde la cmd
    exec('mongoexport --collection=proys --db=proyecto_app  --out=./public/BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES-RESPALDO.json');
    res.render("../views/ayuda.ejs");
});
app.get("/MANUAL-DE-SISTEMA-DE-BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES", function(req, res) {
    res.download("./public/MANUAL-DE-SISTEMA-DE-BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES.docx");
});
app.get("/BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES-RESPALDO", function(req, res) {
    res.download("./public/BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES-RESPALDO.json");
});

app.get("/MANUAL-DE-USUARIO-PROYECTOS-LL", function(req, res) {
    res.download("./public/MANUAL-DE-USUARIO-PROYECTOS-LL.docx");
});

//Servimos los archivos estaticos

//css
app.get("/css/util.css", function(req, res) {
    res.sendFile("../static/css/util.css");
});
app.get("/css/main.css", function(req, res) {
    res.sendFile("../static/css/main.css");
});
app.get("/css/bootstrap.min.css", function(req, res) {
    res.sendFile("../static/css/bootstrap.min.css");
});
app.get("/css/proy.css", function(req, res) {
    res.sendFile("../static/css/proy.css");
});

//imagenes
app.get("/images/bguptag.jpg", function(req, res) {
    res.sendFile("../static/images/bguptag.jpg");
});
app.get("/images/iconuptag.jpg", function(req, res) {
    res.sendFile("../static/images/iconuptag.jpg");
});
app.get("/images/cclogo.png", function(req, res) {
    res.sendFile("../static/images/cclogo.png");
});
app.get("/images/logopnfe.jpg", function(req, res) {
    res.sendFile("../static/images/logopnfe.jpg");
});
app.get("/images/logopnfiyc.jpg", function(req, res) {
    res.sendFile("../static/logopnfiyc.jpg");
});
app.get("/images/logopnfelectronica.jpg", function(req, res) {
    res.sendFile("../static/images/logopnfelectronica.jpg");
});
app.get("/images/bg-01.png", function(req, res) {
    res.sendFile("../static/images/bg-01.png");
});
app.get("/images/logouptag.jpg", function(req, res) {
    res.sendFile("../static/images/logouptag.jpg");
});
app.get("/images/logopnfi.jpg", function(req, res) {
    res.sendFile("../static/images/logopnfi.jpg");
});
app.get("/images/fotoindex.jpg", function(req, res) {
    res.sendFile("../static/images/fotoindex.jpg");
});
app.get("/images/mirarabajo.png", function(req, res) {
    res.sendFile("../static/images/mirarabajo.png");
});
app.get("/images/fotoshow.jpg", function(req, res) {
    res.sendFile("../static/images/fotoshow.jpg");
});
app.get("/images/fotobotonvistasimple.jpg", function(req, res) {
    res.sendFile("../static/images/fotobotonvistasimple.jpg");
});
app.get("/images/botonesexportar.png", function(req, res) {
    res.sendFile("../static/images/botonesexportar.png");
});
app.get("/images/fotoexcel.png", function(req, res) {
    res.sendFile("../static/images/fotoexcel.png");
});
app.get("/images/indexsimple.jpg", function(req, res) {
    res.sendFile("../static/images/indexsimple.jpg");
});
app.get("/images/flechanaranja.png", function(req, res) {
    res.sendFile("../static/images/flechanaranja.png");
});
app.get("/images/fotoarchivar.jpg", function(req, res) {
    res.sendFile("../static/images/fotoarchivar.jpg");
});
//js
app.get("/js/main.js", function(req, res) {
    res.sendFile("../static/js/main.js");
});

//datatables(indexsimple)

//css
app.get("/datatables/css/buttons.dataTables.min.css", function(req, res) {
    res.sendFile("../static/css/buttons.dataTables.min.css");
});

app.get("/datatables/css/jquery.dataTables.min.css", function(req, res) {
    res.sendFile("../static/css/jquery.dataTables.min.css");
});
//js
app.get("/datatables/js/buttons.html5.min.js", function(req, res) {
    res.sendFile("../static/js/buttons.html5.min.js");
});
app.get("/datatables/js/buttons.jqueryui.min.js", function(req, res) {
    res.sendFile("../static/js/buttons.jqueryui.min.js");
});
app.get("/datatables/js/dataTables.buttons.min.js", function(req, res) {
    res.sendFile("../static/js/dataTables.buttons.min.js");
});
app.get("/datatables/js/jquery-3.3.1.js", function(req, res) {
    res.sendFile("../static/js/jquery-3.3.1.js");
});
app.get("/datatables/js/jquery.dataTables.min.js", function(req, res) {
    res.sendFile("../static/js/jquery.dataTables.min.js");
});
app.get("/datatables/js/jszip.min.js", function(req, res) {
    res.sendFile("../static/js/jszip.min.js");
});



app.get("/test", function(req, res) {
            res.render("../views/test.ejs");
});

//Aviso de funcionamiento
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Activo!");
})