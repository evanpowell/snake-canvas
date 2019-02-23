const { HighScore } = require('./index');

const getHighScoresBySetting = (wall, speed) => {
  return HighScore.findAll({
    attributes: ['playerName', 'score', 'createdAt'],
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
  getHighScoresBySetting
}