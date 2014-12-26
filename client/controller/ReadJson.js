
function createCORSRequest(method, url) {
  var url = 'http://localhost:8080/'
  $.ajax({
    type: "GET",
    timeout: 1000, //in milliseconds
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: 'jsonp',
    ProcessData: true,
    success: function(data){
      alert(data);
    }
    ,
    error: function(error, data){
      console.log(error)
    }
  })

}