const express = require('express')
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const wrapAsync = require('../utility/wrapAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');


router.get('/', wrapAsync(campgrounds.index))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgrounds.createCampground))



router.get('/:id', wrapAsync(campgrounds.showCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, wrapAsync(campgrounds.updateCampground))

router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground))

module.exports = router;