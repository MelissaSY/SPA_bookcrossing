const express = require('express');
const controller = require('../controllers/genre_controller');

module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/',(req, res, next) => {
    controller.getAllGenres(req, res);
  });
  router.get('/:id', (req, res, next) => {
    controller.getGenre(req, res);
  });
  router.post('/', (req, res, next) => {
    controller.addGenre(req, res);
  });
  router.delete('/:id', (req, res, next) => {
    controller.deleteGenre(req, res);
  });
  router.put('/:id', (req, res, next) => {
    controller.updateGenre(req, res);
  });
  return router;
};