import express, { application } from "express";
const router = express.Router();
import multer from "multer";
import { storage } from "../cloudConfig.js";
const upload = multer({ storage });
import Mobile from "../models/mobileModel.js";
import User from "../models/userModel.js";

router.get("/products/mobiles", async (req, res) => {
  const mobiles = await Mobile.find({});
  res.render("products/mobiles/index.ejs", { mobiles });
});

router.get("/products/mobiles/newMobile", (req, res) => {
  res.render("products/mobiles/newMobile.ejs");
});

router.post(
  "/products/mobiles",
  upload.single("mobile[image]"),
  async (req, res) => {
    try {
      const newMobile = new Mobile(req.body.mobile);
      let url = req.file.path;
      let filename = req.file.filename;
      newMobile.image = { url, filename };
      newMobile.owner = req.user._id;
      await newMobile.save();
      req.flash("success", "New mobile uploaded");
      res.redirect("/products/mobiles");
    } catch (error) {
      console.log(error);
      req.flash("error", "Something went wrong!");
      res.redirect("/products/mobiles/newMobile");
    }
  }
);

router.get("/products/mobiles/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const mobile = await Mobile.findById(id);
    res.render("products/mobiles/showMobile.ejs", { mobile });
  } catch (error) {
    console.log(error);
    res.redirect("products/mobiles");
  }
});

router.get("/products/mobiles/:id/editMobile", async (req, res) => {
  let { id } = req.params;
  const mobile = await Mobile.findById(id);
  res.render("products/mobiles/editMobile.ejs", { mobile });
});

router.put(
  "/products/mobiles/:id",
  upload.single("mobile[image]"),
  async (req, res) => {
    let { id } = req.params;
    try {
      const mobile = await Mobile.findByIdAndUpdate(
        id,
        { ...req.body.mobile },
        { new: true }
      );
      // Handle file if it exists
      if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        mobile.image = { url, filename };
        await mobile.save();
      }
      if (!mobile) {
        console.log("Mobile not found");
        return res.status(404).send("Mobile product not found");
      } else {
        req.flash("success", "Mobile updated");
        res.redirect(`/products/mobiles/${id}`);
      }
    } catch (error) {
      console.log(error);
      req.flash("error", "something went wrong!");
      res.status(500).send("Error occurred while updating the mobile product!");
    }
  }
);

router.delete("/products/mobiles/:id", async (req, res) => {
  let { id } = req.params;
  const deletedMobile = await Mobile.findByIdAndDelete(id);
  res.redirect("/products/mobiles");
});

export default router;
