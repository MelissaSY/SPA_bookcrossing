const controller = require('../controllers/book_controller');
const image_controller = require('../controllers/upload_image_controller');
const express = require('express');
const {verifyToken} = require('../middleware/authentication');


module.exports = function (options = {}) {
  const router = express.Router();
  router.get('/',(req, res, next) => {
    controller.getAllBooks(req, res);
  });
  router.get('/:id', (req, res, next) => {
    controller.getBook(req, res);
  });
  router.post('/', verifyToken, (req, res, next) => {
    controller.addBook(req, res);
  });
  router.post('/upload_cover', verifyToken, (req, res, next) => {
    image_controller.uploadImage(req, res);
  });
  router.delete('/:id', verifyToken, (req, res, next) => {
    controller.deleteBook(req, res);
  });
  router.delete('/images/:image', verifyToken, (req, res, next) => {
    image_controller.deleteImage(req, res);
  });
  router.put('/:id', verifyToken, (req, res, next) => {
    controller.updateBook(req, res);
  });
  return router;
};