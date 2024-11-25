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


module.exports = {updateUser}
