const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_ACCESS= process.env.ACCESS_TOKEN_KEY;
const JWT_REFRESH = process.env.REFRESH_TOKEN_KEY

const verifyToken = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken) {
            return res.sendStatus(401)
        }
        let token = req.headers["authorization"].split(" ")[1];
        if(!token) {
            return res.sendStatus(401)
        }
        const decoded = jwt.verify(token, JWT_ACCESS);
        req.user = decoded;
        next();
    } catch(err) {
        return res.sendStatus(401)
    }
}

const verifyRefreshToken = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken) {
            return res.sendStatus(401)
        }
        const decoded = jwt.verify(refreshToken, JWT_REFRESH);
        req.user = decoded;
        next();
    } catch (err) {
        return res.sendStatus(401)
    }
}

module.exports = {verifyToken, verifyRefreshToken};
