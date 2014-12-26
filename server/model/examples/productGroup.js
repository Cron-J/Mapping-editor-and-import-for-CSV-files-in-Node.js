var mergeSort = require("underscore");

exports.mapcol = function(data){   
  var key = "";    result=[];
  var value = ""; 
  data.forEach(function(element,index,datas) {        
      var value = datas[index];     var obj = {};   var arr = {}; 
      for(j in value)
      {
      key = j.toLowerCase(); 
      var val=value[j];         
      if(key=='command'){
              
        obj[j] =(val.toLowerCase()=='a' || val.toLowerCase()=='i')?'add': (val.toLowerCase()=='u' || val.toLowerCase()=='c')?'Update': (val.toLowerCase()=='d')?'Delete':'AddChange';       
      }
      else if(key=='productid')
      {
        arr[j]=val;
      }
      else if(key=='supplierid')
      {
        keyc='Product';  
        arr[j]=val;
        obj[keyc]=arr;       
      }   
     result.push(obj);
    }   
  });  
 return result;
}