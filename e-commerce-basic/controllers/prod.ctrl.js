const Product = require('../models/prod.model');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach(el => delete(queryObj[el]));

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

    this.query.find(JSON.parse(queryStr));

    return this;
  };

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    console.log(this.query)

    return this;
  };

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1;
    const skip = ( page - 1 ) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  };
}

const prodCtrl = {
  getProds: async (req, res) => {
    try {
      const features = new APIFeatures(Product.find(), req.query).filtering().sorting().paginating();
      const products = await features.query;

      return res.json({
        status: "Success.",
        result: products.length,
        products: products
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { prod_id, title, price, description, content, images, category } = req.body;
      if (!images)
        return res.status(400).json({ msg: "No image upload." });

      const product = await Product.findOne({ prod_id });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      const newProd = new Product({
        prod_id, title: title.toLowerCase(), price, description, content, images, category 
      });
      await newProd.save();
      res.json({ msg: "Created a product." });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a product." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload." });

      await Product.findOneAndUpdate({ _id: req.params.id }, {
        title: title.toLowerCase(), price, description, content, images, category
      });

      res.json({ msg: "Updated a product." });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};

module.exports = prodCtrl;