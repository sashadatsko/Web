const express = require('express');
const router = express.Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');
const mongoose = require('mongoose');
const exp = require('constants');
const { render } = require('express/lib/response');

const buttonSchema = new mongoose.Schema({
  name: String,
  clickCount: { type: Number, default: 0 }
});
const Button = mongoose.model('Button', buttonSchema);

mongoose.connect('mongodb://localhost:27017/MyDB'  , {useNewUrlParser: true , useUnifiedTopology : true})
.then( () => {
    console.log("MONGO DB Connection opened Keep working");

    //
    app.use(express.json());

    // Serve the HTML file
    app.get('/', (req, res) => {
      res.render('./index.html');
    });


})
.catch( err => {
    console.log("Sorry some internal server error in MONGO DB.....  Please try later");
    console.log(err);
})

app.post('/save-email', (req, res) => {
  const db = client.db('MyDB'); // Replace 'your_database' with your actual database name
    const collection = db.collection('logins'); // Replace 'your_collection' with your actual collection name

    collection.insertOne({ data }, (err, result) => {
      if (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'An error occurred while saving the data' });
      } else {
        console.log('Data saved:', result.ops[0]);
        res.status(200).json({ message: 'Data saved successfully' });
      }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


