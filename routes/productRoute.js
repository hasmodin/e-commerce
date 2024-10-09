import express from "express";
const router = express.Router();

router.get("/products", (req, res) => {
    res.render("products/index.ejs");

})





export default router;