const UserController = require('../controller/users');
const express = require('express');

const router = express.Router();
router.get('/all', UserController.findAllUsers);

router.get('/allGeo', UserController.findAllGeoUsers);

router.get('/:id', UserController.findById);

router.post('/add', UserController.addUser);

router.post('/updateUserLocation', UserController.updateUserLocation);

router.post('updUserLocation', UserController.updUserLocation);

router.get('/byusername/:username', UserController.findByUsername);

router.post('/removebyid', UserController.removeById);

module.exports = router;