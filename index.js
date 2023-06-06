const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://kirti1211c:dontask77@cluster0.bilxtml.mongodb.net/test?retryWrites=true&w=majority';
const user = require('./models/user.js')
const ques = require('./models/ques.js')

const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const message = "This is a secret message";
const Securitykey = crypto.randomBytes(32);
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
// let encryptedData = cipher.update(message, "utf-8", "hex");
// encryptedData += cipher.final("hex");

// console.log("Encrypted message: " + encryptedData);


// const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
// let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
// decryptedData += decipher.final("utf8");
// console.log("Decrypted message: " + decryptedData);


app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var ques_set = [];
var qq = [];
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to mongoose");
    })
    .catch(err => {
        console.log("error")
        console.log(err)
    })
var qq = [];
ques.find({}).then(pdata => {
    qq = pdata
});

app.get('/', (req, res) => {
    console.log("homeeeee");
    res.render('main.ejs')
})
app.get('/admin', (req, res) => {
    console.log("admin");
    res.render('admin.ejs')
})

app.get('/survey', (req, res) => {
    console.log("survey");
    res.render('survey.ejs', { ques: qq });
})
// app.get('/after_survey', (req, res) => {

// })

app.post('/survey', urlencodedParser, (req, res) => {
    console.log("post survey--------------------")
    var params = req.body;
    var keys = Object.keys(params);
    var values = Object.values(params);
    var i = 0;
    var arr = []
    keys.forEach(key => {
        if (key === "647cd4419731782982ad9882") {
            console.log(values[i]);
            let x = values[i];
            let encrypted = cipher.update(x, "utf-8", "hex");
            encrypted += cipher.final("hex");
            arr.push([key, encrypted]);
            i++;
        } else {
            arr.push([key, values[i]]);
            i++;
        }

    })
    console.log(params);
    // user.create({
    //     survey_data: arr,
    //     date: new Date().toLocaleDateString()
    // })
    console.log("post survey--------------------")
    res.render('after_survey.ejs', { params: params });
})



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Listening!");
})


// user.create({
//     survey_data: [["name", "riya verma"], ["email", "verma@gmail.com"], null, ["scale", "5"], ["addiction", "yes"]],
//     date: new Date().toLocaleDateString()
// })
// ques.create({
//     ques_txt: "Do you know what addiction is?",
//     options: ["yes", "no"],
//     multi_correct: false
// })