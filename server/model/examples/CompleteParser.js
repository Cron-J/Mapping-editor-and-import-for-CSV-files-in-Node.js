var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    Converter=require("csvtojson").core.Converter;   
var find=require('./server/findFn.js');




            /*Post Method*/
app.post('/upload', function (req, res){
  
  var form = new formidable.IncomingForm();
  var column='';
  var columnValue='';

  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/json'});  
     column=fields.column;
    columnValue=fields.textV;
     res.end(column,columnValue);
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;


    /* Location where we want to copy the uploaded file */
    var new_location = 'uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } 
      else {
        console.log("success!");

          /*Opening File for reading*/
        var csvFileName=new_location+file_name;
        var fileStream=fs.createReadStream(csvFileName);
        var param={};        
        var result = [];
        var csvConverter=new Converter(param);
          //end_parsed will be emitted once parsing finished
        csvConverter.on("end_parsed",function(jsonObj){
        //here is your result json object   
          var parsedObj=find.findfn(result,columnValue);
          // res.end(JSON.stringify(parsedObj));         
          
            // res.end(JSON.stringify(nresult)); 
        });

        //read from file
        /*Transforming data*/
      csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
        var row={};
        for (var key in resultRow) {            
        row[key]= resultRow[key];        
        }result.push(row); 
      });
      /*End*/

      fileStream.pipe(csvConverter);
        /**/
      }
    });

  });
});





              // GET Method
app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  /* Display the file upload form. */
  var form = '<form action="/upload" enctype="multipart/form-data" method="post">'+
  'Default Column:<input name="column" type="text" /><br/><br/>  Tenant Id:<input name="textV" type="text" /> <br/><br/>'+
  '<input name="title" type="text" /> <input multiple="multiple" name="upload" type="file" />  <input type="submit" value="Upload" /></form>';
  res.end(form); 
}); 
app.listen(8080);


