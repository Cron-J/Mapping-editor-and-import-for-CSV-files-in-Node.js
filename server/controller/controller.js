var product=require('../model/ProductSchema.js').productSchema;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Db1');

exports.GetAll = function() {     
    Attribute.find({}, function(err, attribute) {
        if (!err) {
             return attribute;           
        } else {
            return err; // 500 error
        }
    });
};
exports.save = function(data,gtype,columnValue){
  var Product=new product;
  Product.obj=data;   
  Product.TenantId=columnValue; 
  Product.save(function(err, result) {
  if (!err) {
     // console.log(result._id);
  } 
  else {
    reply(err); // HTTP 403
  }
  });
  var id=Product.csvId
 return id;
}
