import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import passport from "passport";

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
  let { email, username, password } = req.body;
  try {
    const user = await User.register(new User({ username, email }), password);
    req.flash("success", "Signup successful");
    res.redirect("/products");
  } catch (error) {
    console.log(error);
    req.flash("error", "Failed to signup");
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login", failureFlash:true }),
  function (req, res) {
    req.flash("success", "Welcome back!")
    res.redirect("/products");
  }
);

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash("success", "You logged out");
      res.redirect('/products');
    });
  });

export default router;
