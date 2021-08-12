var express=require("express");
var router=express.Router({mergeParams:true});
var Question=require("../models/question");

router.get("/question",function(req,res){
	
	Question.find({},function(err,qstns){
		if(err){
			console.log(err);
		}else{
			res.render("questions/Index",{question:qstns});
			
		}
	})
	
})



router.post("/question",isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newQuestion={name:name,image:image,description:desc,author:author};
	
	Question.create(newQuestion,function(err,newqstns){
		if(err){
				console.log(err)
;		}else{
	
	         res.redirect("/question");
	
}
	})
	
	
	
})

router.get("/question/new",isLoggedIn,function(req,res){
	
	res.render("questions/new");
});

router.get("/question/:id",function(req,res){
	Question.findById(req.params.id).populate("comments").exec(function(err,foundQuestion){
		if(err){

		console.log(err)
		}else{
			
			res.render("questions/show",{question:foundQuestion});
			
		}
	})
	
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();

	}
	else{
		res.redirect("/login");
	}

}



module.exports=router;