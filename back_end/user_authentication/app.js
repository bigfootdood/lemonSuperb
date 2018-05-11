var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

var routes = require('./routes/router');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname + 'public')));

app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	res.locals.user = req.user || null;
	next();
});

app.use('/', routes);


app.listen(4000, function () {
  console.log('Listening on port 4000');
});
