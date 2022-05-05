// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});
app.get("/api", function (req, res) {
  const time = new Date()
  const data = { "unix": time.valueOf(), "utc": time.toGMTString() }
  res.json(data);
});

app.get("/api/:time", function (req, res) {
  console.log(req.params);
  let time;
  if (req.params.time != '' && typeof req.params.time === 'string' && isNaN(Number(req.params.time))) {
    time = new Date(req.params.time)
  } else {
    time = new Date(Number(req.params.time))
  }
  if (time.toString() === 'Invalid Date' || time.valueOf() < 0) {
    res.json({ error: "Invalid Date" });
    return
  }
  if (!req.params.time) {
    time = new Date()
  }
  const data = { "unix": time.valueOf(), "utc": time.toGMTString() }
  res.json(data);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
