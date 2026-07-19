const Product = require("../models/productmodels");
const fs = require("fs");
const path = require("path");

class ProductEjsController {
  async list(req, res) {
    try {
      const productdata = await Product.find();
      res.render("product/list", {
        title: "Product List Page",
        data: productdata,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async add(req, res) {
    try {
      res.render("product/add", {
        title: "Add Product Page",
        product: {},
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create(req, res) {
    try {
      const {
        name,
        description,
        shortDescription,
        brand,
        category,
        price,
        discountPrice,
        currency,
        tag,
        status,
        isDeleted,
      } = req.body;

      const productdata = new Product({
        name: name,
        description: description,
        shortDescription: shortDescription,
        brand: brand,
        category: category,
        price: price,
        discountPrice: discountPrice,
        currency: currency,
        tag: tag,
        status: status,
        isDeleted: isDeleted === "true",
        image: req.file ? req.file.filename : "",
      });

      const data = await productdata.save();
      res.redirect("/product");
    } catch (error) {
      console.log(error);
    }
  }

  async view(req, res) {
    try {
      const id = req.params.id;
      const productdata = await Product.findById(id);

      if (!productdata) {
        return res.send("No Product data found");
      }

      res.render("product/view", {
        title: "Product Details page",
        product: productdata,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const productdata = await Product.findById(id);

      if (!productdata) {
        return res.send("No product found");
      }

      res.render("product/update", {
        title: "Update Product page",
        product: productdata,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      const productdata = await Product.findById(id);

      if (!productdata) {
        res.send("Product not found");
      }

      let imageName = productdata.image;

      if (req.file) {
        // Delete previous image
        if (productdata.image) {
          const oldImagePath = path.join(
            __dirname,
            "../../uploads",
            productdata.image,
          );

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Save new image name
        imageName = req.file.filename;
      }

      const {
        name,
        description,
        shortDescription,
        brand,
        category,
        price,
        discountPrice,
        currency,
        tag,
        status,
        isDeleted,
      } = req.body;

      // console.log(req.body);

      const updatedproduct = await Product.findByIdAndUpdate(
        id,
        {
          name: name,
          description: description,
          shortDescription: shortDescription,
          brand: brand,
          category: category,
          price: price,
          discountPrice: discountPrice,
          currency: currency,
          tag: tag,
          status: status,
          isDeleted: isDeleted === "true",
          image: imageName,
        },
        {
          new: true,
          runValidators: true,
        },
      );

      res.redirect("/product");
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      // Find Product first
      const productdata = await Product.findById(id);

      if (!productdata) {
        return res.status(404).send("Product not found");
      }

      // Delete image if it exists
      if (productdata.image) {
        const imagePath = path.join(
          __dirname,
          "../../uploads",
          productdata.image,
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      const deletedproduct = await Product.findByIdAndDelete(id);
      res.redirect("/product");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductEjsController();
