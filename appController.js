var express = require("express"),
    app = express();
var Attribute = require('./server/model/ProductSchema.js').productSchema; 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Db1');
var type=require('./server/controller/Gettypeval.js');
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
});

app.get('/', function (req, res){
    res.setHeader('Content-Type', 'application/json');
    var querySt = getquery(req.url);
    var query={'csvId':''+querySt.Id+''};
    Attribute.find(query, function(err, result) {
        if (!err) {        
        res.end(JSON.stringify(result));      
        } else {
        console.log(err); 

        }
    });    
});

app.get('/GetId', function(req, res){ 

    var querySt=getquery(req.url);
    console.log(querySt.ID);
    var query={'TenantId':''+querySt.ID+''};  
    var cols='csvId';
    Attribute.find(query,cols, function(err, result) {
        if (!err) {        
        res.end(JSON.stringify(result));      
        } else {
        console.log(err); 
        }
    });  

});
app.listen(8086);

getquery=function(req){
    var url = require('url');
    var url_parts = url.parse(req, true);
    var querySt = url_parts.query;
    return querySt;
}