const express = require('express');
module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/',(req, res, next) => {
    res.json('main page')
  });
  return router;
};