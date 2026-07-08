const express = require('express');
const ProductController = require('../../controller/APIs/productcontroller');
const router = express.Router();


router.post('/create-product', ProductController.createproduct);
router.get('/products', ProductController.getallProducts);
router.get('/product/:id', ProductController.getproductById);
router.put('/product/update/:id', ProductController.updateProduct);
router.delete('/product/delete/:id',ProductController.deleteProduct);



module.exports = router;