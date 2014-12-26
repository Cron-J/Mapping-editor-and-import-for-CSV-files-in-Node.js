var S = require('string');


exports.fnTransform=function(value,funct){
    var val='';
    switch(funct) {
        case 'l':
            val=toLC(value);
            break;
        case 'a' :
            val=append(value,'R');
            break;
        case 'r' :
            val=toCWS(value);
            break;
        case 'fn':
            val=toFOL(value,5);
            break;
        case 'ln' :
            val=toL(value,5);
            break;
        case 'rd' :
            val=toRDelimiter(value);
            break;
    }
    return val;
}



function toLC(data){
    // var row='';
    // var k=data; 
    row= data.toLowerCase();            
    return row;
}
function toUC(data){
    var row='';    
    row= S(data).capitalize();   
    return row;
}
function toCamelize(data){
    var row='';    
    row= S(data).camelize();   
    return row;
}
function toCWS(data){
    var row='';    
    row= S(data).collapseWhitespace();   
    return row;
}
function toRDelimiter(data){
    var row='';    
    row= data.replace(/[^\w\s]/gi, '');
    return row;
}
function MatchArry(data,vl,n){
    var row='';
    var reexpn=new RegExp('^((?:'+vl+'+\\|\\|){' + (n-1) + '})('+vl+'+)\|\|');  
    var op=data.match(reexpn);   
     row= data.replace(/[^\w\s]/gi, '');   
     return row;
}
function toFOL(data,n){
  //Provide Negitive Value of n to get right value
    var row='';    
    row= S(data).left(n);   
    return row;
}
function toL(data,n){
  //Provide Negitive Value of n to get right value
    var row='';    
    row= S(data).right(n);   
    return row;
}
function append(data,vl){
    var s = new Buffer(data);
    var p = new Buffer(vl);
    s = Buffer.concat([s,p]);
    return s;
}
function prepand(data,vl){
    var s = new Buffer(data);
    var p = new Buffer(vl);
    s = Buffer.concat([p,s]);
    return s;
}