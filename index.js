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

    // var i = 0;
    // store.each(function (value, key) {
    //     console.log(key, '==', value);
    //     i = 1;
    // })
    // console.log("admin");
    // if (i != 1) {
    //     res.send("<h1>Bad Request</h1>");

    // } else {
    user.find({}).then(pdata => {
        ans = pdata
        console.log(ans);
        var volyes = 0;
        var colyes = 0;
        var know = 0;
        var total = ans.length;
        console.log(total);
        var pincode = {};
        var addcloud = {};
        var add = ["Electronics", "Alcohol", "Drugs", "Nicotine"];
        var addfreq = [0, 0, 0, 0];
        ans.forEach(users => {
            var surveydata = users.survey_data;

            surveydata.forEach(uarr => {
                if (uarr[0] === "64804ba68eef5d647bbc8823") {
                    if (uarr[1] === "Yes") {
                        volyes++;
                    }
                }
                if (uarr[0] === "64804b8e9db806247b9ec744") {
                    if (uarr[1] === "Yes") {
                        colyes++;
                    }
                }
                if (uarr[0] === "647df0ee2c1ae3982f81eef3") {
                    if (uarr[1] === "yes") {
                        know++;
                    }
                }

                if (uarr[0] === "647cd475f22afe1044988277") {
                    var x = Object.keys(pincode);

                    if (uarr[1] !== undefined && uarr[1] != null && uarr[1] !== "") {
                        if (x.indexOf(uarr[1]) === -1) {
                            let p = uarr[1];
                            pincode[p] = 1;
                        } else {
                            let p = uarr[1];
                            pincode[p] = pincode[p] + 1;
                        }
                    }

                }
                if (uarr[0] === "video games" || uarr[0] === "internet") {
                    addfreq[0]++;
                }
                if (uarr[0] === "alcohol") {
                    addfreq[1]++;
                }
                if (uarr[0] === "hallucinogens" || uarr[0] === "sedatives" || uarr[0] === "cannabis") {
                    addfreq[2]++;
                }
                if (uarr[0] === "nicotine") {
                    addfreq[3]++;
                }
                if (uarr[0] === "6480479658c660399aa8ea4f") {
                    var x2 = Object.keys(addcloud);

                    if (uarr[1] !== undefined && uarr[1] != null && uarr[1] !== "") {
                        var text = uarr[1].toLowerCase();
                        text = text.charAt(0).toUpperCase() + text.slice(1);
                        if (x2.indexOf(text) === -1) {
                            let p2 = text;
                            addcloud[p2] = 1;
                        } else {
                            let p2 = text;
                            addcloud[p2] = addcloud[p2] + 1;
                        }
                    }

                }

            })
        })
        var pin = Object.keys(pincode);
        var pinfreq = Object.values(pincode);
        var addclouda = Object.keys(addcloud);
        var addcloudafreq = Object.values(addcloud);
        var sumFreq = addfreq[0] + addfreq[1] + addfreq[2] + addfreq[3];
        console.log(sumFreq);
        console.log(addclouda, addcloudafreq);
        console.log(colyes, know);
        res.render('d-index.ejs', { volyes, total: total, pin, pinfreq, add, addfreq, addclouda, addcloudafreq, colyes, know, sumFreq });


    })
    // }


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
app.get('/d-index', (req, res) => {
    res.render("d-index.ejs");
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
            var feel = [];
            var allobj = {};
            var flag_vol = 0;
            var flag_coul = 0;
            var add = [];
            surveydata.forEach(uarr => {
                if (uarr[0] === "647cd4419731782982ad9882") {
                    var name = atob(uarr[1]);
                    obj.name = name;
                    allobj.name = name;
                }
                if (uarr[0] === "648051130d1033015eb9b26f") {
                    obj.contact = uarr[1];
                    allobj.contact = uarr[1];
                }
                if (uarr[0] === "64805584e3198be1fd5a3715") {
                    obj.timings = uarr[1];
                    allobj.timings = uarr[1];
                }
                if (uarr[0] === "64804ba68eef5d647bbc8823" && uarr[1] === "Yes") {
                    flag_vol = 1;
                }
                if (uarr[0] === "64804b8e9db806247b9ec744" && uarr[1] === "Yes") {
                    flag_coul = 1;
                }
                if (uarr[0] === "647cd475f22afe1044988277") {
                    allobj.pincode = uarr[1];
                }
                if (uarr[0] === "647df0ee2c1ae3982f81eef3") {
                    allobj.know = uarr[1];
                }
                if (uarr[0] === "648049bce18d573fa7188c80") {
                    allobj.dependence = uarr[1];
                }
                if (uarr[0] === "64804a18ed847a0a35abbe15") {
                    allobj.scale = uarr[1];
                }
                if (uarr[0] === "64804b1d8d77d019856e3c30") {
                    allobj.stressed = uarr[1];
                }
                if (uarr[0] === "64804b4899bf34519e7fc271") {
                    allobj.control = uarr[1];
                }
                if (uarr[0] === "64804b66b0c8eb69f0c61cfc") {
                    allobj.others = uarr[1];
                }

                if (uarr[0] === "64804ba68eef5d647bbc8823") {
                    allobj.vol = uarr[1];
                }
                if (uarr[0] === "64804b8e9db806247b9ec744") {
                    allobj.cou = uarr[1];
                }
                if (uarr[0] === "64847ef11fb117ab8728cd6d") {
                    allobj.age = uarr[1];
                }
                if (uarr[0] === "video games") {
                    add.push("video games");
                }
                if (uarr[0] === "junk food") {
                    add.push("junk food");
                }
                if (uarr[0] === "internet") {
                    add.push("internet");
                }
                if (uarr[0] === "caffeine") {
                    add.push("caffeine");
                }
                if (uarr[0] === "alcohol") {
                    add.push("alcohol");
                }
                if (uarr[0] === "nicotine") {
                    add.push("nicotine");
                }
                if (uarr[0] === "tobacco") {
                    add.push("tobacco");
                }
                if (uarr[0] === "cannabis") {
                    add.push("cannabis");
                }
                if (uarr[0] === "hallucinogens") {
                    add.push("hallucinogens");
                }
                if (uarr[0] === "sedatives") {
                    add.push("sedatives");
                }
                if (uarr[0] === "6480479658c660399aa8ea4f") {
                    add.push(uarr[1]);
                }
                if (uarr[0] === "Helpless") {
                    feel.push("Helpless");
                }
                if (uarr[0] === "Vulnerable") {
                    feel.push("Vulnerable");
                }
                if (uarr[0] === "Depressed") {
                    feel.push("Depressed");
                }
                if (uarr[0] === "Alone") {
                    feel.push("Alone");
                }
                if (uarr[0] === "Dejected") {
                    feel.push("Dejected");
                }
                if (uarr[0] === "Anxious") {
                    feel.push("Anxious");
                }
                if (uarr[0] === "Frequent mood swings") {
                    feel.push("Frequent mood swings");
                }
                if (uarr[0] === "Easily triggered") {
                    feel.push("Easily triggered");
                }
                if (uarr[0] === "Stressed") {
                    feel.push("Stressed");
                }
                if (uarr[0] === "6480485bd594afbe9b71c5ed") {
                    feel.push(uarr[1]);
                }




            });
            allobj.date = users.date;
            allobj.feel = feel;
            allobj.add = add;
            if (flag_vol === 1) {
                volunteer.push(obj);
            }
            if (flag_coul === 1) {
                counsel.push(obj);
            }
            all.push(allobj);
        });
        // console.log(volunteer);
        // console.log(counsel);
        res.render('report.ejs', { volunteer: volunteer, counsel: counsel, all: all });
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
    user.find({}).then(pdata => {
        ans = pdata
        console.log(ans);
        var total = ans.length;
        res.render('after_survey.ejs', { total });
    })

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
//     ques_txt: "Enter your age",
//     options: ["Below 18", "18-25", "25-40", "Above 40"],
//     multi_correct: false
// })