/** @format */

// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;

  const emptyQuery = !date;

  const valid = !isNaN(new Date(Number(date))) || !isNaN(new Date(date).getTime())

  const standartDate = !emptyQuery && valid && new Date(date).getTime();

  const unixDate = !emptyQuery && valid && new Date(Number(date));


  if (emptyQuery) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }
  if (standartDate)
    return res.json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString(),
    });

  if (unixDate)
    return res.json({
      unix: Number(date),
      utc: new Date(Number(date)).toUTCString(),
    })
  else if(!valid) {
    return res.json({
      error: "Invalid Date"
    })
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
