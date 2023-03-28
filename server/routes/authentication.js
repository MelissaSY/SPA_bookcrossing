const express = require('express');
const controller = require('../controllers/authentication_controller');

module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/login',(req, res, next) => {
    res.json('why just why')
  });
  router.get('/signup',(req, res, next) => {
    res.json('why just why')
    //controller.getAllUsers(req, res);
  });
  router.post('/signup', (req, res) => {
    controller.signUp(req, res);
  });
  router.post('/login', (req, res) => {
    controller.logIn(req, res);
  });
  return router;
};