const Sequelize = require('sequelize');

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const HighScore = sequelize.define('highScore', {
  playerName: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.SMALLINT
  },
  wall: {
    type: Sequelize.BOOLEAN
  },
  speed: {
    type: Sequelize.SMALLINT
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    sequelize.sync({ force: true })
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
