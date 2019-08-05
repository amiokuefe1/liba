const mongoose = require('mongoose');
const Buser = mongoose.model('Buser');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) =>{
	res.render('login');
};

exports.signUp = (req, res) =>{
	res.render('signUp');
};

exports.validateRegister = (req, res, next) =>{
	req.sanitizeBody('name');
	req.checkBody('name', 'You must supply a name!').notEmpty();
	req.checkBody('email', 'That Email is not valid').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		gmail_remove_dots:false,
		remove_extension: false,
		gmail_remove_subaddress: false
	});
	req.checkBody('pass', 'Password Cannot be Blank').notEmpty();
	req.checkBody('re_pass', 'Confirmed Passwords cannot be blank!').notEmpty();
	req.checkBody('Password-confirm', 'Na wa o! your passwords do not match').equals(req.body.pass);
	// const errors = req.validationErrors();
	// if (errors) {
	// 	req.flash()
	// }
	next();
};

exports.register = async (req, res, next) => {
	const user = new Buser({ email: req.body.name, 
		name: req.body.name });
	const register = Promisify(Buser.register, Buser);
	await register(user, req.body.password);
	console.log('user registered');
	res.redirect('login');
};


exports.passage = (req, res) =>{
	res.render('login');
};








