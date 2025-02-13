const {DataTypes} = require('sequelize')
const sequelize = require('../config/TESTDATABASESQL') // storing the database on the computers memory
const bcrypt = require('bcrypt');
const { type } = require('os');
const jwt = require('jsonwebtoken');

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
},
{
    hooks: {
        beforeCreate: async (user) => {
            if(user.password){
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate: async (User) =>{
            if(user.password){
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt)
            }

        }
    }
}
);

//this is for user login
User.findUser = async function (tUsername, tPassword) {
    try{
        // Get related course id
        
        const user = await User.findOne({
            where: { username: tUsername },
        });
        if(!user){
            return "user doesnt not exist";
        }
        
        const unhashedPassword = Buffer.isBuffer(user.password)
        ? user.password.toString('utf-8')
        : user.password;

        const sanitizedPassword = unhashedPassword.replace(/\0/g, '').trim();

        

        // Log values for debugging
        console.log("Hashed Password from database:", user.password);
        console.log("Plaintext Password (user entered):", tPassword);
        console.log("the Password from database after being unhashed:", sanitizedPassword);

        //console.log(typeof sanitizedPassword);
        //console.log(typeof tPassword);

        // Ensure the plaintext password is a string
        //const isMatch = await bcrypt.compare(String(tPassword), user.password);

        const token = jwt.sign(
            {
                userId: user.user_id,
                username: user.username,
                userType: user.user_type,
            },
            'key', //secret key and store in environment variables
            { expiresIn: '1h' }
        );
        

        if (tPassword.trim() === sanitizedPassword.trim()){
            return {
                token,
                User: {
                username: user.username,
                id: user.user_id,
                fname: user.fname,
                lname: user.lname,
                user_type: user.user_type,
                email: user.email,
                password: user.password
                },
            };
        } else {
            return "Password is incorrect";
        }

        

        //will probably have to return a JWT token or some sort of acces toke
        
        
    }catch(error){
        console.log(error);
    };

    
}

//chaning password function
User.changePassword = async function (user_id, oldPassword, newPassword){
    try{
        //retrieving the user
        const user = await User.findOne({
            where: { username: user_id },
        });
        if(!user){
            return "user doesnt not exist";
        }
        console.log("Found user")

        //unhashing the password
        const unhashedPassword = Buffer.isBuffer(user.password)
        ? user.password.toString('utf-8')
        : user.password;


        //sanitizing the password
        const sanitizedPassword = unhashedPassword.replace(/\0/g, '').trim();

        console.log("password from database: " + sanitizedPassword)
        console.log("The old password enter is: " + oldPassword)

        if(oldPassword.trim() == sanitizedPassword.trim()){
            await user.update(
                { password: newPassword }, 
                { where: { user_id: user_id } }
            );
            console.log("password has changed")
        }else{
            console.log("The current password entered is not correct")
        }
       

    }catch(error){
        console.log("user not found");
    }
}

User.resetPassword = async function (user_id, newPassword, oldPassword){
    try{
        await User.findOne({
            where: { username: user_id, password: oldPassword }
        })
        await User.update(
            { password: newPassword }, 
            { where: { user_id: user_id } }
        );
        console.log("Found")

    }catch(error){
        console.log("user not found");
    }
}




module.exports = User;