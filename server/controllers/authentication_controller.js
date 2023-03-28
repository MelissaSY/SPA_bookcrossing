'use strict';

const user_list = require('../entities/user/user_list');
const bcrypt = require('bcryptjs');
const salt = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET= process.env.jwt;

const logIn = async (req, res) => {
    let parameter = ''
    if(req.body.email != undefined) {
        parameter = 'email'
    } else if(req.body.login != undefined){
        parameter = 'login'
    } else {
        res.json({status:'error', error:'no'})
    }
    try {
        const user = await user_list.searchUser(parameter, req.body[parameter]);
        if(!user) {
            res.json({status:'error', error:'not found'})
        } else {
            if(await bcrypt.compare(password, user.password)) {
                let token = jwt.sign({id: user.id, email:user.email, login:user.login,type:'user'}, 
                JWT_SECRET, 
                {
                    expiresIn:'2h',
                    algorithm: 'RS256',
                })
                res.cookie('token', token, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true})
                res.redirect('/api');
            }
        }
    } catch (err) {

    }
} 


const signUp = async (req, res) => {
    const {login,password:plainTextPassword, email}=req.body;
    const password = await bcrypt.hash(plainTextPassword, salt);
    try {
        await user_list.addUser(login, password, email)
        res.redirect('/api');
    } catch (err) {
        res.sendStatus(500);
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



module.exports = {
    signUp, 
    logIn,
    getAllUsers,
    deleteUser,
    updateUser,
    getUser,
}