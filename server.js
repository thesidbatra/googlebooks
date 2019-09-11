const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();
let Book = require('./book.model');

mongoose.connect('mongodb://127.0.0.1:27017/googlebooks', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
  console.log("mongodb database connection established successfully!");
});



// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
router.route("/saveBook").post(function (req, res) {
  let book = new Book(req.body);
  console.log(req);
  book.save()
    .then(book => { res.status(200).send("book added successfully") })
    .catch(err => { res.status(400).send("error!") });
});
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
