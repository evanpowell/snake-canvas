const Sequelize = require('sequelize');

const { DB_PASSWORD } = process.env;

console.log('DB_PASSWORD', DB_PASSWORD);

const sequelize = new Sequelize(`postgres://postgres:${DB_PASSWORD}@127.0.0.1:5432/snake`);

const HighScore = sequelize.define('highScore', {
  playerName: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.SMALLINT({ length: 4 })
  },
  wall: {
    type: Sequelize.BOOLEAN
  },
  speed: {
    type: Sequelize.SMALLINT({ length: 1 })
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    sequelize.sync({ force: false })
      .then(() => {
        console.log('Models synced');
      })
      .catch((err) => {
        console.log('MODELS SYNC ERROR:', err);
      }
    )
  })
  .catch(err => {
    console.error('DATABASE CONNECTION ERROR:', err);
  });

module.exports = {
  sequelize,
  Sequelize,
  HighScore
}