var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util'),
    multer  = require('multer'),
    copy   = require('./server/controller/copyFile.js');

            /*Post Method*/
app.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();
    var column='';
    var columnValue='';
    var mapCol='';var fn=''; var type='';var attCol='';
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/json'});  
      column=fields.column;
      columnValue=fields.textV;
      mapCol=fields.mapCol;
      fn=fields.mapFn;
      attCol=fields.attCol;
    });

    form.on('end', function(fields, files) {
      /* Temporary location of our uploaded file */
      var temp_path = this.openedFiles[0].path;
      /* The file name of the uploaded file */
      var file_name = this.openedFiles[0].name;
      /* Location where we want to copy the uploaded file */
      var new_location = 'uploads/';
      type=copy.copyData(temp_path,new_location,file_name,fn,mapCol,columnValue,attCol,res);
    });
});




      // GET Method
app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  /* Display the file upload form. */
  var form = '<form action="/upload" enctype="multipart/form-data" method="post" >'+
  'Default Column:<input name="column" type="text" /><br/><br/>  Tenant Id:<input name="textV" type="text" /> <br/><br/>'+
  'Map Column to attribute<select name="attCol"><option value="Select">Select</option></select><br/><br/>'+
  'Column:<select name="mapCol">'+
  '<option value="Select">Select</option> <option value="ProductId">ProductId</option>'+
  '<option value="Price">Price</option></select>'+
  '&nbsp;&nbsp;Function:<select name="mapFn">  '+
  '<option value="Select">Select</option>'+ 
  '<option value="r">Remove space</option>'+ '<option value="l">To Lower Case</option>'+
  '<option value="u">To Upper Case</option>'+ '<option value="a">Append</option>'+
  '<option value="fn">First</option>'+ '<option value="ln">Last</option>'+
  '<option value="rd">Remove Delimiter</option>'+
  '</select>'+
  ' <input multiple="multiple" name="upload" type="file" id="fup" onchange="startRead()" />'+
  '<input type="submit" value="Submit" />\n'+
  '<script type="text/javascript">\n'+
  'function startRead() {\n'+
    'var file = document.getElementById("fup").files[0];\n'+
    'if (file) {\n'+        
          'getData(file);\n'+           
    '}\n'+
  '}\n'+
  'function getData(readFile) {\n'+
    'var reader = new FileReader();\n'+
    'reader.readAsText(readFile);\n'+
    'reader.onload =processData;\n'+
  '}\n'+
  'function processData(allText) {\n'+
    'var result=allText.srcElement.result;\n'+
    'var allTextLines = result.split('+/\r\n|\n/+');\n'+
    'var headers = allTextLines[0].split(",");\n'+
    'var select = document.getElementsByName("mapCol")[0];\n'+ 
    'var select1 = document.getElementsByName("attCol")[0];\n'+    
    'select.options.length = 0;\n'+
    'select1.options.length = 0;\n'+
    'var sel=selOption();\n'+
    'select.appendChild(sel);\n'+
    'var sel1=selOption();\n'+
    'select1.appendChild(sel1);\n'+
    'for (var i = 0; i<headers.length; i++){\n'+
      'var opt = document.createElement("option");\n'+
      'opt.value = headers[i];\n'+
      'opt.innerHTML = headers[i];\n'+
      'select.appendChild(opt);\n'+      
    '}'+  
    'for (var i = 0; i<headers.length; i++){\n'+
      'var opt1 = document.createElement("option");\n'+
      'opt1.value = headers[i];\n'+
      'opt1.innerHTML = headers[i];\n'+
      'select1.appendChild(opt1);\n'+      
    '}'+         
  '}\n'+
  'function selOption()\n'+
  '{\n'+
    'var opt = document.createElement("option");\n'+
    'opt.value = "Select";\n'+
    'opt.innerHTML = "Select";\n'+
    'return opt;'+
  '}\n'+
  '</script>\n'
  +'</form>\n';
  
  res.end(form); 
}); 
app.listen(8080);


