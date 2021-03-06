const db = require('./index.js')

// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

var Promise = require('bluebird');
// var db = require('./models');
// var Place = require('./models/place');
// var Hotel = require('./models/hotel');
// var Restaurant = require('./models/restaurant');
// var Activity = require('./models/activity');

var data = {
  student: [
    {name: "Eduardo", fulfilled: false },
    {name: "Molly",  fulfilled: false},
    {name: "Gabe",  fulfilled: false},
    {name: "Kate",  fulfilled: true}
  ],
  school: [
    {name: "P.S. 1", address: "123 Fake St, Faketown, NY 11220"},
    {name: "P.S. 2", address: "5 Hanover Sq, New York, NY 10004"}
  ],
  donator: [
    {name: "Toys for Tots"}
  ],
  toy: [
    {name: "Hatchimals Egg (Interactive)", image: "http://media.brostrick.com/wp-content/uploads/2016/09/03200640/new-hatchimals-eggs-2016-draggls-owlicorn-penguala-2017-christmas-toys.jpg"},
    {name: "Snuggles My Dream Puppy Playset", image: "http://media.brostrick.com/wp-content/uploads/2016/09/03200640/little-live-pets-snuggles-my-dream-puppy-toy-of-the-year-2016-2017.jpg"},
    {name: "Pokemon Z-Ring Interactive Set", image: "http://media.brostrick.com/wp-content/uploads/2016/09/03200640/pokemon-z-ring-interactive-game-2016-2016-hottest-toys-of-the-year.jpg"},
    {name: "Nerf N-Strike Remote Control Drone Blaster", image: "http://media.brostrick.com/wp-content/uploads/2016/09/03200640/2016-nerf-strike-drone-blaster-2017-e1473468657424.jpg"}
  ],
  user: [
    {login: "eduardo@eduardo.com", password: "123", userType: "student"},
    {login: "molly@molly.com", password: "123", userType: "student"},
    {login: "gabe@gabe.com", password: "123", userType: "student"},
    {login: "kate@kate.com", password: "123", userType: "student"},
    {login: "ps1@ps1.com", password: "123", userType: "schooladmin"},
    {login: "ps2@ps2.com", password: "123", userType: "schooladmin"},
    {login: "toysfortots@toysfortots.com", password: "123", userType: "donator"}
  ]
};

db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    });
  });
})
.then(function () {
  console.log("Finished inserting data");
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close() // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
  console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
  return null; // silences bluebird warning about using non-returned promises inside of handlers.
});


// const seedUsers = () => db.Promise.map([
//   {name: 'so many', email: 'god@example.com', password: '1234'},
//   {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
// ], user => db.model('users').create(user))

// db.didSync
//   .then(() => db.sync({force: true}))
//   .then(seedUsers)
//   .then(users => console.log(`Seeded ${users.length} users OK`))
//   .catch(error => console.error(error))
//   .finally(() => db.close())
