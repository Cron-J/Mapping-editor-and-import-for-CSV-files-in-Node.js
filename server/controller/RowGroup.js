 var mergeSort = require("underscore");
 exports.sortfn=function(data,attCol)
{
  var val = data[0];
    var sub_key,sub_key1;
    var i=0;
    for(j in val){
       if(i==0)  sub_key = j;
       i++;
     }  
     val=data[1];
     var k=0;
     for(j in val){

       if(k==0)  sub_key1 = j;
       i++;
     }  
    
  var tmp2 = {};
  tmp2 = mergeSort.groupBy(data, function(d){return d[sub_key]; });

var finalResult = [];
mergeSort.each(tmp2, function(items, unit){
  tot={};parm=[];
  // mergeSort.each(t, function(items, currency){   
   mergeSort.each(items, function(item){      
     var key = "gjkghjk";    
    var value = "gvfjhgjk";obj={}; 
     var val = item;
    for(j in val)
     {
      var sub_keys = j;
      var sub_val = val[j];
      if(sub_val!=unit)
      // if(sub_keys.toLowerCase()=='productid'){ var ob={}; ob[sub_keys]=sub_val ;obj["Product"] =ob }
      // else obj[sub_keys] = sub_val;  
      var objl={};
      // objl[sub_keys]=sub_val;
      if(attCol.toLowerCase()==sub_keys)
      {
        var obj={};
        obj["attributeId"]=sub_keys,               
        obj["attributeValue"]= sub_val;     
        parm.push(obj);
      }
      if(sub_keys.toLowerCase()=='productid') obj["Product"] = objl; 
      else if(sub_keys.toLowerCase().indexOf('normalized')!=-1) parm.push(objl); 
      else obj[sub_keys] = sub_val;     
      }   
         parm.push(obj);  
     });
  tot[sub_key]=unit,
  tot["attributes"]=parm;
  finalResult.push(tot);
  });
return finalResult;
}