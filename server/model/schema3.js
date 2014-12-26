var mongoose = require('mongoose'),
    Schema = mongoose.Schema;   

/**
  * @module  Attribute
  * @description contain the details of Attribute  
*/

var Schema3 = new Schema({  
  dataP:[{ Product:{ProductId: { type: String }},
  Prices: [{ price: { type: String}, pricetype:{type: String},fromQuantity:{type: String} }],
  attributes:Schema.Types.Mixed
  }]
});

var attribute3 = mongoose.model('attribute3', Schema3);

/** export schema */
module.exports = {
    Schema3: attribute3
};