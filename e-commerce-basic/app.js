require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}));

// Routes
app.use('/user', require('./routes/user.router'));
app.use('/api', require('./routes/cate.router'));
app.use('/api', require('./routes/prod.router'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/payment.router'));

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, error => {
  if (error) throw error;
  console.log("Connected to MongoDB");
})

app.get('/', (req, res) => {
  res.json({ msg: "Welcome to programming tuts with AnLuuHung. Thanks!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});