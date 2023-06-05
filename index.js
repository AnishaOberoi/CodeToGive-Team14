const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://kirti1211c:dontask77@cluster0.bilxtml.mongodb.net/test?retryWrites=true&w=majority';
const user = require('./models/user.js')
const ques = require('./models/ques.js')

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
    // console.log(qq);
    res.render('survey.ejs', { ques: qq });
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Listening!");
})


// user.create({
//     survey_data: [["name", "riya verma"], ["email", "verma@gmail.com"], null, ["scale", "5"], ["addiction", "yes"]]
// })
// ques.create({
//     ques_txt: "Do you know what addiction is?",
//     options: ["yes", "no"],
//     multi_correct: false
// })