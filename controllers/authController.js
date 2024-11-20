

const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const {compareHash,createAccessToken,createRefreshToken,isRefreshTokenExpired} = require("../util/authHelper");



const login = async (req,res,next)=>{
    const {login,password} = req.body;
    const user = await User.findOne({ login:login });

    if(!user){
        res.error(`User ${login} does not exist.`)
    }
    if(!await compareHash(password,user.password)){
        res.error(`Provided password is incorrect.`)
    }
    const payload = {
        login:user.login,
        id:user.id
    }
    const accessToken = createAccessToken(payload);
    const refreshToken = await createRefreshToken(user.id);

    return res.success({
        access:accessToken,
        refreshToken:refreshToken
    });
}

const refreshToken = async (req,res,next)=>{
    const { refreshToken:refreshTokenUUID } = req.body; 
    const refreshToken = await RefreshToken.findOne(
        {
           where:{token: refreshTokenUUID},
           include:[User]
        }
    );
    if(!refreshToken){
        res.error("Invalid token");
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

module.exports = {login,refreshToken}
