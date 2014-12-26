var mergeSort = require("underscore");

exports.mapcol = function(data,attCol){   
  var key = "";    result=[];
  var value = ""; 
  data.forEach(function(element,index,datas) {        
      var value = datas[index]; var obj = {};   var arr = {}; var objk=[];
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
      else
      {    
        var objl={};
        objl[j]=val;
        
        if(attCol.toLowerCase()==key)
        {         
          var objl={};
          objl["attributeId"]=key,               
          objl["attributeValue"]= val;     
          objk.push(objl);
        } 
        if(key.toLowerCase().indexOf('normalized')!=-1 && attCol.toLowerCase()!=key) 
        {    
          var objr={};
          objr[key]=  val;    
           objk.push(objr);         
        } 
        else obj[j] =val;
      }
      obj["attributes"]=objk;
     result.push(obj);
    }   
  }); 
 return result;
}