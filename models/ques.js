const mongoose = require('mongoose')

const { Schema } = mongoose;

const QuesSchema = new Schema({
    ques_txt: String,
    options: [String]
});

module.exports = mongoose.model('ques', QuesSchema)