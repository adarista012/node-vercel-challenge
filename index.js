const express = require('express');

const app = express();

// require('dotenv').config();

const run = require('./connectMongo');

run().catch(console.dir);

app.get('/api/v1/articles', async (req, res) => {
  res.send('Vercel Server');
});

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
