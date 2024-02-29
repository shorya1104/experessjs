const router = require("express").Router();
const userController = require("../controller/userController.js")
const verify = require("../../middleware/verifyToken");
const { grantAccess } = require('../../middleware/permission.js')

//All Routes
//Basic Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
//Data manipulation routes

//Get all user
router.get('/getUser/:id', verify, userController.getUser);
//Get User by ID
router.get('/getusers', verify, allowIfLoggedin, grantAccess('readAny', 'profile'), userController.getusers);
//Update User
router.put('/updateUser/:id', verify, grantAccess('updateAny', 'profile'), userController.updateUser);
//Delete User
router.delete('/deleteUser/:id', verify, grantAccess('deleteAny', 'profile'), userController.deleteUser);


module.exports = router;
