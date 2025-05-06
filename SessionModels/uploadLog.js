const { DataTypes } = require('sequelize');
const sequelize = require('../config/TESTDATABASESQL');

const UploadLog = sequelize.define('UploadLog', {
    log_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING, // 'success' or 'error'
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING, // optional detailed message
        allowNull: true,
    },
    uploadedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false,
});

module.exports = UploadLog;
