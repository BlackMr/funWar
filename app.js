var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override');

mongoose.connect('mongodb://kaan:12345@ds037165.mongolab.com:37165/funwar');
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

 


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






// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/users', function(req, res) {

        // use mongoose to get all users in the database
        User.find(function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(users); // return all users in JSON format
        });
    });

    // create user and send back all todos after creation
    app.post('/api/users', function(req, res) {

        // create a user, information comes from AJAX request from Angular
        User.create({
            name : "Test",
            username:req.body.username,
            password: "123456",
            done : false
        }, function(err, user) {
                if (err) {
                res.send(err);
                //console.log("HATA1");
                } else {
            // get and return all the todos after you create another
            User.find(function(err, users) {

                if (err)
                    res.send(err)
                     
                res.json(users);
                //res.send(JSON.stringify(User));
            });
        }
        
        });

    });

    // delete a user
    app.delete('/api/users/:user_id', function(req, res) {
        User.remove({
            _id : req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        });
    });


app.get('*', function(req,res)
{ 
  res.sendFile(__dirname + '/public/views/index.html');

});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 


server.listen(process.env.PORT || 8080);
console.log('Listening for funWar, Port 8080');