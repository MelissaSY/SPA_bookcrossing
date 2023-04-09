const express = require('express');
const controller = require('../controllers/user_controller');
const {verifyToken, verifyRefreshToken} = require('../middleware/authentication');

module.exports = function (options = {}) {
  const router = express.Router();

  router.get('/signup',(req, res, next) => {
    controller.getAllUsers(req, res);
  });
  router.post('/signup', (req, res) => {
    controller.signUp(req, res);
  });
  router.post('/login', (req, res) => {
    controller.logIn(req, res);
  });
  router.get('/refresh', verifyRefreshToken, (req, res) => {
    controller.refreshAccessToken(req, res)
  });
  router.post('/logout', (req, res) => {
    controller.logOut(req, res)
  });
  router.get('/:id', verifyToken, (req, res) => {
      controller.getUser(req, res);
  })
  router.get('/:id/:param', verifyToken, (req, res) => {
      controller.getUserBooks(req, res);
  })
  router.get('/:id/:param/:bookId', verifyToken, (req, res) => {
      controller.getUserBook(req, res);
  })
  router.post('/:id/:param', verifyToken, (req, res) => {
      controller.addUserBook(req, res)
  });
  router.delete('/:id/:param/:book', verifyToken, (req, res) => {
      controller.deleteUserBook(req, res)
  });
  router.put('/:id/:param/:book', verifyToken, (req, res) => {
      controller.updateUserBook(req, res)
  });

  return router;
};