const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = { origin: "http://localhost:8081" };

const db = require("./app/models");
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors(corsOptions));

//parse requres content-type = appliaction/json
app.use(bodyParser.json());

// parse request content-type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// setting port for listening request
const PORT = process.env.PORT || 8080;

require("./app/routes/tutorial.routes")(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});