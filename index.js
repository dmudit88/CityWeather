const express=require('express');
const path=require('path');
const app=express();
const bodyParser = require('body-parser')
const axios = require('axios');
require('dotenv').config()

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
const apiKey=process.env.API_KEY;


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/',(req,res)=>{
    let loc=req.body.location;
    let url='https://api.openweathermap.org/data/2.5/weather?q='+loc+'&appid='+apiKey+'&units=metric';
    // console.log(url);
    axios.get(url)
    .then( (res_axios) => {
        // console.log(res_axios);
        var resp="<h3>The current temperature of "+loc+" : "+res_axios.data.main.temp+"</h3>";
        // console.log(resp);
        res.send(resp);
    })
    .catch( (err) => {
        res.send('<h3>City not found</h3>')
    })
    
});
app.listen(process.env.PORT || 5000,()=>{
    // console.log("Server running");
});

