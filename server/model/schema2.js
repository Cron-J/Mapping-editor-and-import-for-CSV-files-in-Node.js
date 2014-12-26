var mongoose = require('mongoose'),
    Schema = mongoose.Schema;   


var Schema2 = new Schema({    
  dataF:[{
  ActionCode: { type: String },
  Prices: { PriceFromQuantity: { type: Number}, Price:{type: Number} },
  Product:{ProductId:{type:String}},
  attributes:Schema.Types.Mixed
  /** information about creation and updation such as createdBy, updatedBy, createdOn, updatedOn*/  
  }]
});

var attribute2 = mongoose.model('attribute2', Schema2);

/** export schema */
module.exports = {
    Schema2: attribute2
};