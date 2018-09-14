const express = require('express');
const router = new express.Router();
const applicantsController = require("../controllers/applicantsController");


router.post('/item', (req, res) => {
  console.log(req.body);
  applicantsController.create(req,res)
});
router.get('/item/user/:id', (req,res) => {
  applicantsController.findByUser(req,res);
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
