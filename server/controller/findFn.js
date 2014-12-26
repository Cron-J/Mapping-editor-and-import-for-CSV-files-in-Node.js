var fn=require('./RowGroup.js'),
    fn1=require('./priceGroup.js'),
    fn2=require('./specialCharatersGroup.js'),
    fn3=require('./productGroup.js'),
    fn4=require('./attributeGroup.js'),
    fn5=require('./descGroup.js');
    fnsave=require('./controller.js')
    un=require("underscore");
 exports.findfn=function(data,columnValue,attCol){ 
    d={};
    var gtype=findtype(data);  
   switch(gtype){
      case "1": 
        d= fn.sortfn(data,attCol); 
        break;
      case "2":
        d=  fn1.sortfnr(data,attCol);  
        break;

      case "3":
        d= fn2.sortfnc(data,attCol);
        break;

      case "4":
        d=fn3.mapcol(data,attCol);
        break; 

      case "5": 
        d=fn4.fnmtc(data,attCol);
        break; 

      case "6": 
        d=fn5.fnmtE(data,attCol);
        break;
                
      default:
       break;
   }   
  var id= fnsave.save(d,gtype,columnValue,attCol);
  return id;
} 

 findtype=function(data,attCol){
  var type='';
  var value=data[0];keys=[];
  for(j in value){
    key={}; key=j;
    keys.push(key.toLowerCase());
  }
  
  if(isExsits(keys,'command')  && isExsits(keys,'productid') && isExsits(keys,'supplierid') ) 
    type='4';

  else if(isExsits(keys,'productid') && isExsits(keys,'pricefromquantity') && isExsits(keys,'price')) 
    type='2';

  else if(isExsits(keys,'productid') && isExsits(keys,'retail_price') 
    && isExsits(keys,'retail_price_quantity') &&     isExsits(keys,'gross_price') &&
    isExsits(keys,'gross_price_quantity')) type='3';

  else if(isExsits(keys,'productid') && isExsits(keys,'description_de') 
      && isExsits(keys,'description_en')) type='6';

  else if(isExsits(keys,'productid') && attCol!="select") type='5';    
  else type='1';
  return type;
 }
function isExsits(array,key){
  var obj= un.filter(array,  function( s ) { return s.indexOf(key)!=-1;});
  return obj.length>0;
}

