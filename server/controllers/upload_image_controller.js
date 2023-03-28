const uploadBookImage = require('../middleware/upload_image_middleware');
const path = require('path');

const uploadImage = (req, res) => {
    try {
        uploadBookImage.uploadBookImage(req, res)
        .then(() =>{
            res.status(200).send({
                filename: req.file.filename
            });
        })
    } catch (err) {
        res.status(500).send({
            message: `Unable to upload the file: ${req.file.originalname}. ${err}`,
          });
    }
};

const sendFile = (req, res, next) => {
    let filepath = '../static/images/';
    let options = {
        root:  path.join(__dirname, filepath)
    };
    res.sendFile(req.params.image, options,  function (err) {
        if (err) {
            next(err);
        }
    });
};

const deleteImage = (req, res) => {
    let filepath = '../server/static/images/' + req.params.image;   
    try {
        uploadBookImage.deleteImage(filepath);
        res.json(req.body);
    } catch(err) {
        res.sendStatus(500);
    }
}

module.exports = { uploadImage, sendFile, deleteImage, };