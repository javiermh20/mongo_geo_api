const mongoose = require('mongoose');
const User = require('../models/user');

const findAllUsers = (req, res) => {
    User.find().then((users) => {
        console.log("User FindAll Succes");
        res.status(200).json(users);
    },
    err => {
        console.log("User FindAll Error");
        err && res.status(500).send(err.message);
    });
};

const findById = (req, res) => {
    console.log(req.params);
    User.findById(req.params.id).then((user) => {
        res.status(200).json(user);
    },
    err => {
        err && res.status(500).send(err.message);
    });
};

const addUser = (req, res) => {
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        latestLaltitude : req.body.latestLaltitude,
        latestLongitude : req.body.latestLongitude
    });
    user.save().then((usr) => {
        res.status(200).json(usr);
    },
    err => {
        err && res.status(500).send(err.message);
    });
};

const updateUserLocation = (req, res) => {
    console.log(req.body);
    const key = Object.keys(req.body)[0];
    console.log(key);
    const parsedKey = JSON.parse(key);
    console.log(parsedKey);
    User.updateOne({_id:parsedKey.id}, 
        {latestLaltitude:parsedKey.latestLaltitude, 
            latestLongitude: parsedKey.latestLongitude}).then((usr) =>{
            res.status(200).json(usr);
        },
        err => {
            err && res.status(500).send(err.message);
    });
}

const findByUsername = (req, res) => {
    console.log(req.params.username);
    User.find({username:req.params.username}).then((user) => {
        res.status(200).json(user);
    },
    err => {
        err && res.status(500).send(err.message);
    });
};

module.exports = { findAllUsers, findById, addUser, updateUserLocation, findByUsername};