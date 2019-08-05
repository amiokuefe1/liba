const express = require('express');
const router = express.Router();
const bstoreController = require('../controller/bstoreController');
const userBcontroller = require('../controller/userBcontroller');
router.get('/', bstoreController.home);

router.get('/addStore', bstoreController.form);

router.post('/addStore', 
	bstoreController.upload, 
	bstoreController.resize, 
	bstoreController.add);

router.get('/store', bstoreController.getStore);

router.get('/store/:id/edit', bstoreController.editStore);

router.post('/add/:id', bstoreController.updateBstore);

router.get('/login', userBcontroller.loginForm);

router.get('/register', userBcontroller.signUp);

router.post('/register', userBcontroller.validateRegister,
							userBcontroller.register, userBcontroller.passage);

module.exports = router;