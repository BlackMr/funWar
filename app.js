var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myAppDatabase');

app.get('/', function (req,res)
{	
	res.sendFile(__dirname + '/index.html');

});



// if our user.js file is at app/models/user.js
var User = require('./app/models/user');


var randomUsername = "randomuser" + String(Math.random()*100000);
 
// create a new user
var newUser = User({
  name: 'ahmeat',
  username: randomUsername.substring(0,15),
  password: 'amcık andyasdasd',
  admin: true
});


// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
newUser.dudify(function(err, name) {
  if (err) throw err;

  console.log('Your new name is ' + name);
});


// save the user
newUser.save(function(err) {
  if (err) throw err;
  console.log(newUser);
  console.log('User created!');
});








server.listen(process.env.PORT || 8080);
console.log('Listening for funWar, Port 8080');