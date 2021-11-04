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
})

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", userSchema)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.get("/api", (req, res) => {
    res.json({ message: "Hello from server use api route!" });
});


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
                        console.log("Success")
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
                res.send("Successfully Authenticated")
                console.log(req.user)
            })
        }
    })(req, res, next)
})

app.get("/profile", function(req, res){
    res.send(req.user)
})

app.get("/logout", function(req, res){
    req.logout()
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});