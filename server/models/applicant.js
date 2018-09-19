//Import libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Creating schema
const applicantSchema = new Schema({
  //_id:
  fName:         { type: String, required: true,  trim: true        },
  lName:         { type: String, required: true,  trim: true        },
  email:         { type: String, required: true,  trim: true        },
  phone:         { type: String, required: true,  trim: true        },
  store:         { type: String, required: true                     },
  position:      { type: String, required: false                    },
  step:          { type: Number, required: false                    },
  interviewTime: { type: String, required: false                   }
});
//Exporting
module.exports = mongoose.model('Applicant', applicantSchema);
