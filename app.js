import 'dotenv/config'

import express, { application, urlencoded } from "express";
import mongoose from 'mongoose';
const app = express();
import path from "path";
import { fileURLToPath } from 'url';
import engine from "ejs-mate";
import methodOverride from "method-override";
import productRouter from "./routes/productRoute.js"
import mobileRouter from "./routes/mobileRoute.js"
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


// All routes

app.use("/", productRouter);
app.use("/", mobileRouter);


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