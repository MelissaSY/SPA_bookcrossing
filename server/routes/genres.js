const express = require('express');
const controller = require('../controllers/genre_controller');
const {verifyToken} = require('../middleware/authentication');

module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/', (req, res) => {
    controller.getAllGenres(req, res);
  });
  router.get('/:id', verifyToken, (req, res) => {
    controller.getGenre(req, res);
  });
  router.post('/', verifyToken, (req, res) => {
    controller.addGenre(req, res);
  });
  router.delete('/:id', verifyToken, (req, res) => {
    controller.deleteGenre(req, res);
  });
  router.put('/:id', verifyToken, (req, res) => {
    controller.updateGenre(req, res);
  });
  return router;
};