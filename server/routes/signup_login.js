const express = require('express');
const controller = require('../controllers/user_controller');

module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/login',(req, res, next) => {
    res.json('d')
  });
  router.get('/signup',(req, res, next) => {
    //res.json('why just why')
    controller.getAllUsers(req, res);
  });
  router.post('/signup', (req, res) => {
    controller.signUp(req, res);
  });
  router.post('/login', (req, res) => {
    controller.logIn(req, res);
  });
  router.post('/refresh', (req, res) => {
    controller.refreshAccessToken(req, res)
  });
  router.post('/logout', (req, res) => {
    controller.logOut(req, res)
  });
  return router;
};