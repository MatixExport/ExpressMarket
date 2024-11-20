const User = require("../models/User");
const {hashPassword,compareHash,createAccessToken,createRefreshToken,isRefreshTokenExpired} = require("../util/authHelper");


const registerUser = async (req, res, next)=>{
    const userData = req.body
    userData.password = await hashPassword(userData.password);
    userData['role'] = "Client";
    try {
        const data = await User.create(userData);
        return res.success(data);
    } catch (error) {
        return res.error('An error occurred while creating the user');
    }
} 
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


module.exports = {registerUser,updateUser}
