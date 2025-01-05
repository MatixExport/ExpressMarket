const User = require("../models/User");


const updateUser = async (req, res, next)=>{
    const userData = req.body
    try {
        let user = req.pkObj;
        user = await user.update(userData);
        return res.success(user);
    } catch (error) {
        return res.error('An error occurred while updating the user');
    }
} 


const getUser = async (req, res, next)=>{
    try {
        let user = JSON.parse(JSON.stringify(req.user)); 
delete  user.password;
        return res.success(user);
    } catch (error) {
        return res.error('An error occurred while fetching the user');
    }
} 


module.exports = {updateUser,getUser}
