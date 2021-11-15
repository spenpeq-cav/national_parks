require('dotenv').config();
const express = require("express");
const path = require('path');
const mongoose = require('mongoose')
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(session({
    secret: process.env.SECRET,
    name: "natparks",
    cookie: {
        httpOnly: true,
        maxAge: 86400000
    },
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const DB_PASS = process.env.DB_PASS
mongoose.connect("mongodb+srv://spenUser:" + DB_PASS + "@cluster0.jneic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: String,
    password: String,
    favorites: [String],
})

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", userSchema)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.get("/api", (req, res) => {
    if(req.isAuthenticated()){
        res.json({ message: "Authenticated!" });
    } else {
        res.json({ message: "Not Authenticated!" });
    }
});

app.get("/user", function(req, res){
    res.send(req.user)
})

app.get("/userauth", (req, res) => {
    if(req.isAuthenticated()){
        res.json({ auth: true });
    } else {
        res.json({ auth: false });
    }
});

app.get("/logout", function(req, res){
    req.logOut()
    req.session.destroy()
    res.clearCookie("natparks", {
        path: "/",
        httpOnly: true, 
        secure: "none",
        sameSite: "none",    
        expires: new Date(1), 
    })
    req.session.destroy()
})




app.post("/checkFavorite", function(req, res){
    var alreadyAFavorite = false
    const parkcode = req.body.parkcode

    if(req.isAuthenticated()){
        User.findById(req.user._id, function(err, doc){
            if(err){
                console.log(err)
            } else{
                for(var i = 0; i < doc.favorites.length; i++){
                    if(doc.favorites[i] == parkcode){
                        alreadyAFavorite = true
                        res.send({alreadyAFavorite: alreadyAFavorite, auth: true})
                        break;
                    }
                }
            }
        })
    } else {
        res.send({alreadyAFavorite: false, auth: false});
    }
})

app.post("/register", function(req, res){
    User.findOne({username: req.body.username}, (err, doc) => {
        if(err){
            console.log(err)
        }
        if(doc){
            res.send("User with that email already exists")
        }
        if(!doc){
            User.register({username: req.body.username, first: req.body.firstName, last: req.body.lastName}, req.body.password, function(err, user){
                if(err){
                    console.log(err)
                    res.redirect("/register")
                } else {
                    passport.authenticate("local")(req, res, function(){
                        res.redirect("/profile")
                    })
                }
                
            })
        }
    })   
})

app.post("/login", function(req, res, next){
    passport.authenticate("local", (err,user,info) => {
        if(err) {
            console.log(err)
        }
        if(!user){
            res.send("No User Exists")
        } else {
            req.logIn(user, err =>{
                if(err) {
                    console.log(err)
                }
                res.send({
                    "user": {
                        "username": user.username, 
                        "first": user.first,
                        "last": user.last,
                        "favorites": user.favorites
                }})
            })
        }
    })(req, res, next)
})

app.post("/favoriteAddOrRemove", (req, res) => {
    const alreadyAFavorite = req.body.alreadyAFavorite

    if(req.isAuthenticated()){
        User.findById(req.user._id, function(err,user){
            if(err){
                console.log(err)
            } else if(!alreadyAFavorite){
                User.findByIdAndUpdate(
                    req.user._id,
                    { $push: { favorites : req.body.parkCode}},
                    {upsert: true, new: true}, function(err, model) {
                        console.log(err)
                    }
                )
            } else{
                User.findByIdAndUpdate(
                    req.user._id,
                    { $pull: { favorites : req.body.parkCode}},
                    {upsert: true, new: true}, function(err, model) {
                        console.log(err)
                    }
                )
            }
        })

    } else {
        res.send("Not Authenticated");
    }
});




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});