const mongoose = require('mongoose');

const bloodDonationSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organization',
    required: true
  },
  bloodGroups: {
    'A+': {
      type: Number,
      default: 0,
      min: 0
    },
    'A-': {
      type: Number,
      default: 0,
      min: 0
    },
    'B+': {
      type: Number,
      default: 0,
      min: 0
    },
    'B-': {
      type: Number,
      default: 0,
      min: 0
    },
    'AB+': {
      type: Number,
      default: 0,
      min: 0
    },
    'AB-': {
      type: Number,
      default: 0,
      min: 0
    },
    'O+': {
      type: Number,
      default: 0,
      min: 0
    },
    'O-': {
      type: Number,
      default: 0,
      min: 0
    }
  },
  totalUnits: {
    type: Number,
    default: 0,
    min: 0
  },
});



const BloodDonationOrgModel = mongoose.model('BloodDonationOrg', bloodDonationSchema);

module.exports = BloodDonationOrgModel;