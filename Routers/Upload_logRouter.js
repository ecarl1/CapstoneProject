const express = require('express');
const router = express.Router();
const Upload_logs = require('../SessionModels/Upload_logs');
const User = require('../SessionModels/User');
const { raw } = require('mysql2');


Upload_logs.hasOne(User, {foreignKey: 'user_id'})
// Upload_logs.hasOne(User, {as: 'users'}, {foreignKey: 'user_id'})
// Upload_logs.hasOne(User, {as: 'users', foreignKey: 'user_id'})

// router.get('/', async (req, res) => {
//     try {
//         // const data = 
//         await Upload_logs.findAll({
//             attributes: [
//               'file_name',
//               'date'
//             ],
//             // include: [{model: User, attributes: [username]}],
//             include: [{model: User, attributes: [Sequelize.col('users.username', 'user_name')], as: 'users'}]
//             //  raw: true

//           }).then(function(upload_logs) {
//             // console.log(JSON.stringify(upload_logs))
//             res.json(upload_logs)
//           }); // Fetch all data from the "Upload_log" table and join it with the 'User" table data
//         // res.json(data); // Send the data as a JSON response
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to retrieve Uploads data' });
//     }
// });  



// router.get('/', async (req, res) => {
//   try {
//       // const data = 
//       await Upload_logs.findAll({
//           include: [{model: User, attributes: [User.username]}],
//           attributes: ['date', 'file_name']
//           // include: [{
//           //   model: User
//           // //   where: [Upload_logs.user_id = User.user_id],
//           // //   required: true,
//           //  }]

//         }).then(function(upload_logs) {
//           // console.log(JSON.stringify(upload_logs))
//           res.json(upload_logs)
//         }); // Fetch all data from the "Upload_log" table and join it with the 'User" table data
//       // res.json(data); // Send the data as a JSON response
//   } catch (err) {
//       res.status(500).json({ error: 'Failed to retrieve Uploads data' });
//   }
// });  


// router.get('/', async (req, res) => {
//   try {
//       // const data = 
//       await Upload_logs.findAll({
          
//           include: [{model: User, attributes: []}],
//           attributes: [
//             'date',
//             [Sequelize.col('user.username'), 'name'],
//             'file_name'
//           ]

//         }).then(function(upload_logs) {
//           // console.log(JSON.stringify(upload_logs))
//           res.json(upload_logs)
//         }); // Fetch all data from the "Upload_log" table and join it with the 'User" table data
//       // res.json(data); // Send the data as a JSON response
//   } catch (err) {
//       res.status(500).json({ error: 'Failed to retrieve Uploads data' });
//   }
// });  


router.get('/', async (req, res) => {
  try {
    //Fetch all upload logs with date,file name, and user_id
    const logs = await Upload_logs.findAll({
        attributes: ['date', 'user_id', 'file_name'] 
    });

    //Fetch user names for each user_id
    const userIds = logs.map(log => log.user_id); //Extract all user_ids
    const users = await User.findAll({
        where: { user_id: userIds }, 
        attributes: ['user_id', 'username'] 
    });

    //Convert users array into a lookup dictionary
    const userMap = {};
    users.forEach(user => {
        userMap[user.user_id] = user.username;
    });

    //Replace user_id with user=name
    const formattedData = logs.map(log => ({
        date: log.date,
        user_name: userMap[log.user_id] || "Unknown User",
        file_name: log.file_name
    }));

    //Send response
    res.json(formattedData);
} catch (err) {
    console.error("Error fetching session data:", err);
    res.status(500).json({ error: 'Failed to retrieve session data' });
}
});


module.exports = router