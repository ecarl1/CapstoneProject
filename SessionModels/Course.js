const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const Session = require('./Session')

const Course = sequelize.define('Course', {
    course_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
   
},
{
    timestamps: false,
}
);

Course.save = async function (courseName) {
    try{
        
        const course = await Course.create({
            course_name: courseName,
           
        });
        
    }catch(error){
        console.log(error);
    };
}

Course.find = async function (course_name) {

    
}



module.exports = Course;