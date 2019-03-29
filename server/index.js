require('dotenv').config();
const express = require('express');
const path = require('path');

const db = require('../db/queries');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/highScores', (req, res) => {
  const { wall, speed } = req.query;
  db.getHighScoresBySetting(wall, speed)
    .then((highScores) => {
      res.send(highScores);
    });
});

app.post('/highScores', (req, res) => {
  const { playerName, score, wall, speed } = req.body;
  db.createHighScore(playerName, score, wall, speed)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
