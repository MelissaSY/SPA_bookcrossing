const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_ACCESS= process.env.ACCESS_TOKEN_KEY;
const JWT_REFRESH = process.env.REFRESH_TOKEN_KEY;

const generateRefreshToken = async (id) => {
    let refreshToken = jwt.sign({id: id, type:'refresh'}, 
    JWT_REFRESH, 
    {
        expiresIn:'2h',
    })
    return refreshToken;
}

const generateAccessToken = async (id) => {
    let accessToken = jwt.sign({id: id, type:'access'},
    JWT_ACCESS,
    {
        expiresIn:'15s',
    })
    return accessToken;
}

module.exports = {generateRefreshToken, generateAccessToken}