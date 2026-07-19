const express = require('express');
const ProductEjsController = require('../controller/productEjsController');
const upload = require("../utils/multer");

const router = express.Router();

router.get('/product', ProductEjsController.list);

router.get('/product/add', ProductEjsController.add);
router.post('/product/create', upload.single("image"), ProductEjsController.create);

router.get('/product/view/:id', ProductEjsController.view);

router.get('/product/update/:id', ProductEjsController.edit);
router.post('/product/update/:id', upload.single("image"), ProductEjsController.update);

router.get("/product/delete/:id", ProductEjsController.delete);





module.exports = router;