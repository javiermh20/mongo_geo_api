const BranchController = require('../controller/branchs');
const express = require('express');

const router = express.Router();
router.get('/all', BranchController.findAllBranchs);

router.get('/allGeo', BranchController.findAllGeoBranchs);

router.get('/:id', BranchController.findById);

router.post('/add', BranchController.addBranch);

router.post('/updBranchLocation', BranchController.updBranchLocation);

router.get('/byname/:name', BranchController.findByBranchName);

router.post('/removebyid/:id', BranchController.removeById);

module.exports = router;