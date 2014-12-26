var mongoose = require('mongoose'),
    Schema = mongoose.Schema;   

/**
  * @module  Attribute
  * @description contain the details of Attribute  
*/

var Schema5 = new Schema({  

  dataA:[{
        Product :{ProductId: { type: String }},
        // attributes: [{ attributeId: { type: String}, attributeValue:{type: String} }]
        attributes: [Schema.Types.Mixed]
        }]
});

var attribute5= mongoose.model('attribute5', Schema5);
module.exports = {
    Schema5: attribute5
};