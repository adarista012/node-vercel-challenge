const express = require('express');

const app = express();

app.use(express.json());

require('dotenv').config();

const connectDB = require('./connectMongo');

connectDB();

const ArticleModel = require('./models/article.model');

app.get('/', async (req, res) => {
  res.send('FullStack Challenge');
});

app.get('/api/v1/articles', async (req, res) => {
  res.send({ msg: 'Welcome', status: 200 });
});

app.post('/api/v1/articles', async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const article = new ArticleModel({
      title,
      author,
      content,
    });
    const data = await article.save();
    return res.status(200).json({
      msg: 'Ok',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
});

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
