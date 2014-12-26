var Converter=require("csvtojson").core.Converter;
    find=require('./findFn.js'),
    trnsf=require('./Transform.js'); 
exports.converter=function(fileStream,fn,mapCol,columnValue,attCol,res){
  var param={};        
  var result = [];var Id='';
  var csvConverter=new Converter(param);         
    //end_parsed will be emitted once parsing finished
  csvConverter.on("end_parsed",function(jsonObj){
    var id=find.findfn(result,columnValue,attCol);
     res.end('Your CSV Id: '+id.toString());
  });
          //read from file
          /*Transforming input data*/
  csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
    var row={};
    for (var key in resultRow) { 
      if(fn!='Select' && mapCol!='Select' && mapCol==key)   
      row["normalized"+key]=trnsf.fnTransform(resultRow[key],fn);                   
      else row[key]= resultRow[key];        
    }
    result.push(row); 
  });
        /*End*/
  fileStream.pipe(csvConverter);
}
 
      