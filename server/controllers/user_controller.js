'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT = bcrypt.genSaltSync(Number(process.env.SALT));
const JWT_REFRESH= process.env.REFRESH_TOKEN_KEY;
const helper = require('../helper/authentication')
const {User, UserBook} = require('../models/User');
const {Wishlist} = require('../models/Wishlist')
const { Book } = require('../models/Book')

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
        const user = await User.findOne({
            where: {
                [parameter]: req.body[parameter]
            }
        });
        if(!user) {
            res.sendStatus(404);
            return;
        } else {
            if(await bcrypt.compare(req.body.password, user.password)) {
                let refreshToken = await helper.generateRefreshToken(user.id);
                let accessToken = await helper.generateAccessToken(user.id);
                res.cookie("refreshToken", refreshToken, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true})
                res.json({"accessToken": accessToken, "id":user.id, "email":user.email, "login":user.login});
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
        await User.sync();
        await UserBook.sync();
        await Wishlist.sync();
        const user = await User.create({login: login, password:password, email:email});
        
        let refreshToken = await helper.generateRefreshToken(user.id);
        let accessToken = await helper.generateAccessToken(user.id);
        res.cookie("refreshToken", refreshToken, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true})
        res.json({"accessToken": accessToken, "id":user.id, "email":user.email, "login":user.login});
        return;
    } catch (err) {
        return res.sendStatus(409);
    }
}

const getAllUsers = (req, res) => {
    try {
        User.findAll()
        // user_list.getAllUsers()
        .then((users) => {
            res.json(users);
        })
    } catch (err) {
        res.sendStatus(404);
    }
}

const deleteUser = (req, res) => { }

const updateUser = (req, res) => { }

const getUser = async (req, res) => { 
    try {
        const user = await User.findByPk(parseInt(req.params.id));
        res.json(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
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
        res.sendStatus(401);
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
    return res.sendStatus(200);
}
const addUserBook = async (req, res) => {
    if(req.params.param === 'wishlist') {
        await UserBook.create({
            UserId: req.user.id,
            BookId: req.body.id,
            ListType: 0
        })
    }

    res.json(req.body)
}

const getUserBooks = async (req, res) => {
    await User.sync();
    await Book.sync();
    await UserBook.sync();
    try {
        const { fulfilled } = req.query;
        if(fulfilled != null) {
            const userBooks = await User.scope({method : ['fulfilled', fulfilled === 'true']
            }).findByPk(parseInt(req.params.id));
            return res.json(userBooks);
        }
        const userBooks = await User.scope([
            req.params.param
        ]).findByPk(parseInt(req.params.id));
        return res.json(userBooks);
    } catch(err) {
        console.log(err);
        return res.sendStatus(404);
    }
}

const getUserBook = async (req, res) => {
    await User.sync();
    await Book.sync();
    await UserBook.sync();
    try {
        const userBooks = await User.scope({ method: [
            req.params.param+'_bookId', req.params.bookId
        ]}).findByPk(parseInt(req.params.id));
        return res.json(userBooks.UserBooks[0]);
    } catch(err) {
        return res.sendStatus(404);
    }
}

const deleteUserBook = async (req, res) => {
    await User.sync();
    await Book.sync();
    await UserBook.sync();
    if(parseInt(req.params.id) !== req.user.id) {
        return res.sendStatus(400);
    }
    let type = 0;
    switch(req.params.param) {
        case 'wishlist':
            type = 0
            break;
        default:
            break;
    }
    await UserBook.destroy({
        where: {
            UserId: req.user.id,
            BookId: parseInt(req.params.book),
            ListType: type
        }
    })
    return res.json(req.body);
}

const updateUserBook = async (req, res) => {
    await User.sync();
    await Book.sync();
    await UserBook.sync();
    if(parseInt(req.params.id) !== req.user.id) {
        return res.sendStatus(400);
    }
    const bookId = parseInt(req.body.id);
    const fulfilled = req.body.wishlist.fulfilled;

    if(req.params.param === 'wishlist') {
        const userbook_id = await UserBook.findOne({
            attributes: ['id'],
            where: {
                BookId: bookId,
                UserId: req.user.id 
            }
        })
        await Wishlist.update({
            fulfilled: fulfilled,
        }, {
            where : {
                UserBookId: userbook_id.dataValues.id,
            },
        })
        return res.json(req.body);
    } else {
        return res.sendStatus(400);
    }
}

module.exports = {
    refreshAccessToken,
    signUp, logIn, logOut,
    getAllUsers, deleteUser, updateUser, getUser,
    addUserBook, getUserBooks, deleteUserBook, updateUserBook, getUserBook
}