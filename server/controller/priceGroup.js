var groupfn= require("underscore");
exports.sortfnr=function(data,attCol)
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
       if(k==0)  sub_key1 = j.toLowerCase();
       i++;
     }      
  var tmp2 = {};
  tmp2 = groupfn.groupBy(data, function(d){return d[sub_key]; });

var finalResult = [];
groupfn.each(tmp2, function(items, unit){ 
  /*This is looped into Grouped values*/
   groupfn.each(items, function(item){ 
    objk=[];var parm={};objR=[];var att=[];
    var key = "gjkghjk";    
    var value = "gvfjhgjk"; tot={}; var cnt=1;var cnt1=1;
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
                if(vl.indexOf(sub_keys)!=-1 && attCol.toLowerCase()!=sub_keys)
                {   
                  if( vl[l]==sub_keys) 
                  {    
                    sub_keys=(sub_keys.toLowerCase()=='price')?'price':(sub_keys.toLowerCase()=='pricefromquantity')?'fromQuantity': sub_keys;          
                    parm[sub_keys]=sub_val; 
                  }     
                }
                else 
                {  
                  var objl={};
                  objl[sub_keys]=sub_val;
                  if(attCol.toLowerCase()==sub_keys.toLowerCase())
                  {
                      var obj={};
                      obj["attributeId"]=sub_keys,               
                      obj["attributeValue"]= sub_val;     
                      if(cnt==1) att.push(obj);  cnt++;                
                  }
                  else if(sub_keys.toLowerCase()=='productid') objk["Product"] = objl; 
                  if(sub_keys.toLowerCase().indexOf('normalized')!=-1 &&
                    sub_keys.toLowerCase().indexOf(attCol.toLowerCase())==-1)
                    { if(cnt1==1)att.push(objl); cnt1++; }
                  else objk[sub_keys] = sub_val;
                }

              }

            }
          }
        } 
        else if(sub_keys.toLowerCase().indexOf('normalized')!=-1){ 
          var objl={};
          objl[sub_keys]=sub_val;
          objR["attributes"] = [objl];
          att.push(objl); 
        }  
      } 
      if(Object.keys(objR).length==0)tot[sub_key]=unit; 
     
      tot["attributes"]=att;
      tot["Prices"]=[parm];
      for(var lc in objk)
      {tot[lc]=objk[lc]; }
      finalResult.push(tot);
     });    
  }); 
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
      if(cls.match(expn) || cls.match(expn2)) {cols+=(cols.length==0)?keys[k]:','+keys[k]; }      
    }
  if(cols.length>0 && matchedcol.indexOf(cols)==-1) matchedcol.push(cols); 
  return matchedcol;
}