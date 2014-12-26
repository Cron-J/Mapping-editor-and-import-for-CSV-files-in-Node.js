var mergeSort = require("underscore");

exports.sortfnc=function (data)
{
    var val = data[0];
    var sub_key,sub_key1;var matchedcol=matchcolumnc(data);
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
  var parm=[];tot={};
   mergeSort.each(items, function(item){      
     var key = "gjkghjk";    
    var value = "gvfjhgjk"; objk=[];
     var val = item;obj={};            
        if(matchedcol!=[]){
            for(var k in matchedcol){  
            var vl=matchedcol[k].split(',');
            for(var l=1;l<vl.length;l++){
            for(j in val)
            {
             var sub_keys = j;
             var sub_val = val[j];                         
            if(sub_val!=unit)
            {             
            if(vl[l]==sub_keys) 
            {                
              objk.push({
               price: sub_val, 
               type:sub_keys.split('_')[0],
               qty: val[vl[l-1]]
             });
              if(l==vl.length-1)
              { obj[sub_keys.split('_')[1]]=objk;}
            }
            else{
            obj[sub_keys] = sub_val; 
            }               
            }                   
          } 
        }       
      }      
      }   
        parm.push(obj);  
     });
  tot[sub_key]=unit,
  tot["attributes"]=parm;
  finalResult.push(tot);
  });
return finalResult;
}

matchcolumnc=function (data)
{ 
  var matchedcol=[];
  var keys=[];objk=[];
  var val = data[0];
  for(j in val){
    keys.push(j);
  }
  for(var i in keys){
    var cols=''; 
        for(var k=0;k<keys.length;k++)
        { 
         if(i!=k){
        var cls=keys[i];
        var expn=  new RegExp(".*"+keys[k]+".*", "i");
        if(cls.match(expn) && cols.indexOf(keys[k])==-1) {
          if(cols.length==0)
          cols+= keys[i]+','+keys[k];
          else cols+=','+keys[k];              
         }
       }
      var assn=true;
    for(f in matchedcol){
      var spn=(matchedcol[f].length>0)?matchedcol[f].split(','):'';      
      for(n in spn) {if (keys[i]==spn[n] || keys[k]==spn[n]) {assn=false;break;}}
    }
      if(k==keys.length-1 && cols.length>0 && assn==true){matchedcol[cols.split(',')[0]]=cols}
     } 
  } 
  return matchedcol;  
}