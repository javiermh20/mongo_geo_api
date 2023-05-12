const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    name: { type: String },
    name_manager: { type: String },
    latestLaltitude: { type: String },
    latestLongitude: { type: String }
});

module.exports = Branch = mongoose.model('Branch', BranchSchema);