exports.findtype=function(type){
  var keys={};
  switch(type) {
    case '4':
       keys={'obj.Command':{$ne:null,$exists: true},'obj.Product.ProductId':{$ne:null,$exists: true},'obj.Product.SupplierId':{$ne:null,$exists: true}};     
      break;
    case '2':
      keys={'obj.Product.ProductId':{$ne:null,$exists: true},'obj.Prices.fromQuantity':{$ne:null,$exists: true},'obj.Prices.price':{$ne:null,$exists: true}};
      break;
    case '3':
      keys={'obj.Prices.pricetype':{$ne:null,$exists: true},'obj.Prices.price':{$ne:null,$exists: true},'obj.Prices.fromQuantity':{$ne:null,$exists: true}};
      break;
    case '5':
      keys={'obj.Product.ProductId':{$ne:null,$exists: true},'obj.attributes.attributeId':'Length','obj.attributes.attributeId':'Color'};
      break;
    case '6':
      keys={'obj.Product.ProductId':{$ne:null,$exists: true},'obj.attributes.attributeId':'description'};
      break;
  }
  return keys;
 }
 exports.SelectCol=function(type){
  var cols={};
  switch(type) {
    case '4':
       cols='obj.Command obj.Product.ProductId obj.Product.SupplierId';     
      break;
    case '2':
      cols='obj.Product.ProductId obj.Prices.fromQuantity obj.Prices.price';
      break;
    case '3':
      cols='obj.Prices.pricetype obj.Prices.price obj.Prices.fromQuantity';
      break;
    case '5':
      cols='obj.Product.ProductId obj.attributes.attributeId obj.attributes.attributeValue';
      break;
    case '6':
      cols='obj.Product.ProductId obj.attributes.attributeId attributeLanguage obj.attributes.attributeValue';
      break;
  }
  return cols;
 }
exports.getKeys=function(type){
  var keys={};
  switch(type) {
    case '4':
       keys=['Command','ProductId','SupplierId'];     
      break;
    case '2':
      keys=['ProductId','fromQuantity','price'];
      break;
    case '3':
      keys=['pricetype','price','fromQuantity'];
      break;
    case '5':
      keys=['ProductId','Length','Color'];
      break;
    case '6':
      keys=['ProductId','description'];
      break;
  }
  return keys;
 }