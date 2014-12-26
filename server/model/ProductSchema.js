var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    shortId = require('shortid');
var schema=new Schema({		
	TenantId:{type:String},
	csvId: {type:String,default: shortId.generate},
    obj:[{    
    	Product:{ProductId: { type: String, trim: true},

	    SupplierId: { type: String, trim: true }},

	    Command: String,

	    Prices: [{ price: { type: Number}, pricetype:{type: String},fromQuantity:{type: Number} }],

	    attributes: [Schema.Types.Mixed]

	}]});
var product = mongoose.model('product', schema);
module.exports = {
    productSchema: product
};