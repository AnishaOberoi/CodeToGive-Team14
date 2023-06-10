const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://kirti1211c:dontask77@cluster0.bilxtml.mongodb.net/test?retryWrites=true&w=majority';
const user = require('./models/user.js')
const ques = require('./models/ques.js')



var jwt = require('jsonwebtoken');
const jwtSecret = "secret";
const store = require('store');

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


app.get('/', (req, res) => {
    console.log("homeeeee");
    res.render('main.ejs')
})
var u = ["admin1", "admin2", "admin3"];
var p = ["breads", "breads", "breads"];
app.post('/', urlencodedParser, (req, res) => {
    console.log("post login--------------------");
    // console.log(req.body);
    if (req.body === undefined || req.body === null) {
        res.render('main.ejs');
    } else {

        var params = req.body;
        // console.log(params);
        var { username, password } = req.body;

        var x = u.indexOf(username);
        if (x !== -1 && p[x] === password) {
            const data = {
                user: {
                    id: username
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            jsonn = { success, authToken, username };
            store.set(username, jsonn);
            console.log(store);
            console.log(authToken);
            res.redirect('/admin');
        } else {
            res.redirect('/');
        }
    }

})
app.post('/admin', urlencodedParser, (req, res) => {
    store.clearAll();
    res.redirect("/");
})
app.get('/admin', (req, res) => {
    // const json = res.json();

    var i = 0;
    store.each(function (value, key) {
        console.log(key, '==', value);
        i = 1;
    })
    console.log("admin");
    if (i != 1) {
        res.send("<h1>Bad Request</h1>");

    } else {
        user.find({}).then(pdata => {
            ans = pdata
            console.log(ans);
            var yes = 0;
            var no = 0;
            var total = ans.length;
            console.log(total);
            ans.forEach(users => {
                var surveydata = users.survey_data;

                surveydata.forEach(uarr => {
                    if (uarr[0] === "647df0ee2c1ae3982f81eef3") {
                        if (uarr[1] === "yes") {
                            yes++;
                        } else if (uarr[1] === "no") {
                            no++;
                        }
                    }
                })
            })
            res.render('admin.ejs', { yes: yes, no: no, total: total, flag: 0 });


        })
    }


})
app.get('/reset', (req, res) => {
    console.log("reset");
    var i = 0;
    store.each(function (value, key) {
        // console.log(key, '==', value);
        i = 1;
    })
    if (i !== 1) {
        res.send("<h1>Bad Request</h1>");
    }
    res.render('reset.ejs', { flag: 10 });
})
app.post('/reset', urlencodedParser, (req, res) => {
    var { username, cp, np, np2 } = req.body;
    console.log(username, cp, np, np2);
    if (np === np2) {
        if (u.indexOf(username) != -1 && p[u.indexOf(username)] === cp) {
            p[u.indexOf(username)] = np;
            console.log("Done");
            res.render("reset.ejs", { flag: 0 });
        } else {
            console.log("Error, current password not correct");
            res.render("reset.ejs", { flag: 1 });
        }
    } else {
        console.log("Error");
        res.render("reset.ejs", { flag: 2 });
    }
})

app.get('/report', (req, res) => {
    console.log("report");
    var i = 0;
    store.each(function (value, key) {
        console.log(key, '==', value);
        i = 1;
    })
    if (i !== 1) {
        res.send("<h1>Bad Request</h1>");
    }
    var ans = []
    user.find({}).then(pdata => {
        ans = pdata
        console.log(ans);
        var all = [];
        var volunteer = [];
        var counsel = [];
        // var name = atob(ans[4].survey_data[0][1]);
        // console.log(name);
        ans.forEach(users => {
            var surveydata = users.survey_data;
            var obj = {};
            var flag_vol = 0;
            var flag_coul = 0;
            surveydata.forEach(uarr => {
                if (uarr[0] === "647cd4419731782982ad9882") {
                    var name = atob(uarr[1]);
                    obj.name = name;
                }
                if (uarr[0] === "648051130d1033015eb9b26f") {
                    obj.contact = uarr[1];
                }
                if (uarr[0] === "64805584e3198be1fd5a3715") {
                    obj.timings = uarr[1];
                }
                if (uarr[0] === "64804ba68eef5d647bbc8823" && uarr[1] === "Yes") {
                    flag_vol = 1;
                }
                if (uarr[0] === "64804b8e9db806247b9ec744" && uarr[1] === "Yes") {
                    flag_coul = 1;
                }

            });
            if (flag_vol === 1) {
                volunteer.push(obj);
            }
            if (flag_coul === 1) {
                counsel.push(obj);
            }
        });
        // console.log(volunteer);
        // console.log(counsel);
        res.render('report.ejs', { volunteer: volunteer, counsel: counsel });
    });

    // res.render('report.ejs');
})




app.get('/survey', (req, res) => {
    var qq = [];
    ques.find({}).then(pdata => {
        qq = pdata;
        console.log(qq);
        console.log("survey");
        res.render('survey.ejs', { ques: qq });
    });

})

app.post('/survey', urlencodedParser, (req, res) => {
    console.log("post survey--------------------")
    var params = req.body;
    var keys = Object.keys(params);
    var values = Object.values(params);
    var i = 0;
    var arr = []

    keys.forEach(key => {
        if (key === "647cd4419731782982ad9882") {
            let encodedValue = btoa(values[i]);
            arr.push([key, encodedValue]);
            i++;
        } else {
            arr.push([key, values[i]]);
            i++;
        }

    })
    console.log(params);
    user.create({
        survey_data: arr,
        date: new Date().toLocaleDateString()
    })
    console.log("post survey--------------------")

    var name = atob(arr[0][1]);
    res.render('after_survey.ejs', { arr: arr, name });
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
//     ques_txt: " If you are willing to talk or volunteer to help, please enter your preferred timings to help us reach out to you.",
//     options: null,
//     multi_correct: false
// })