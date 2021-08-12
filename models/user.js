var mongoose=require("mongoose");
var passwordLocalMongoose=require("passport-local-mongoose");

UserSchema=new mongoose.Schema({
	username:String,
	password:String,
})

UserSchema.plugin(passwordLocalMongoose);

module.exports=mongoose.model("User",UserSchema);