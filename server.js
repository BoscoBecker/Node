const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

// Disabling the old header, good practice
app.disable('x-powered-by');

// Creating an session of 1 hour
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); 
app.use(cookieParser({
  name: 'session',
  keys: ['Ym9zY29iZWNrZXI=', 'Ym9zY29iZWNrZXIyMzEw'], // just Test, i am use base64
  cookie: { secure: true,
            httpOnly: true,
            domain: '127.0.0.1',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);

// Index
app.get('/', function(req,res){
  res.cookie("loggedin", "true");

  res.send("<h1>Hey everyone, Request using Express + Node!</h1>");
  
  if(req.cookies.loggedin == "true") {
    console.log("Yup! You are logged in!");
  }
});

// home 
app.get('/home',function(req,res){
  res.cookie("loggedin", "true");

  res.send("<h1>Hey everyone, Request using Express more Node!</h1>");

  if(req.cookies.loggedin == "true") {
    console.log("Yup! You are logged in!");
  }
});

// logout
app.get('/logout',function(req,res){
  res.cookie("loggedin", "false");

  res.send("<h1>Hey everyone, Request using Express more Node!</h1>");

  if(req.cookies.loggedin == "false") {
    console.log("Not logged in");
  } 
})
;

app.listen(port, function(){
  console.log("Server runing on port "+ port+" ");
});