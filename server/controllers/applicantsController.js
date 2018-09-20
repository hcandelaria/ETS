const db = require("../models");
const mongoose = require('mongoose');

// Defining methods for the ApplicantsController
module.exports = {
  findAll: function(req, res) {
    db.Applicant
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByInterviewerId: function(req,res){
    db.Applicant
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Applicant
      .findById(req.params.id)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findByStore: function(req, res) {
    db.Applicant
      .find({store: req.params.storeId})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    db.Applicant
      .find({
        'user_id': mongoose.Types.ObjectId(req.params.id)
      })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Applicant
      .create(req.body)
      .then(dbApplicant => {
        res.json(dbApplicant)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log('In applicantscontroller.js')
    console.log(req.params.id);
    console.log(req.body);
    db.Applicant
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  sellApplicant: function(req,res){
    applicantUpdateSoldApplicant(req.body, req.params.id)
      .then(dbApplicant => res.json(dbApplicant))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Applicant
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
