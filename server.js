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

// trust first proxy
app.set('trust proxy', 1);

// Disabling the old header, good practice
app.disable('x-powered-by');

//NEVER IN YOUR LIFE GO UP A CODE WITH YOUR PRIVATE KEYS OR ANY KEY, 
//THIS CODE IS ONLY TEST FOR USE OF NODE SECURITY FEATURES.

// Creating an session of 1 hour
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); 
app.use(cookieParser({
  name: 'session',  // RSA 1024 Bits 
  keys: ['AAAAB3NzaC1yc2EAAAADAQABAAAAgQDMAuFzWX/RbxG7xnlyHLB4YZxCMk3Gbh4SP/FddubDQ216L9oBhpx6qV4PxeajZ1O+1ypGL2hLJtxU2iVG6A6Tai7Nu6/fBHtUdBuaaQj/LB7jUHEn456toLBIGBeH3YiSa40Clz/eB74ohb3fqckdGBw3t4Cx4rxnKxd0O2VDZQ==',
         'AAAAB3NzaC1yc2EAAAADAQABAAAAgQC7HKQUFUVtVeyMPmArXVFAU1j0UqMkoXOGoiDXytmQEB3s6g+d5rWL/hdKzRozQai2WORbgn5nY80KalLGf5e9qtMDhXwMD/VIZo2/jb/PjuLfjtf1yF0vgfcRu5rHviVJ95niU34OJJWYeyHgizbCbIfoliGFEaHN9E9fGQZ1Iw=='
        ],
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
    console.log("You are logged in!");
  }
});

// home 
app.get('/home',function(req,res){
  res.cookie("loggedin", "true");

  res.send("<h1>Hey everyone, Request using Express more Node!</h1>");

  if(req.cookies.loggedin == "true") {
    console.log("You are logged in!");
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
  console.log("Server runing on port "+ port +" ");
});