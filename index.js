const express = require('express');

const app = express();

// require('dotenv').config();

// const connectDB = require('./connectMongo');

// connectDB();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://adarista012:tBVZzsJg7JNkpvrO@articles.y1y1gpx.mongodb.net/?retryWrites=true&w=majority&appName=Articles';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/api/v1/articles', async (req, res) => {
  res.send('Hello vercel');
});

app.use(express.json());

// const BookModel = require('./models/book.model');
// const redis = require('./redis');

// const deleteKeys = async (pattern) => {
//   const keys = await redis.keys(`${pattern}::*`);
//   console.log(keys);
//   if (keys.length > 0) {
//     redis.del(keys);
//   }
// };

// app.get('/api/v1/books', async (req, res) => {
//   const { limit = 5, orderBy = 'name', sortBy = 'asc', keyword } = req.query;
//   let page = +req.query?.page;

//   if (!page || page <= 0) page = 1;

//   const skip = (page - 1) * +limit;

//   const query = {};

//   if (keyword) query.name = { $regex: keyword, $options: 'i' };

//   const key = `Book::${JSON.stringify({
//     query,
//     page,
//     limit,
//     orderBy,
//     sortBy,
//   })}`;
//   let response = null;
//   try {
//     const cache = await redis.get(key);
//     if (cache) {
//       response = JSON.parse(cache);
//     } else {
//       const data = await BookModel.find(query)
//         .skip(skip)
//         .limit(limit)
//         .sort({ [orderBy]: sortBy });
//       const totalItems = await BookModel.countDocuments(query);

//       response = {
//         msg: 'Ok',
//         data,
//         totalItems,
//         totalPages: Math.ceil(totalItems / limit),
//         limit: +limit,
//         currentPage: page,
//       };

//       redis.setex(key, 600, JSON.stringify(response));
//     }

//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// app.get('/api/v1/books/:id', async (req, res) => {
//   try {
//     const data = await BookModel.findById(req.params.id);

//     if (data) {
//       return res.status(200).json({
//         msg: 'Ok',
//         data,
//       });
//     }

//     return res.status(404).json({
//       msg: 'Not Found',
//     });
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// app.post('/api/v1/books', async (req, res) => {
//   try {
//     const { name, author, price, description } = req.body;
//     const book = new BookModel({
//       name,
//       author,
//       price,
//       description,
//     });
//     const data = await book.save();
//     deleteKeys('Book');
//     return res.status(200).json({
//       msg: 'Ok',
//       data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// app.put('/api/v1/books/:id', async (req, res) => {
//   try {
//     const { name, author, price, description } = req.body;
//     const { id } = req.params;

//     const data = await BookModel.findByIdAndUpdate(
//       id,
//       {
//         name,
//         author,
//         price,
//         description,
//       },
//       { new: true }
//     );
//     deleteKeys('Book');
//     return res.status(200).json({
//       msg: 'Ok',
//       data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// app.delete('/api/v1/books/:id', async (req, res) => {
//   try {
//     await BookModel.findByIdAndDelete(req.params.id);
//     deleteKeys('Book');
//     return res.status(200).json({
//       msg: 'Ok',
//     });
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

const PORT = 8000;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
