const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));


//DB SETUP
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basics', {useNewUrlParser: true, useUnifiedTopology: true});

const kittySchema = new mongoose.Schema({
    name: String,
    desc: String
  });

  const Kitten = mongoose.model('Kitten', kittySchema);

//ROUTES
app.get('/', function(req, res){

   /*  Kitten.create({
        name: "prachishu",
        desc: "xyz"
    }, function(err, createdKitten){
        if(err){
            console.log("error occured while creating a kitten");
        }
        else{
            console.log(createdKitten + "Kitten saved!");
        }
    }); */

    res.render("home.ejs");
});

app.post('/index', function(req, res){
    Kitten.create({
        name: req.body.kittenName,
        desc: req.body.kittenDes
    },function(err, kittenCreated){
        if(err){
            console.log("Error occured!");
        }
        else{
            res.redirect("/index");
        }
    });
});

app.get('/index', function(req, res){
    
    Kitten.find({}, function(err, kittens){
        if(err){
            console.log("Error occured while fetching data.");
        }
        else{
            res.render("index.ejs", {kittens: kittens});
        }
    })
});

app.post('/index', function(){})

app.listen(3300, function(){
    console.log("Running at 3300");
});