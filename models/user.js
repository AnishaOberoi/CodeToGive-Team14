const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    survey_data: [[String]],
    date: String,
    dis: String
});

module.exports = mongoose.model('user', UserSchema)