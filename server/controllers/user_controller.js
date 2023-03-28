'use strict';

const user_list = require('../entities/user/user_list');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT = bcrypt.genSaltSync(Number(process.env.SALT));
const JWT_REFRESH= process.env.REFRESH_TOKEN_KEY;
const helper = require('../helper/authentication')

const logIn = async (req, res) => {
    let parameter = ''
    if(req.body.email != undefined) {
        parameter = 'email'
    } else if(req.body.login != undefined){
        parameter = 'login'
    } else {
        res.sendStatus(403);
        return;
    }
    try {
        const user = await user_list.searchUser(parameter, req.body[parameter]);
        if(!user) {
            res.sendStatus(404);
            return;
        } else {
            if(await bcrypt.compare(req.body.password, user.password)) {
                let refreshToken = await helper.generateRefreshToken(user.id);
                let accessToken = await helper.generateAccessToken(user.id);
                res.cookie("refreshToken", refreshToken, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true})
                res.json({"accessToken": accessToken});
                return;
            }
        }
        res.sendStatus(403);
        return;
    } catch (err) {
        res.sendStatus(408);
        return;
    }
} 


const signUp = async (req, res) => {
    const {login,password:plainTextPassword, email}=req.body;
    const password = await bcrypt.hash(plainTextPassword, SALT);
    try {
        const user = await user_list.addUser(login, password, email);
        let refreshToken = await helper.generateRefreshToken(user.id);
        let accessToken = await helper.generateAccessToken(user.id);
        res.cookie("refreshToken", refreshToken, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true})
        res.json({"accessToken": accessToken});
        return;
    } catch (err) {
        return res.sendStatus(500);
    }
}


const getAllUsers = (req, res) => {
    try {
        user_list.getAllUsers()
        .then((users) => {
            res.json(users);
        })
    } catch (err) {
        res.sendStatus(500);
    }
}

const deleteUser = (req, res) => { }

const updateUser = (req, res) => { }

const getUser = (req, res) => { 
    try {
        let user = user_list.searchUser('id', parseInt(req.params.id));
        res.json(user);
    } catch (err) {
        res.sendStatus(500);
    }
}

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        let payload = jwt.verify(refreshToken, JWT_REFRESH);
        if(payload.type === "refresh") {
            let accessToken = await helper.generateAccessToken(payload.id);
            res.json({"accessToken": accessToken})
        }
    } catch (err) {
        console.log(err);
    }
}

const logOut = (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if(!refreshToken) {
            return res.sendStatus(401)
        }
        res.cookie("refreshToken", refreshToken, {maxAge: -1, httpOnly: true})
        
    } catch(err) {
        return res.sendStatus(401);
    }
    return res.redirect('/api');
}

module.exports = {
    refreshAccessToken,
    signUp, 
    logIn,
    logOut,
    getAllUsers,
    deleteUser,
    updateUser,
    getUser,
}