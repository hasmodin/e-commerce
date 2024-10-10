import 'dotenv/config'

import express, { application, urlencoded } from "express";
import mongoose from 'mongoose';
const app = express();
import path from "path";
import { fileURLToPath } from 'url';
import engine from "ejs-mate";
import methodOverride from "method-override";
import passport from 'passport';
import LocalStrategy from "passport-local";
import session from 'express-session';
import flash from "connect-flash";
import User from "./models/userModel.js";
import productRouter from "./routes/productRoute.js"
import mobileRouter from "./routes/mobileRoute.js"
import userRouter from "./routes/userRoute.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

main()
.then((response) => {
    console.log("Connected to DB");
})
.catch((error) => {
    console.log(error);
})

async function main() {
    mongoose.connect(process.env.MONGODB_URL);
}


app.set("view engine", "ejs");
app.set("views",  path.join(__dirname, "views"));

//middleware
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine("ejs", engine);
app.use(methodOverride("_method"));
const sessionOptions =({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7days, 24hours, 60minutes, 60sec, 1000milisecond
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
     }
})

//middleware for flash messages
app.use(flash());

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

//passport configuration 
passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
   res.locals.currUser = req.user;
  next();
})


// All routes
app.use("/", productRouter);
app.use("/", mobileRouter);
app.use("/", userRouter);


app.get("/products/laptops", (req, res) => {
    res.render("products/laptops/index.ejs");
})
app.get("/products/tablets", (req, res) => {
    res.render("products/tablets/index.ejs");
})

app.get("/", (req, res) => {
    res.send("Hi, I am root");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);

})