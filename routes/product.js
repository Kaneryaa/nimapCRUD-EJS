const express = require("express");
const router = express.Router();
const product = require("../models/Product")
const paginatedResults = require("../middleware/pagination")




// Get all products
router.get("/", paginatedResults(product),(req, res) => {

    res.render('products', {
        foundData: res.paginatedResults,
         page:req.query.page||1,
    })
})



//Edit Product
router.get("/:id/edit", (req, res) => {
    product.findById(req.params.id, (err, foundData) => {
        if (!err) {
            console.log(foundData);
            res.render("editProduct", { foundData: foundData })   
        }
        else {
            console.log(err);
        }
    }).populate("category")
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