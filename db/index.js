const Sequelize = require('sequelize');

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize('postgres://zcqdqwczvlduel:16a0e12ea38d0e2c6efe30ddeb20a03df9f9597faa143032ac1d27afddeafd05@ec2-107-22-238-186.compute-1.amazonaws.com:5432/dblave5oha691s', {
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
