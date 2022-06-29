//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");
// const passport =require("passport");
// const passportLocalMongoose =require("passport-local-mongoose");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// const GOOGLE_CLIENT_ID="941813453217-3pt3bg5ve2udqbm6ip2ph7ikgar64k1d.apps.googleusercontent.com"
// const GOOGLE_CLIENT_SECRET="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"








const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://prajapatiharshit646:9179811811@cluster1.dpeze81.mongodb.net/blogDB");
const postSchema=new mongoose.Schema({
      title:String,
      content: String
});


// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/google/blogging",
//   userProfileURL: "https://www.googleleapis.com/oauth2/v3/userinfo"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

const Post=mongoose.model("Post",postSchema);


app.get("/",function(req,res)
{
  Post.find({},function(error,posts){
    res.render('home',{content:homeStartingContent, posts:posts});
  })
})

app.get("/about",function(req,res)
{
  res.render('about',{content:aboutContent});
})
app.get("/contact",function(req,res)
{
  res.render('contact',{content:contactContent});
})

app.get("/compose",function(req,res)
{
  res.render('compose');
})


app.get("/posts/:postId",function(req,res){
  let requestedId=req.params.postId;
  Post.findOne({_id:requestedId},function(error,post){
    res.render("post",{
      title:post.title,
      content:post.content
    })
  })
})



app.post("/compose",function(req,res)
{
  const post=new Post({
    title:req.body.postTitle,
    content:req.body.postContent
  });

  post.save();
  res.redirect("/");
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
