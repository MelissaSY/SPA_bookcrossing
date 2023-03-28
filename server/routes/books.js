const controller = require('../controllers/book_controller');
const image_controller = require('../controllers/upload_image_controller');
const express = require('express');


module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/',(req, res, next) => {
    controller.getAllBooks(req, res);
  });
  router.get('/:id', (req, res, next) => {
    controller.getBook(req, res);
  });
  router.post('/', (req, res, next) => {
    controller.addBook(req, res);
  });
  router.post('/upload_cover', (req, res, next) => {
    image_controller.uploadImage(req, res);
  });
  router.delete('/:id', (req, res, next) => {
    controller.deleteBook(req, res);
  });
  router.delete('/images/:image', (req, res, next) => {
    image_controller.deleteImage(req, res);
  });
  router.put('/:id', (req, res, next) => {
    controller.updateBook(req, res);
  });
  return router;
};