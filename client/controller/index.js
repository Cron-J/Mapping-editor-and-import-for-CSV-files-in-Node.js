var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra');
    var csv = require('csv');
    var mergeSort = require("underscore");
   var alldata = [];
	var agi = null;
var cntr=0;
   app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
   var column='';
  var columnValue='';
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/json'});
    res.write('received upload:\n\n');
     column=fields.column;
    columnValue=fields.textV;
    // res.end(util.inspect({fields: fields, files: files}));
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
      } else {
        console.log("success!")
          /*Opening File for reading*/
        var csvFileName=new_location+file_name;     

    /*Mapping*/
    
   	csv()
	.from(csvFileName)	
	.transform(function(row, index) { 
  var list='';   
    if(agi === null)
    {
        agi = row[0];
    }         
    if(index==0)
    {
    list=row;
    }
     else
   // alldata.push(new Peptide(row));
  // console.log(alldata);
  // alldata.push(row);
  var pp=new Peptide(row);
   console.log(alldata);
	});
 
  var data=new sortdat(alldata);

	var jsonObj=JSON.stringify(data, null, " ");	
  // console.log(jsonObj);
    // fs.writeFile("output.txt", jsonObj);
  //  console.log(JSON.stringify(alldata, null, " "));
   // res.end(JSON.stringify(alldata, null, " "));
    /*END*/
    }
  });
});
});

// Show the upload form	
app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  /* Display the file upload form. */
  var form = '<form action="/upload" enctype="multipart/form-data" method="post">'+
  'Default Column:<input name="column" type="text" /><br/><br/>  Default Value:<input name="textV" type="text" /> <br/><br/>'+
  '<input multiple="multiple" name="upload" type="file" />  <input type="submit" value="Upload" /></form>';
  res.end(form); 
}); 
app.listen(8080);

function Peptide(row,column,columnvalue,list) 
{
   alldata.push({Row:row[0],Row1:row[1],Row2:row[2]});
    return this;
}


function sortdat(alldata)
{ 
  var data=mergeSort.groupBy(alldata,function(num){ return (alldata[0]);});
}
