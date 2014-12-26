var mongoose = require('mongoose'),
    Schema = mongoose.Schema;   

/**
  * @module  Attribute
  * @description contain the details of Attribute  
*/

var Schema4 = new Schema({ 
  dataD:[{
          ActionCode:{type:String},
          Product:{ProductId: { type: String }},
          // attributes: [{ attributeId: { type: String}, attributeLanguage:{type: String},attributeValue:{type: String} }],
          attributes: [Schema.Types.Mixed],
          Color:{type:String}
        }]
});

var attribute4 = mongoose.model('attribute4', Schema4);

/** export schema */
module.exports = {
    Schema4: attribute4
};