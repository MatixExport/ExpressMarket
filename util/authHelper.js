const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { v4: uuidv4 } = require('uuid'); 
const RefreshToken = require("../models/RefreshToken");

const saltRounds = 10; 

const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password,salt);
}

const compareHash = async (password,hash)=>{
    return await bcrypt.compare(password,hash);
}


function createAccessToken(payload) {
    return jwt.sign(payload, config.SECRET, { expiresIn: 60 * 5});
}

async function createRefreshToken(userId) {
    let expiryDate = new Date()
    expiryDate.setSeconds(60 * 60 *2) 
    const token = uuidv4() 
    const refreshToken = await RefreshToken.create({
        token:token,
        UserId: userId,
        expiryDate: expiryDate.getTime()
    })
    return refreshToken.token
}

function isRefreshTokenExpired (token) {
    return token.expiryDate.getTime() < new Date().getTime();
}


module.exports = {hashPassword,compareHash,createAccessToken,createRefreshToken,isRefreshTokenExpired}


