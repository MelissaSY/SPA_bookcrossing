const express = require('express');
const {verifyToken} = require('../middleware/authentication')

module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/', verifyToken, (req, res) => {
    //req.user
    res.json({'payload':'touring books', 'user':req.user});
  });
  return router;
};