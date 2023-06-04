const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://kirti1211c:dontask77@cluster0.bilxtml.mongodb.net/?retryWrites=true&w=majority';

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log("homeeeee");
    res.render('main.ejs')
})
app.get('/admin', (req, res) => {
    console.log("admin");
    res.render('admin.ejs')
})
app.get('/survey', (req, res) => {
    console.log("admin");
    res.render('survey.ejs')
})

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to mongoose");
    })
    .catch(err => {
        console.log("error")
        console.log(err)
    })
app.listen(8080, () => {
    console.log("Listening!");
})
