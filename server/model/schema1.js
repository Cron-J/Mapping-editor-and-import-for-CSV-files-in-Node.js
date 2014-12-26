var mongoose = require('mongoose'),
    Schema = mongoose.Schema; 
var product=require('./ProductSchema.js').productSchema;


var sc = new Schema({
                    obj:[{ Command: String,
	  						Product: 
	  						{
	  						ProductId: { type: String, trim: true },
	    					SupplierId: { type: String, trim: true }
	    					},
	    					attributes:Schema.Types.Mixed
  						}]
                    });

var attribute = mongoose.model('attribute', sc);
/** export schema */
module.exports = {
    Schema1: attribute
};