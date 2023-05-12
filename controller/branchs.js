const mongoose = require('mongoose');
const Branch = require('../models/branch');

const findAllBranchs = (req, res) => {
    Branch.find().then((branchs) => {
        console.log("Branch FindAll Succes");
        res.status(200).json(branchs);
    },
    err => {
        console.log("Branch FindAll Error");
        err && res.status(500).send(err.message);
    });
};

const findAllGeoBranchs = (req, res) => {
    Branch.find().then((branchs) => {
        console.log("Branch FindAll GeoBranchs Succes");
        var geobranchs = { type: "FeatureCollection", features: [] };
        geobranchs.map(item => {
            geobranchs.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [item.latestLongitude, item.latestLaltitude]
                },
                properties: {
                    name: item.name,
                    name_manager: item.name_manager,
                },
                id: item._id
            })
        });
        res.status(200).json(geobranchs);
    },
        err => {
            console.log("Branch FindAll GeoBranchs Error");
            err && res.status(500).send(err.message);
        });
}

const findById = (req, res) => {
    console.log(req.params);
    Branch.findById(req.params.id).then((user) => {
        res.status(200).json(user);
    },
    err => {
        err && res.status(500).send(err.message);
    });
};

const removeById = (req, res) => {
    console.log(req.params);
    Branch.findByIdAndDelete(req.params.id).then((branch) => {
        res.status(200).json(branch);
    },
    err => {
        err && res.status(500).send(err.message);
    });
};

const addBranch = (req, res) => {
    let branch = new Branch({
        name: req.body.name,
        name_manager: req.body.name_manager,
        latestLaltitude : req.body.latestLaltitude,
        latestLongitude : req.body.latestLongitude
    });
    branch.save().then((brc) => {
        res.status(200).json(brc);
    },
    err => {
        err && res.status(500).send(err.message);
    });
};

const updBranchLocation = (req, res) => {
    console.log(req.body);
    User.updateOne({_id:req.body.id}, 
        {latestLaltitude:req.body.latestLaltitude, 
            latestLongitude: req.body.latestLongitude}).then((brc) =>{
            res.status(200).json(brc);
        },
        err => {
            err && res.status(500).send(err.message);
    });
}

const findByBranchName = (req, res) => {
    console.log(req.params.name);
    Branch.find({name:req.params.name}).then((branch) => {
        res.status(200).json(branch);
    },
    err => {
        err && res.status(500).send(err.message);
    });
};

module.exports = { findAllBranchs, findAllGeoBranchs, findById, removeById, addBranch, updBranchLocation,findByBranchName};