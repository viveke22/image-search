const axios = require("axios");
const fs = require('fs');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('url');

let app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req,res) {
  res.sendFile(__dirname+"/index.html")
})
app.post('/', function (req,res) {
        let s1 = req.body.imgtext;
const options = {
    method: 'GET',
    url: 'https://bing-image-search1.p.rapidapi.com/images/search',
    params: {q: s1,
    pageNumber: '1',
    pageSize: '1'},
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
    }
  };
  
axios.request(options).then(function (response) {
    let r1 = Math.floor(Math.random()* 25);
    let v1 = response.data.value[r1].contentUrl;
   // app.post('/', function (req,res) {
      //let s1 =req.body.imgtext;
      const myURL = new URL(v1);
          let s2= options.params.q;
          res.send(res.send("<img src =" + v1 +" width=100% height=100% > <br> <h1>For better image Size "+"<a href="+myURL+">click here</a></h1>"));
     //}) 
     // console.log(response.data.value[0].url);
     function download(url, path, callback) {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback);
    });
  }       
       const url = v1;
       let r2 = Math.floor(Math.random()*300);
       const path = './images/'+ s2 + r2 +'.png';

       
       download(url, path, () => {
         console.log('✅ Done!');
       })
 
 }).catch(function (error) {
      console.error(error);
 })});

 


app.listen(process.env.PORT || 3000, function () {
  console.log("server online on 3000");
})


