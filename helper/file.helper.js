const mongoose = require('mongoose');
const File = mongoose.model('file')

const getFilePath = async (fileId) => {
    try {
        const file = await File.findOne({_id: fileId});
        let filePath = '/' + file.name;
        if(!file.parentFolder) {
            return file.name;
        } else {
            filePath = await getFilePath(file.parentFolder) + filePath;
        }
        return filePath;
    } catch (e) {
        console.log('Error in getting file path', e.message || e);
        return Promise.reject(e);
    }
}

module.exports = {getFilePath}