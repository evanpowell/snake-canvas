const { HighScore } = require('./index');

const getHighScoresBySetting = (wall, speed) => {
  return HighScore.findAll({
    where: {
      wall,
      speed
    }
  });
}

const createHighScore = (playerName, score, wall, speed) => {
  return HighScore.create({
    playerName,
    score,
    wall,
    speed
  });
}

module.exports = {
  getHighScoresBySetting,
  createHighScore
}