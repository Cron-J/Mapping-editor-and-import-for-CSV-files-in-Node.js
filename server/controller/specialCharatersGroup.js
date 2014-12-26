var mergeSort = require("underscore");

exports.sortfnc=function (data,attCol)
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
  
  mergeSort.each(items, function(item){      
    var key = "gjkghjk";    
    var value = "gvfjhgjk"; objk=[];var parm=[];tot={};objR=[];
    var cnt=1;var cnt1=1;
    var val = item;          
        if(matchedcol!=[]){
          for(var k in matchedcol){  
            var vl=matchedcol[k].split(',');
            for(var l=1;l<vl.length;l++){
              obj={}; 
              for(j in val)
              {
                var sub_keys = j.toLowerCase();
                var sub_val = val[j];                         
                if(sub_val!=unit)
                {   
                  if(vl.indexOf(sub_keys)!=-1)
                  {           
                    if(vl[l]==sub_keys && (sub_keys=="retail_price"||sub_keys=="gross_price"))
                    {                
                      obj["price"]=sub_val, 
                      obj["pricetype"]=sub_keys.split('_')[0],
                      obj["fromQuantity"]= val[vl[l-1]];             
                      parm.push(obj);
                    }
                    else if(attCol.toLowerCase()==sub_keys)
                      {
                        var objl={};
                        objl["attributeId"]=sub_keys,               
                        objl["attributeValue"]= sub_val;     
                        objk.push(objl);
                      }
                  }
                  else if(sub_keys!="retail_price" && sub_keys!="gross_price"
                    && sub_keys!="gross_price_quantity" && sub_keys!="retail_price_quantity"){                      
                      var objl={};
                      objl[sub_keys]=sub_val;                                            
                      if(attCol.toLowerCase()==sub_keys)
                      {
                        var ob={};                        
                        ob["attributeId"]=sub_keys,               
                        ob["attributeValue"]= sub_val;     
                        if(cnt==1) objk.push(ob);  cnt++;           
                      }
                      else if(sub_keys.toLowerCase()=='productid') objk["Product"] = objl; 
                      else if(sub_keys.toLowerCase().indexOf('normalized')!=-1) 
                      {
                       if(cnt1==1)
                        objk.push(objl);
                        cnt1++; 
                      }
                      else objk[sub_keys] = sub_val;
                  }               
                } 
                else if(sub_keys.toLowerCase().indexOf('normalized')!=-1){ 
                  var objl={};
                  objl[sub_keys]=sub_val;
                  objR["attributes"] = [objl];
                  objk.push(objl); 
                }
              }              
            }       
          }      
        }                
        if(Object.keys(objR).length==0)tot[sub_key]=unit; 
        tot["Prices"]=parm; 
        tot["attributes"]=objk
        finalResult.push(tot);
     });  
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