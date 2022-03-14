const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const File = mongoose.model('file')
const {getFilePath} = require('./../helper/file.helper');

router.post('/', async (req, res) => {
    try {
        const file = await File.create({
            name: req.body.name,
            parentFolder: req.body.parentFolder
        })
        console.log(file);
        res.status(200).send({
            data: file,
            status: 'SUCCESS'
        })
    } catch (e) {
        console.log('Error creating file', e)
    }
})

router.get('/:fileName', async (req, res) => {
    try {
        const fileName = req.params.fileName || '';
        console.log(fileName);
        const file = await File.find({
            name: {
                $regex: fileName.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'),
                $options: 'i'
            },
        });
        console.log(file);
        res.status(200).send({
            data: file,
            status: 'SUCCESS'
        })
    } catch (e) {
        console.log('Error listing files', e)
    }
})

router.get('/file-path/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        console.log(fileId);
        const filePath = await getFilePath(fileId);
        console.log(filePath);
        res.status(200).send({
            data: filePath,
            status: 'SUCCESS'
        })
    } catch (e) {
        console.log('Error getting file path', e)
    }
})

// smiddela@intellicar.in
// shunmugakrishnan@intellicar.in

module.exports = router;