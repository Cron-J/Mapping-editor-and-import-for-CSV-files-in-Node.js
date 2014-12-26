var mergeSort = require("underscore");

exports.fnmtE =function (data,attCol){
   var val = data[0];
    var sub_key,sub_key1;var matchedcol=relatedColrE(data);
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
      var val = item;var cnt=1;var cnt1=1;
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
                if(vl.indexOf(j)!=-1)
                {                      
                  if(vl[l].toLowerCase()==sub_keys.toLowerCase() &&
                   attCol.toLowerCase()!=sub_keys.toLowerCase()) 
                  {    
                   if(vl[l].toLowerCase()==sub_keys.toLowerCase() && 
                    (sub_keys.toLowerCase()=="description_en"||sub_keys.toLowerCase()=="description_de"))
                      {                
                        obj["attributeId"]=sub_keys.split('_')[0],
                        obj["attributeLanguage"]=sub_keys.split('_')[1],
                        obj["attributeValue"]= sub_val;
                        parm.push(obj);  
                      }
                  }
                  else if(sub_keys.toLowerCase()!="description_en" && sub_keys.toLowerCase()!="description_de"){
                     var objl={};
                     objl[sub_keys]=sub_val;
                     if(attCol.toLowerCase()==sub_keys.toLowerCase())
                     {                      
                      obj["attributeId"]=sub_keys,               
                      obj["attributeValue"]= sub_val;     
                      parm.push(obj);
                     }
                     if(sub_keys.toLowerCase()=='productid' && attCol.toLowerCase()!=sub_keys.toLowerCase()) 
                      parm.push(objl); 
                      if(sub_keys.toLowerCase().indexOf('normalized')!=-1 && 
                        attCol.toLowerCase()!=sub_keys.toLowerCase())  parm.push(objl); 
                     else objk[sub_keys] = sub_val;
                  }                   
                }
                else if(sub_keys!="description_en" && sub_keys!="description_de"){
                  var objl={};
                  objl[sub_keys]=sub_val;
                  if(attCol.toLowerCase()==sub_keys.toLowerCase())
                     {
                      var obj={};
                      obj["attributeId"]=sub_keys,               
                      obj["attributeValue"]= sub_val;     
                      if(cnt==1)parm.push(obj);cnt++;
                     }
                 if(sub_keys.toLowerCase()=='productid' && attCol.toLowerCase()!=sub_keys.toLowerCase())
                  objk["Product"] = objl; 
                 if(sub_keys.toLowerCase().indexOf('normalized')!=-1
                  && attCol.toLowerCase()!=sub_keys.toLowerCase()) 
                  { if(cnt1==1)parm.push(objl);cnt1++;}
                  else objk[sub_keys] = sub_val;
                }  
              }       
            }      
          }
          else if(sub_keys.toLowerCase()!="description_en" && sub_keys.toLowerCase()!="description_de"){
            var objl={};
            objl[sub_keys]=sub_val;
            if(attCol.toLowerCase()==sub_keys.toLowerCase())
            {
              var obj={};
              obj["attributeId"]=sub_keys,               
              obj["attributeValue"]= sub_val;     
              if(cnt==1)parm.push(obj);cnt++;
            }
            if(sub_keys.toLowerCase()=='productid' 
              && attCol.toLowerCase()!=sub_keys.toLowerCase()) 
              objk["Product"] = objl; 
            if(sub_keys.toLowerCase().indexOf('normalized')!=-1 && 
              attCol.toLowerCase()!=sub_keys.toLowerCase())
              { if(cnt1==1)parm.push(objl);cnt1++;}
            else objk[sub_keys] = sub_val;
          }          
        }
        else if(sub_keys.toLowerCase().indexOf('normalized')!=-1 
          && attCol.toLowerCase()!=sub_keys.toLowerCase()){ 
          var objl={};
          objl[sub_keys]=sub_val;
          objR=objl;
           parm.push(objl);
        }
      }     
      if(Object.keys(objR).length==0)tot[sub_key]=unit; 
      tot["attributes"]=parm;
      for(var lc in objk)
      {tot[lc]=objk[lc];}
      finalResult.push(tot);       
    });   
  });
  return finalResult;
}
function relatedColrE(data){
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
      var expn=  new RegExp(".*description_EN.*", "i");
      var expn2=new RegExp(".*description_DE.*", "i");
      if(cls.match(expn)||cls.match(expn2)) {cols+=(cols.length==0)?keys[k]:','+keys[k]; }      
    }
    if(cols.length>0) matchedcol.push(cols);
  return matchedcol;
} 