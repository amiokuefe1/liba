const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const LibaStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/route');
const passport = require('passport');
const ejs = require('ejs');

const app = express();



// app.engine('html', ejs.renderFile);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
// app.set('view engine', 'ejs');
// app.set('view engine', 'html');
// app.set('views', __dirname);

// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
// the above will retrive user data and handle it as json format
app.use(bodyParser.urlencoded({ extended: true}));

// makes available methods for validating user data
app.use(expressValidator());

app.use(cookieParser());

app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
  	saveUninitialized: false,
	store: new LibaStore({ mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());
// the above helps us ensure we can register and login a user

app.use(flash());

// promisify some callback based APIs
// app.use((req, res, next) =>{
// 	req.login = promisify(req.login, req);
// 	next();
// });

app.use('/', routes);

module.exports = app;