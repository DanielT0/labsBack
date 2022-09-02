// const mongoose = require('mongoose');
// const dbConnection = async () => {
//     try {
//         mongoose.connect(process.env.DB_CNN, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//         });

//         console.log('DB Online')
//     }
//     catch (error) {
//         console.log(error);
//         throw new Error('Error a la hora de inicializar la base de datos');
//     }
// }

// module.exports = {
//     dbConnection,
// }

const { Sequelize } = require('sequelize');
const Sequalize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.database, process.env.userDB, process.env.passwordDb, { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;