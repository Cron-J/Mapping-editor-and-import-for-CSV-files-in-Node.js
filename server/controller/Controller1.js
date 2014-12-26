var Attribute = require('../model/Schema1.js').Schema1; 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Db1');

exports.GetAll = function() {     
    Attribute.find({}, function(err, result) {
        if (!err) {           
             return result;           
        } else {
            reply(err); 
        }
    });
};