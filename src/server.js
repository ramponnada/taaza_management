const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");


const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://ramponnada:6X96qeUxIGBOhmgu@cluster0.5bgrp.mongodb.net/taaza_pickle?retryWrites=true&w=majority'
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('mongodb connection ready!');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});
async function startserver(){
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,        
        useUnifiedTopology: true,        
    });     
    server.listen(PORT ,() => {
        console.log("server started");
    });
 }

 startserver();