const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pref_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
   
},
{
    timestamps: false,
}
);

User.findUser = async function (tUsername, tPassword) {
    try{

        
        // Get related course id
        const user = await User.findOne({
            where: { username: tUsername },
        });
        if(!user){
            return "user doesnt not exist";
        }
        if(tPassword != user.password){
            return "password is inncorrect";
        }

        //will probably have to return a JWT token or some sort of acces toke
        return {rUser: {
            id: user.user_id,
            fname: user.fname,
            lname: user.lname,
            user_type: user.user_type,
            email: user.email
            },
        };
        
    }catch(error){
        console.log(error);
    };

    
}



module.exports = User;