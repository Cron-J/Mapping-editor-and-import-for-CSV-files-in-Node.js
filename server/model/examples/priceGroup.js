var mergeSort = require("underscore");

exports.sortfnr=function(data)
{
  var val = data[0];
    var sub_key,sub_key1;var matchedcol=relatedColr(data);
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
  // mergeSort.each(t, function(items, currency){   
   mergeSort.each(items, function(item){      
    var key = "gjkghjk";    
    var value = "gvfjhgjk"; objk={};
    var val = item;obj={};
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
            if(vl.indexOf(sub_keys)!=-1)
            {     
            if( vl[l]==sub_keys) 
            {    
              objk[sub_keys]=sub_val;
             if(l==vl.length-1)
             { obj[sub_keys]=objk;}
            }  
            
            }
            else 
            {
              obj[sub_keys] = sub_val;
            }
          }

          }
        }
        else{
        obj[sub_keys] = sub_val; 
         }
      }
      
      }   
        parm.push(obj);  
     });
  tot[sub_key]=unit,
  tot["Prices"]=parm;
  console.log(tot);
  finalResult.push(tot);
  });
// });
return finalResult;
}

function relatedColr(data){
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
      var expn=  new RegExp(".*price.*", "i");
      var expn2=  new RegExp(".*priceFromQuantity.*", "i");
      if(cls.match(expn)) {cols+=(cols.length==0)?cls+',Price':','+keys[k]; }
      if(cls.match(expn2)) {cols+=(cols.length==0)?cls+',priceFromQuantity':','+keys[k]; }
    }
  if(cols.length>0) matchedcol.push(cols); 
  console.log(matchedcol);
  return matchedcol;
}