var mergeSort = require("underscore");
 exports.fnmtc=function(data,attCol){
   var val = data[0];
    var sub_key,sub_key1;var matchedcol=relatedColrs(data);
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
   mergeSort.each(items, function(item){      
    var key = "gjkghjk";    
    var value = "gvfjhgjk"; objk={};var parm=[];tot={};objR={};
    var cnt=1;var cnt1=1;
    var val = item;
    for(j in val)
     {
      var sub_keys = j;
      var sub_val = val[j];
      if(sub_val!=unit)
      {
        if(matchedcol.length>0){
          for(var k in matchedcol){
            var vl=matchedcol[k].split(',');
            for(var l=0;l<vl.length;l++){
              obj={};
              if(vl.indexOf(sub_keys)!=-1)
              {     
              if( vl[l]==sub_keys) 
              {   
                obj["attributeId"]=sub_keys,               
                obj["attributeValue"]= sub_val;     
                parm.push(obj);
              }                
              }
              else 
              {
                var objl={};
               objl[sub_keys]=sub_val;
               if(attCol.toLowerCase()==sub_keys.toLowerCase())
                      {
                        var ob={};                        
                        ob["attributeId"]=sub_keys,               
                        ob["attributeValue"]= sub_val;     
                        parm.push(ob);
                      }
               if(sub_keys.toLowerCase()=='productid' && 
                attCol.toLowerCase()!=sub_key.toLowerCase()){ objk["Product"] = objl;}
               if(sub_keys.toLowerCase().indexOf('normalized')!=-1 &&
                 attCol.toLowerCase()!=sub_key.toLowerCase()) 
                {
                   parm.push(objl);
                }
               else objk[sub_keys] = sub_val;
              }
            }
          }
        }
        else{
         var objl={};
               objl[sub_keys]=sub_val;
               if(attCol.toLowerCase()==sub_keys.toLowerCase())
                      {
                        var ob={};                        
                        ob["attributeId"]=j,               
                        ob["attributeValue"]= sub_val;     
                        if(cnt==1) parm.push(ob); cnt++;
                      }
               if(sub_keys.toLowerCase()=='productid' 
                && attCol.toLowerCase()!=sub_keys.toLowerCase()) objk["Product"] = objl; 
               if(sub_keys.toLowerCase().indexOf('normalized')!=-1
                && attCol.toLowerCase()!=sub_keys.toLowerCase()) objk["attributes"] = objl; 
               else objk[sub_keys] = sub_val;
         }
      } 
      else if(sub_keys.toLowerCase().indexOf('normalized')!=-1){ 
          var objl={};
          objl[sub_keys]=sub_val;
        if(cnt1==1)  parm.push(objl);cnt1++;
      }     
    }   
         // parm.push(obj); 
        if(Object.keys(objR).length==0)tot[sub_key]=unit; 
        else 
        {
          for(var lv in objR)
          {tot[lv]=objR[lv]; }
        }  
        tot["attributes"]=parm; 
        
        for(var lc in objk)
        {
          tot[lc]=objk[lc];          
        }
        finalResult.push(tot);
     }); 
  });
return finalResult;
}

function relatedColrs(data,attCol){
  var matchedcol=[];
  var keys=[];
  var val = data[0];
  for(j in val){
    keys.push(j);
  }
  var cols='';
    for(var k=0;k<keys.length;k++)
    {     
      var cls=keys[k];
      var expn=  new RegExp(".*"+attCol+".*", "i");
      if(cls.match(expn)) {cols+=(cols.length==0)?keys[k]:','+keys[k]; }     
    }  
     if(cols.length>0) matchedcol.push(cols); 
  return matchedcol;
}