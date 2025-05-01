const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL');


const Upload_logs = sequelize.define('Upload_logs', {
    upload_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
{
    timestamps: false,
}
);

module.exports = Upload_logs;