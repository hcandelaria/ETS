const express = require('express');
const router = new express.Router();
const applicantsController = require("../controllers/applicantsController");
const usersController = require("../controllers/usersController");

router.get('/interviews/', (req, res) => {
  applicantsController.findByInterviewerId(req,res);
});
router.post('/interviews/:storeId', (req, res) => {
  applicantsController.create(req,res)
});
router.get('/interviews/:interviewerId', (req,res) => {
  applicantsController.findByInterviewerId(req,res);
});

router.post('/item/:id', (req,res) => {
  applicantsController.sellItem(req,res);
})
router.put('/item/:id', (req,res) => {
  applicantsController.update(req,res);
})
router.delete('/item/:id', (req, res) =>{
  applicantsController.remove(req,res);
})

module.exports = router;
