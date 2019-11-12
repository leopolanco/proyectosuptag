//Dependencias
var bodyParser          = require("body-parser"),
methodOverride          = require("method-override"),
express                 = require("express"),
mongoose                = require("mongoose"),
passport                = require("passport"),
LocalStrategy           = require("passport-local"),
User                    = require("./public/js/user"),//archivo de user
flash                   = require('connect-flash'),
app                     = express();


//Configuraciones generales para funcionamiento (utilizamos ejs para combinar js y html en un solo archivo)
mongoose.connect("mongodb://localhost/proyecto_app", { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true});
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(flash());

//Configuraciones de sessions y passport (para login)
app.use(require("express-session")({
    secret:"secreto",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());//Activamos passport
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//funciones
app.use(function(req, res, next){
   res.locals.error   = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

//Funcion para verificar login
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Debe ingresar para continuar.");
    res.redirect("/login");
}



//Schema de cada proyecto
var blogSchema =  new mongoose.Schema({
    pnf:String,
    nombreProyecto:String,
    nombreComunidad:String,
    Trayecto:String,
    Seccion:Number,
    profGuia:String,
    profTutor:String,
    resumenProyecto:String,
    statusProyecto:String,
    Municipio:String,
    lapsoAcademico:String,
    lineaInv:String,
    cantIntegrantes:String,
    nombreEstudiante1:String,
    nombreEstudiante2:String,
    nombreEstudiante3:String,
    nombreEstudiante4:String,
    nombreEstudiante5:String,
    notaEstudiante1:String,
    notaEstudiante2:String,
    notaEstudiante3:String,
    notaEstudiante4:String,
    notaEstudiante5:String,
    created: { type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


//Indexando todo el schema para poder utilizar busqueda
blogSchema.index({
  pnf:'text',
    nombreProyecto:'text',
    nombreComunidad:'text',
    Trayecto:'text',
    profGuia:'text',
    profTutor:'text',
    statusProyecto:'text',
    Municipio:'text',
});



//Rutas de inicio
app.get("/", function(req, res) {
    res.redirect("/inicio");
});

//Ruta de registro
app.get("/registro", function(req, res){
    res.render("../views/registro.ejs");
    
});
//Registro de cada usuario
app.post("/registro", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, User){
        if(err){
            req.flash("error", "Este usuario ya esta registrado.");
            console.log(err);
            return res.redirect('/registro');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/inicio");
        });
    });
});



//Login
app.get("/login", function(req, res){
    res.render("../views/login.ejs");
});
app.post("/login", passport.authenticate('local',{
    successRedirect: "/inicio",
    failureRedirect:  "/login",
    }),function(req, res) {
        res.redirect('/inicio');
});



//Salida
app.get("/logout", function(req, res){
    req.flash("success", "Usted ha salido.");
    req.logout();
    res.redirect("/login");
});


app.get("/inicio", isLoggedIn, function(req, res){
    res.render("../views/inicio.ejs");
});


//Ruta de muestra general
app.get("/index", function(req, res){
    //Buscar cada archivo individual
    var noMatch = null;
    if(req.query.Buscar) {
        const regex = new RegExp(escapeRegex(req.query.Buscar), 'gi');

        Blog.find({ $text: { $search: regex },}, function(err, blogs){
           if(err){
               console.log(err);
           } else {
              if(blogs.length < 0) {
                  req.flash("error", "No hubo coincidencias.");
              }
              res.render("../views/index.ejs",{blogs:blogs, noMatch: noMatch});
           }
        });

    } else {
    //Todos los archivos
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } 
        else {
            res.render("../views/index.ejs", {blogs: blogs});
        }
    });
    }
});



//Ruta de archivar o guardar
app.get("/archivar", isLoggedIn, function(req, res){
            res.render("archivar.ejs");
});

app.post("/index", function(req, res){
    req.flash("success", "Su proyecto fue agregado.");
    Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           console.log(err);
            res.render("../views/archivar.ejs");
        } 
        else {
           res.redirect("/index");
       }
    });
});



//Ruta de muestra individual
app.get("/index/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("../views/index.ejs");
        }
        else {
            res.render("show.ejs", {blog: foundBlog});
        }
    });
});

//Ruta de edicion
app.get("/index/:id/edit", isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/index");
        }
        else {
            res.render("../views/edit.ejs", {blog: foundBlog});
        }
    });
});

app.put("/index/:id", isLoggedIn, function(req, res){
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/index");
        }
        
        else {
            req.flash("success", "Su proyecto fue editado con exito.");
            res.redirect("/index/"+ req.params.id);
        }
    });
});



//Ruta de eliminado
app.delete("/index/:id", isLoggedIn, function(req, res){
    req.flash("error", "Su proyecto fue eliminado.");
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/index");
            console.log("Error deleting");
        }
        else {
            res.redirect("/index/");
        }
    });
});



//Servimos los archivos estaticos
app.get("/css/util.css", function(req, res){
    res.sendFile("../public/css/util.css");
});
app.get("/css/main.css", function(req, res){
    res.sendFile("../public/css/main.css");
});
app.get("/css/bootstrap.min.css", function(req, res){
    res.sendFile("../public/css/bootstrap.min.css");
});
app.get("/fonts/font-awesome-4.7.0/css/font-awesome.min.css", function(req, res){
    res.sendFile("../public/fonts/font-awesome-4.7.0/css/font-awesome.min.css");
});
app.get("/fonts/Linearicons-Free-v1.0.0/icon-font.min.css", function(req, res){
    res.sendFile("../public/fonts/Linearicons-Free-v1.0.0/icon-font.min.css");
});

app.get("/fonts/poppins/Poppins-Regular.ttf", function(req, res){
    res.sendFile("../public/fonts/poppins/Poppins-Regular.ttf");
});
app.get("/fonts/montserrat/Montserrat-Regular.ttf", function(req, res){
    res.sendFile("../public/fonts/montserrat/Montserrat-Regular.ttf");
});
app.get("/fonts/montserrat/Montserrat-Bold.ttf", function(req, res){
    res.sendFile("../public/fonts/montserrat/Montserrat-Bold.ttf");
});
//js
app.get("/js/main.js", function(req, res){
   res.sendFile("../public/js/main.js");
});
app.get("/js/jquery-3.2.1.min.js", function(req, res){
    res.sendFile("../public/js/jquery-3.2.1.min.js");
});

//imagenes
app.get("/images/bguptag.jpg", function(req, res){
    res.sendFile("../public/images/bguptag.jpg");
});
app.get("/images/iconuptag.jpg", function(req, res){
    res.sendFile("../public/images/iconuptag.jpg");
});
app.get("/images/cclogo.png", function(req, res){
    res.sendFile("../public/images/cclogo.png");
});
app.get("/images/bg-01.png", function(req, res){
    res.sendFile("../public/images/bg-01.png");
});



//Funcion de seguridad
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//Aviso de funcionamiento
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Activo!");
})