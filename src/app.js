const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const sessiion = require("express-session");
const flash = require("connect-flash");
const nocache = require('nocache');
const api = require('./common.router');

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(sessiion({
    secret: 'secret',
    cookie: { maxAge : 60000},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(nocache());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", api.commonRouter);

app.use(function(req, res, next){
    res.status(404).render('errors/404notfound', {title: "Sorry, page not found",message:"The request /url doesnexist not found in the server.thats all we kow"});
});

module.exports = app