const Product = require("../../models/productmodels");
const statuscode = require("../../utils/statuscode");

class ProductController {
  // CREATE:
  async createproduct(req, res) {
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

      // ALL FIELDS REQUIRED CONDITION:
      if (
        !name ||
        !description ||
        !shortDescription ||
        !brand ||
        !category ||
        !price ||
        !discountPrice ||
        !currency ||
        !tag ||
        !status ||
        isDeleted === undefined
      ) {
        return res.status(statuscode.BAD_REQUEST).json({
          status: false,
          message: "All fields are required",
        });
      }

      // FOR EXISTING DATA CONDITION:
      const existingProduct = await Product.findOne({ name: name });
      if (existingProduct) {
        return res.status(statuscode.CONFLICT).json({
          status: false,
          message: "Product with this name already exists",
        });
      }

      // CREATE NEW PRODUCT:
      const newProduct = new Product({
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
      });

      const data = await newProduct.save();

      if (data) {
        return res.status(statuscode.CREATED).json({
          status: true,
          message: "Product created successfully",
          data: data,
        });
      } else {
        return res.status(statuscode.BAD_REQUEST).json({
          status: false,
          message: "Product creation failed",
          data: null,
        });
      }
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  // FOR POST DATA:
  async getallProducts(req, res) {
    try {
      const productData = await Product.find();

      if (!productData || productData.length == 0) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "No product found",
          data: null,
        });
      }

      return res.status(statuscode.OK).json({
        status: true,
        total: productData.length,
        message: "All Products found",
        data: productData,
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  // FOR GET ONE PARTICULAR DATA:
  async getproductById(req, res) {
    try {
      const id = req.params.id;
      const productData = await Product.findById(id);

      if (!productData) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "No student found",
          data: null,
        });
      }

      return res.status(statuscode.OK).json({
        status: true,
        data: productData,
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  // UPDATE DATA:
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
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

      const productData = await Product.findByIdAndUpdate(
        id,
        {
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
        },
        { new: true },
      );

      if (!productData) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "No product found",
          data: null,
        });
      }

      return res.status(statuscode.OK).json({
        status: true,
        message: "Product data updated successfully",
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  // DELETE DATA:
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const productData = await Product.findByIdAndDelete(id);

      if (!productData) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "No product found",
        });
      }

      return res.status(statuscode.OK).json({
        status: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
