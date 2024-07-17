const express = require('express');

const app = express();

// require('dotenv').config();

const run = require('./connectMongo');

run().catch(console.dir);

const ArticleModel = require('./models/article.model');

app.get('/api/v1/articles', async (req, res) => {
  res.send({ msg: 200 });
});

app.post('/api/v1/books', async (req, res) => {
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
