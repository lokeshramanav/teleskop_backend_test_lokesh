const express = require('express');
const router = express.Router();

const fileController = require('../controller/file.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { fileValidator } = require('../requestValidator/file.validator');

router.post('/upload', authMiddleware, fileValidator, fileController.uploadFile);
router.get('/list', authMiddleware, fileController.getUserFiles);
router.put('/hide', authMiddleware, fileController.hideFiles); 
router.delete('/delete', authMiddleware, fileController.deleteFiles);

module.exports = router;
