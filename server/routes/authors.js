const express = require('express');
const controller = require('../controllers/author_controller');
const {verifyToken} = require('../middleware/authentication');

module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/', (req, res, next) => {
    controller.getAllAuthors(req, res);
  });
  router.get('/:id', verifyToken, (req, res, next) => {
    controller.getAuthor(req, res);
  });
  router.post('/', verifyToken, (req, res, next) => {
    controller.addAuthor(req, res);
  });
  router.delete('/:id', verifyToken, (req, res, next) => {
    controller.deleteAuthor(req, res);
  });
  router.put('/:id', verifyToken, (req, res, next) => {
    controller.updateAuthor(req, res);
  });
  return router;
};