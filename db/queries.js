const { Sequelize, Highscore } = require('./index');

const getHighScoresBySetting = (wall, speed) => {
  return HighScore.findAll({
    attributes: ['name', 'score'],
    where: {
      wall,
      speed 
    }
  }).then((highScores) => {
    return highScores;
  });
}

module.exports = {
  getHighScoresBySetting
}