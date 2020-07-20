const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');



/* GET All products */
router.get('/all',productsController.getAll)

//GET Product detail
router.get('/detail/:id',productsController.detail)

//GET Products by Category
router.get('/category/:id',productsController.getByCategory)



module.exports = router;
