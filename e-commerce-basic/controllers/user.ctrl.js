const Users = require('../models/user.model');
const Payments = require('../models/payment.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
  Register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });

      if (user) return res.status(400).json({ msg: "The email already exists." });
      if (password.length < 6) return res.status(400).json({ msg: "Password is at least 6 characters long." });

      // password encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name, email, password: passwordHash
      });

      // Save mongodb
      await newUser.save();

      // Then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 24 * 60 * 60 * 1000
      });

      res.json({ accessToken });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  RefreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(400).json({ msg: "Please login or register!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please register!" });
        
        const accessToken = createAccessToken({ id: user.id });
        return res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      // If login success, create access token and refresh token
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.json({ accessToken });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  Logout: (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/user/refresh_token' })
      return res.json({ msg: "Logged out!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  GetUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password');
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  AddCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      await Users.findOneAndUpdate({ _id: req.user.id }, {
        cart: req.body.cart
      });

      return res.json({ msg: "Added to cart" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  History: async (req, res) => {
    try {
      const hist = await Payments.find({ user_id: req.user.id });
      res.json(hist);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

module.exports = userCtrl;