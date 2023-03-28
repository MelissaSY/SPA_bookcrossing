const fs = require('fs')
const util = require('util')
const multer = require('multer')
let uploadImage = multer({
    dest:'static/images',
    fileFilter: function (req, file, callback) {
        if(file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"||
            file.mimetype === "image/jpeg") {
            callback(null, true);
        } else {
            callback(new Error('Only images are allowed'), false);
        }
    }
}).single('file');

const deleteImage = (filepath) => {
    fs.unlink(filepath, (err) => {
        if(err) {
            throw err;
        }
    });
};

const fileExists = (filepath) => {
    return fs.existsSync(filepath);
}
let uploadBookImage = util.promisify(uploadImage);
module.exports = {uploadBookImage, deleteImage, fileExists};