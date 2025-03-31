const mongoose = require('mongoose');

const bloodStockSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organization',
    required: true
  },
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
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Index for faster querying by organization
bloodStockSchema.index({ organization: 1 });

// Static method to update blood stock
bloodStockSchema.statics.updateStock = async function(organizationId, bloodType, units, action) {
    // Validate action
    if (!['add', 'remove'].includes(action)) {
      throw new Error('Invalid action. Must be either "add" or "remove"');
    }
  
    // Calculate the value to increment by
    const incrementValue = action === 'add' ? units : -units;
  
    const updatedStock = await this.findOneAndUpdate(
      { organization: organizationId },
      { 
        $inc: { [bloodType]: incrementValue },
        $set: { updatedAt: new Date() }
      },
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!updatedStock) {
      throw new Error('Blood stock not found for this organization');
    }
  
    // Additional validation to prevent negative stock
    if (updatedStock[bloodType] < 0) {
      // Revert the change
      await this.findOneAndUpdate(
        { organization: organizationId },
        { 
          $inc: { [bloodType]: -incrementValue }, // Revert the change
          $set: { updatedAt: new Date() }
        }
      );
      throw new Error(`Cannot remove ${units} units. Only ${updatedStock[bloodType] + units} units available.`);
    }
    
    return updatedStock;
  };

const BloodStockModel = mongoose.model('BloodStock', bloodStockSchema);

module.exports = BloodStockModel;