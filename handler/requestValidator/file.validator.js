const multer = require('multer');
const path = require('path');
const Response = require('../../utils/responseBuilder');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only PDF, JPG and PNG files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: fileFilter
}).single('file');

const fileValidator = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json(new Response(false, err.message));
        }
        next();
    });
};

module.exports = {
    fileValidator,
}