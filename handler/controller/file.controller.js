const { v4: uuidv4 } = require('uuid');
const fileDao = require('../../dao/file.dao');
const Response = require('../../utils/responseBuilder');

const uploadFile = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.user.id;
        const fileId = uuidv4();
        const fileData = {
            id: fileId,
            userId: userId,
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
            fileBuffer: file.buffer
        };

        await fileDao.uploadFile(fileData);
        return res.status(201).json(new Response(true, 'File uploaded successfully', { fileId }));
    } catch (error) {
        return res.status(500).json(new Response(false, 'File upload failed', { error: error.message }));
    }
};

const getUserFiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 25;
        const showAllFiles = req.query.showAllFiles === 'true';

        const files = await fileDao.getUserFiles(userId,showAllFiles, offset, limit);
        
        if (files.length === 0) {
            return res.status(404).json(new Response(true, 'No files found'));
        }

        return res.status(200).json(new Response(true, 'Files retrieved successfully', { files }));
    } catch (error) {
        return res.status(500).json(new Response(false, 'Failed to retrieve files', { error: error.message }));
    }
};

const hideFiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fileIds } = req.body;

        if (!Array.isArray(fileIds) || fileIds.length === 0) {
            return res.status(400).json(new Response(false, 'No file IDs provided'));
        }

        await fileDao.hideFiles(userId, fileIds);
        return res.status(200).json(new Response(true, 'Files hidden successfully'));
    } catch (error) {
        return res.status(500).json(new Response(false, 'Failed to hide files', { error: error.message }));
    }
};

const deleteFiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fileIds } = req.body;

        if (!Array.isArray(fileIds) || fileIds.length === 0) {
            return res.status(400).json(new Response(false, 'No file IDs provided'));
        }

        await fileDao.deleteFiles(userId, fileIds);
        return res.status(200).json(new Response(true, 'Files deleted successfully'));
    } catch (error) {
        return res.status(500).json(new Response(false, 'Failed to delete files', { error: error.message }));
    }
};



module.exports = {
    uploadFile,
    getUserFiles,
    hideFiles,
    deleteFiles
};