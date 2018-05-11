var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var uuid = require('uuid/v4');
var User = require('../user');
var userDB = require('../../database/data/user');

const isAuthUser = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error', 'You are not logged in.');
		res.redirect('/');
	}
};

router.get('/', (req, res) => {
	res.render('login');
});

router.get('/private', isAuthUser, (req, res) => {
	res.render('private');
});

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You are logged out');
	res.redirect('/');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/newUserLogin', function(req, res) {
  res.render('login');
});

router.post(
  '/newUserLogin',
  passport.authenticate('local', {
    successRedirect: '/main/index',
    failureRedirect: '/',
    failureFlash: 'Invalid Username or Password'
  })
);

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/private',
		failureRedirect: '/',
		failureFlash: 'Invalid Username or Password'
	})
);

passport.use(
  '/newUserLogin',
  new LocalStrategy({
    usernameField : 'userName',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {
    if(User.findUserByName(username)) {
      throw "Username taken";
    } else {
      userDBuserDB.addUser(username, bcrypt.hashpw(password));
    }
    return NULL;
  })
);

passport.use(
  '/login',
  new LocalStrategy({
    usernameField : 'userName',
    passwordField : 'password',
    passReqToCallback : true
  },
  function (req, username, password, done) {
	   if(User.findUserByName(username)) {
       var user = User.findUserByName(username)
       if(!bcrypt.compare(password, user.hashedPassword)) {
         throw "Incorrect password";
       }
     } else {
       throw "No such username found";
     }
   }
));

// Serialize and Deserialize is used for sessions.
passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	try {
		const user = User.findUserById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = router;
