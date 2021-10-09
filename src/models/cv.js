const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CvSchema = new Schema({
    currentCV: {
        type: String,
        required: true,
    },
},  {timestamps: true});

const Cv = mongoose.model('Cv', CvSchema);


module.exports = Cv;