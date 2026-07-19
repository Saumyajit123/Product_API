const express = require('express');
const ProductController = require('../../controller/APIs/productcontroller');
const upload = require('../../utils/multer');
const router = express.Router();


// For Multer:
router.post('/create-product', upload.single("image"), ProductController.createproduct);
router.put('/product/update/:id', upload.single("image"), ProductController.updateProduct);


// router.post('/create-product', ProductController.createproduct);
router.get('/products', ProductController.getallProducts);
router.get('/product/:id', ProductController.getproductById);
// router.put('/product/update/:id', ProductController.updateProduct);
router.delete('/product/delete/:id',ProductController.deleteProduct);



module.exports = router;