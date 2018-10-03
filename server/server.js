require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const {PORT, DATABASE_URL} = require('./config');
const musiciansRouter = require('./routes/musicians/router');
const songsRouter = require('./routes/songs/router');
const chordStatRouter = require('./routes/chordStats/router');
const rawDataRouter = require('./routes/rawdatas/router');
const noteLengthRouter = require('./routes/notelengths/router');
const noteIntervalRouter = require('./routes/noteIntervals/router');
const beatCountsRouter = require('./routes/beatcounts/router');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(express.static(__dirname +'/public'));


// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});


//ROUTES
app.use('/api/musicians', musiciansRouter);
app.use('/api/songs', songsRouter);
app.use('/api/chordStats', chordStatRouter);
app.use('/api/rawData/', rawDataRouter);
app.use('/api/noteLengths/', noteLengthRouter);
app.use('/api/noteIntervals/', noteIntervalRouter);
app.use('/api/beatCounts/', beatCountsRouter);

//dummy endpoint
app.get('/api/*', (req,res) => {
	res.json({ok: true})
})

// //dummy endpoint
// app.get('/jazzCharts', (req,res) => {
// 	res.json({wilbe: "JazzCharts soon!"})
// })

//stops anonymous endpoints
app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
