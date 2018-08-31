//Import libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Creating schema
const applicantSchema = new Schema({
  //_id:
  first_name: { type: String, required: true,  trim: true       },
  Last_name:  { type: String, required: true,  trim: true       },
  email:      { type: String, required: true,  trim: true       },
  phone:      { type: String, required: false                   },
  position:   { type: String, required: true,                   },
  location:   { type: String, required: false                   },
  step:       { type: Number, required: false                   },
  date:       { type: Date,   required: true, default: Date.now }
});
//Exporting
module.exports = mongoose.model('Applicant', applicantSchema);
