var express=require("express");
var router=express.Router({mergeParams:true});
var Question=require("../models/question");
var Comment=require("../models/comment");

router.get("/question/:id/comments/new",isLoggedIn,function(req,res){
	Question.findById(req.params.id,function(err,question){
      if(err)
		  {
			  console.log(err);

		  }
		else{
			
			res.render("comments/new",{question:question});
			
			

		}
	})

})

router.post("/question/:id/comments",isLoggedIn,function(req,res){
	Question.findById(req.params.id,function(err,question){
		if(err){
			console.log(err);
			
			res.redirect("/question");
			

		}
		else{
			Comment.create(req.body.comment,function(err,comment){

			if(err){
				console.log(err);
			}else{
				
				question.comments.push(comment);
				question.save();
				
				res.redirect('/question/'+question._id);
			}
			})
		}
	})
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();

	}
	else{
		res.redirect("/login");
	}

}

module.exports=router;