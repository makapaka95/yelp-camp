const express = require('express');
const router = express.Router();
const passport = require('passport')
const wrapAsync = require('../utility/wrapAsync')
const User = require('../models/user');
const users = require('../controllers/users')

router.get('/register', users.renderRegister)

router.post('/register', wrapAsync(users.register))

router.get('/login', users.renderLogin)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login)

router.get('/logout', users.logout)


module.exports = router;

