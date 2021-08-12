var express 		= require("express"),
    app				=express(),
    bodyParser		=require("body-parser"),
    mongoose		=require("mongoose"),
	passport		=require("passport"),
	LocalStrategy	=require("passport-local"),
	Question		=require("./models/question"),
	Comment			=require("./models/comment"),
	User			=require("./models/user"),
	seedDB			=require("./seeds");
var commentRoutes	=require("./routes/comments"),
    questionRoutes=require("./routes/questions"),
	authRoutes      =require("./routes/auth");

  

//seedDB();

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.use(require("express-session")({
	
	secret:"Once again rusty is dog",
	resave:false,
	saveUninitialized:false
	
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});





app.use(questionRoutes);
app.use(commentRoutes);
app.use(authRoutes);




app.listen(3000,function(){
	console.log("Stack Overflow server is started");
})