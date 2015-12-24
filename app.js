var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/myAppDatabase');
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

 
app.get('/', function(req,res)
{ 
  res.sendFile(__dirname + '/public/views/index.html');

});

// if our user.js file is at app/models/user.js
var User = require('./app/models/user');


var randomUsername = "randomuser" + String(Math.random()*100000);
 
// create a new user
var newUser = User({
  name: "ahmett",
  username: randomUsername.substring(0,15),
  password: '123456',
  admin: true
});


// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
newUser.dudify(function(err, name) {
  if (err) throw err;
});


// save the user
newUser.save(function(err) {
  if (err) throw err;
  console.log(newUser);
  console.log('User created!');
  console.log('Your new name is ' + newUser.name);
});








server.listen(process.env.PORT || 8080);
console.log('Listening for funWar, Port 8080');