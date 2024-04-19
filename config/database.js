const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
   'myernchat',
   'root',
   'root',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;
