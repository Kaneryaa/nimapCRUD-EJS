const express = require("express");
const router = express.Router();
const product = require("../models/Product")


// Get all products
router.get("/", (req, res) => {
    product.find({}, (err, foundData) => {
        if (!err) {
            res.render('products', {
                foundData: foundData,
            })
        }
        else {
            console.log(err);
        }
    })
})


//Edit Product
router.get("/:id/edit", (req, res) => {
    product.findById(req.params.id, (err, foundData) => {
        if (!err) {
            res.render("editProduct", { foundData: foundData })   
        }
        else {
            console.log(err);
        }
    })
})


//Updating Product
router.put("/:id", (req, res) => {
     const data = { name: req.body.productName }

    product.findByIdAndUpdate(req.params.id, data, (err, foundData) => {
        if (!err) {
            res.redirect("/product");   
        }
        else {
            console.log(err); 
        }
    })
})


// Deleting Product
router.delete("/:id", (req, res) => {
    product.findByIdAndRemove(req.params.id, (err, foundData) => {
        if (!err) {
            res.redirect("/product")
        }
        else {
            console.log(err);
        }
    })
})

module.exports = router;