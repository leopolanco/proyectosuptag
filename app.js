//Dependencias
var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./static/js/user"), //archivo de user
    flash = require('connect-flash'),
    app = express(),
    {exec} = require('child_process');

//Configuraciones generales para funcionamiento (utilizamos ejs para combinar js y html en un solo archivo)
//mongoose.connect("mongodb://localhost/proyecto_app", { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://leo:polanco@uptag-qexum.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});//Si se necesita entrar desde el cmd, se escribe "mongo mongodb+srv://leo:polanco@uptag-qexum.mongodb.net"
app.use(express.static("static"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
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
    req.session.returnTo = req.originalUrl; //Funcion para recordar la ultima pagina a la que se quiso acceder antes de salir el aviso de login
    res.redirect("/login");
}

//Schema de cada proyecto
var proySchema = new mongoose.Schema({
    tituloProyecto:    {type: String, required: [true, 'Por favor ingrese el titulo del proyecto'], unique:true,  text:true},      
    pnf:               {type: String, required: [true, 'Por favor ingrese el pnf del proyecto'],  text:true}, 
    comunidad:         {type: String, required: [true, 'Por favor ingrese la comunidad del proyecto'],  text:true},        
    trayecto:          {type: String, required: [true, 'Por favor ingrese el trayecto del proyecto'],  text:true},        
    seccion:           {type: String,   text:true},        
    profGuia:          {type: String,   text:true}, 
    profTutor:         {type: String,   text:true}, 
    resumenProyecto: String,
    statusProyecto:    {type: String, required: [true, 'Por favor ingrese el estatus del proyecto']},
    municipio:         {type: String, required: [true, 'Por favor ingrese el municipio del proyecto']},          
    lapsoAcademico:    {type: String, required: [true, 'Por favor ingrese el lapso academico del proyecto'],  text:true},
    lineaInv:          {type: String,   text:true}, 
    cantIntegrantes: String,
    nombreEstudiante1: {type: String, required: [true, 'Por favor ingrese integrante/s del proyecto'],  text:true },
    nombreEstudiante2: {type: String,   text:true}, 
    nombreEstudiante3: {type: String,   text:true}, 
    nombreEstudiante4: {type: String,   text:true}, 
    nombreEstudiante5: {type: String,   text:true}, 
    cedulaEstudiante1: {type: String, required: [true, 'Por favor ingrese la cedula del integrante/s del proyecto']},
    cedulaEstudiante2: {type: String,   text:true}, 
    cedulaEstudiante3: {type: String,   text:true}, 
    cedulaEstudiante4: {type: String,   text:true}, 
    cedulaEstudiante5: {type: String,   text:true}, 
    notaEstudiante1: String,
    notaEstudiante2: String,
    notaEstudiante3: String,
    notaEstudiante4: String,
    notaEstudiante5: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Proy = mongoose.model("Proy", proySchema);

proySchema.index({ '$**': 'text' });

//SE NECESITA HABILITAR LA BUSQUEDA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
        username: req.body.username
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

//Login
app.get("/login", function(req, res) {
    res.render("../views/login.ejs");
});
app.post("/login", passport.authenticate('local', {
    successRedirect: "/inicio",
    failureRedirect: "/login",
}), function(req, res) {
    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
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
            Proy.find({$text: { $search: req.query.search}}, function(err, proys) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("../views/index.ejs", {proys: proys});
                }
            });
        } else {
            Proy.find({}).sort({ _id: 'desc' }).exec(function(err, proys) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("../views/index.ejs", {proys: proys});
                }
            });
        }
});
    

//Envio de formulario de creacion
app.post("/index", isLoggedIn, function(req, res) {
    req.flash("success", "Su proyecto fue agregado.");
    Proy.find({}, function(err, proys) {
        if (err) {
            console.log(err);
        } else {
            Proy.create(req.body.proy, function(err, newProy) {
                if (err) {
                    req.flash("error", err.message);
                    console.log(err);
                    res.redirect("/archivar");
                } else {
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
app.put("/index/:id", isLoggedIn, function(req, res) {
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
    Proy.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/index");
            console.log("Error deleting");
        } else {
            res.redirect("/index/");
        }
    });
});

//Pagina de ayuda, seguida por los archivos descargables
app.get("/ayuda", function(req, res) { 
    //El comando crea el respaldo de la base de datos desde la cmd
    exec('mongoexport --forceTableScan --host uptag-shard-0/uptag-shard-00-00-qexum.mongodb.net:27017,uptag-shard-00-01-qexum.mongodb.net:27017,uptag-shard-00-02-qexum.mongodb.net:27017 --ssl --username leo --password polanco --authenticationDatabase admin --db test --collection proys --type json  --out ./public/BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES-RESPALDO.json');
    res.render("../views/ayuda.ejs");
});
app.get("/MANUAL-DE-SISTEMA-DE-BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES", function(req, res) {
    res.download("./public/MANUAL-DE-SISTEMA-DE-BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES.docx");
});
app.get("/BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES-RESPALDO", function(req, res) {
    res.download("./public/BASE-DE-DATOS-DE-PROYECTOS-SOCIOINTEGRADORES-RESPALDO.json");
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
app.get("/images/logopnfe.png", function(req, res) {
    res.sendFile("../static/images/logopnfe.png");
});
app.get("/images/imageslogopnfiyc", function(req, res) {
    res.sendFile("../static/imageslogopnfiyc.png");
});
app.get("/images/logopnfelectronica.png", function(req, res) {
    res.sendFile("../static/images/logopnfelectronica.png");
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
app.get("/images/fotoindex.png", function(req, res) {
    res.sendFile("../static/images/fotoindex.png");
});
app.get("/images/fotoshow.jpg", function(req, res) {
    res.sendFile("../static/images/fotoshow.jpg");
});
app.get("/images/fotobotonvistasimple.png", function(req, res) {
    res.sendFile("../static/images/fotobotonvistasimple.png");
});
app.get("/images/botonesexportar.png", function(req, res) {
    res.sendFile("../static/images/botonesexportar.png");
});
app.get("/images/fotoexcel.png", function(req, res) {
    res.sendFile("../static/images/fotoexcel.png");
});
app.get("/images/indexsimple.png", function(req, res) {
    res.sendFile("../static/images/indexsimple.png");
});
app.get("/images/flechanaranja.png", function(req, res) {
    res.sendFile("../static/images/flechanaranja.png");
});
app.get("/images/fotoarchivar.png", function(req, res) {
    res.sendFile("../static/images/fotoarchivar.png");
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