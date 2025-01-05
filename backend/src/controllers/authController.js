

const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const {compareHash,createAccessToken,createRefreshToken,isRefreshTokenExpired,hashPassword} = require("../util/authHelper");
const {userRoles} = require("../models/userRoles");



const login = async (req,res,next)=>{
    const {login,password} = req.body;
    const user = await User.findOne({where:{ login:login }});

    if(!user){
        return res.error(`User ${login} does not exist.`)
    }
   
    if(!await compareHash(password,user.password)){
        return res.error(`Provided password is incorrect.`)
    }
    const payload = {
        login:user.login,
        id:user.id
    }
    const accessToken = createAccessToken(payload);
    const refreshToken = await createRefreshToken(user.id);

    return res.success({
        access:accessToken,
        refresh:refreshToken
    });
}

const refreshToken = async (req,res,next)=>{
    const { refresh:refreshTokenUUID } = req.body; 
    const refreshToken = await RefreshToken.findOne(
        {
           where:{token: refreshTokenUUID},
           include:[User]
        }
    );
    if(!refreshToken){
        return res.error("Invalid token");
    }
    if(isRefreshTokenExpired(refreshToken)){
        await RefreshToken.destroy();
        return res.error("Expired token");
    }
    const refreshedAccessToken = createAccessToken(
        {
            login:refreshToken.User.login,
            id:refreshToken.User.id
        }
    )
    return res.success({access:refreshedAccessToken});
}


const registerUser = async (req, res, next)=>{
    const userData = req.body
    userData.password = await hashPassword(userData.password);
    userData['role'] = userRoles.CLIENT;

    if(await User.findOne({where:{login:req.body.login}})){
        return res.error(`This username is already taken. `);
    }

    try {
        const data = await User.create(userData);
        data['password'] = null;
        return res.success(data);
    } catch (error) {
        return res.error('An error occurred while creating the user');
    }
} 

module.exports = {login,refreshToken,registerUser}
