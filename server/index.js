const express = require('express');
const path = require('path');

const db = require('../db/queries');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/highScores', (req, res) => {
  db.getHighScoresBySetting(false, 2)
    .then((highScores) => {
      res.send(highScores);
    });
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
