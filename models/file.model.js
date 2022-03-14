const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const fileSchema = new Schema({
    name: {type: String},
    parentFolder: {type: ObjectId}
}, {timestamps: true});

module.exports = mongoose.model('file', fileSchema);
