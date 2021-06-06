const Category = require('../models/cate.model');
const Product = require('../models/prod.model');

const cateCtrl = {
  getCates: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) return res.status(400).json({ msg: "This category already exists." });

      const newCate = new Category({ name });
      await newCate.save();

      res.json({ msg: 'Created a category!' });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const prod = await Product.findOne({ category: req.params.id });
      if (prod) return res.status(400).json({
        msg: "Please delete all products with a relationship."
      });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a category!" });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Updated a category!" });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = cateCtrl;