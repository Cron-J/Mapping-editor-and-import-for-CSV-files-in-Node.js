function Onsubmit(){
    var tntId = document.getElementById('tntId').value;  
    if(tntId!=''){
        document.getElementById('alert').innerHTML="";
        $.ajax({
            url: "http://localhost:8086/GetId",
            dataType:"json",
            data:{ID:tntId},
            success: function (result) {  
            appendId(result);
            }
        });
    }
    else{
        document.getElementById('alert').innerHTML=
                "<font color='red'>Enter your tenant Id<br/></font>";
    }
}
function appendId(valu){
    var op=''; 
    for(j in valu){
        var result=valu[j].csvId;
        op+='<a onclick="return GetGraph('+j+');" id='+j+' style="cursor: pointer;">'+
                result+'</a><br/>';
    }    
    document.getElementById('pnlG').style.display='block';
    document.getElementById('pnlG').innerHTML='Click on CSV ID:<br/>'+op;
}
function GetGraph(j){    
    var ID=document.getElementById(j).innerHTML;
    var parameters = '';
    var type= getParameterByName("type");
    
    $.ajax({
        url: "http://localhost:8086/?Id="+ID,
        dataType:"json",
        success: function (result) {              
            var keys=readKey(result[0].obj);
            if(keys.length>0){
                document.getElementById('alert').innerHTML="";
                document.getElementById('pnlGraph').style.display='block';
                document.getElementById('pnlG').style.display='none';
                document.getElementById('pnlId').style.display='none';
                document.getElementById('pnlGraph').innerHTML=  '<div id="ID">'+ID+'</div><br/>'
                                                        +document.getElementById('pnlGraph').innerHTML;  
                var select = document.getElementsByName("colMapX")[0];   
                var select1 = document.getElementsByName("colMapY")[0];
                select.options.length = 0;
                select1.options.length = 0;  

                for (var i = 0; i<keys.length; i++){           
                        var opt = document.createElement("option");
                        opt.value = keys[i];
                        opt.innerHTML = keys[i];
                        select.appendChild(opt);
                }        
                for (var i = 0; i<keys.length; i++){           
                        var opt1 = document.createElement("option");
                        opt1.value = keys[i];
                        opt1.innerHTML = keys[i];
                        select1.appendChild(opt1);
                } 
            }
            else{
                document.getElementById('alert').innerHTML=
                "<font color='red'>Sorry! data cannot be tansformed for selected CSV Id.<br/></font>";
            }        
        }
    }); 
}


function submit(){
    var data=[];
    var ID=document.getElementById('ID').innerHTML;
    myVar = document.getElementsByName('colMapX')[0].value;  
    myVar1 = document.getElementsByName('colMapY')[0].value;
    fns = document.getElementsByName('fns')[0].value; 
    var type= getParameterByName("type");
    $.ajax({
    url: "http://localhost:8086/?Id="+ID,
    dataType:"json",
    success: function (result) {   
        document.getElementById('pnlGraph').style.display='block';
        document.getElementById('pnlG').style.display='none';
        document.getElementById('pnlId').style.display='none';
        var margin = {top: 30, right: 20, bottom: 30, left: 90},
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        // // Parse the date / time
        // var parseDate = d3.time.format("%d-%b-%y").parse;
        bisectDate = d3.bisector(function(d) { return d[myVar]; });

        // Set the ranges
        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

    // Define the line
        var valueline = d3.svg.line()
            .x(function(d) { return x(d[myVar]); })
            .y(function(d) { return y(d[myVar1]); });
            
    // Adds the svg canvas
        var svg = d3.select("body")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");

        var lineSvg = svg.append("g");
        var focus = svg.append("g") 
            .style("display", "none");

        var res=[];  
        $.each(result[0].obj , function(key , value){ // First Level
            var resli=readData(value,myVar,myVar1);       
            res.push(resli);              
        }); 
        console.log(res);
        //Transformation Functions to X-axis
        if(fns=="mean")
        x.domain([0, d3.mean(res, function(d) { return d[myVar]; })]);
        else if(fns=="median")
        x.domain([0, d3.median(res, function(d) { return d[myVar]; })]);
        else if(fns=="sum")
        x.domain([0, d3.sum(res, function(d) { return d[myVar]; })]);        
        else if(fns=="min")
        x.domain([0, d3.min(res, function(d) { return d[myVar]; })]);
        else if(fns=="max")
        x.domain([0, d3.max(res, function(d) { return d[myVar]; })]);
        else
        x.domain(d3.extent(res, function(d) { return d[myVar]; }));

        y.domain(d3.extent(res, function(d) { return d[myVar1]; }));

        lineSvg.append("path")
            .attr("class", "line")
            .attr("d", valueline(res));
        svg.append("text")      // text label for the x axis
            .attr("x", 265 )
            .attr("y",  240 )
            .style("text-anchor", "middle")
            .text(myVar);
        svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0- margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text(myVar1);

            // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
            // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

            // append the circle at the intersection 
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "blue")
            .attr("r", 4);

            var div = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);

            svg.selectAll("dot")    
            .data(res)         
            .enter().append("circle")                               
                .attr("r", 5)       
                .attr("cx", function(d) { return x(d[myVar]); })       
                .attr("cy", function(d) { return y(d[myVar1]); })     
                .on("mouseover", function(d) {      
                    div.transition()        
                        .duration(200)      
                        .style("opacity", .9);      
                    div .html(d[myVar] + "<br/>"  + d[myVar1])  
                        .style("left", (d3.event.pageX) + "px")     
                        .style("top", (d3.event.pageY - 28) + "px");    
                })                  
                .on("mouseout", function(d) {       
                    div.transition()        
                        .duration(500)      
                        .style("opacity", 0);   
                });




            // append the rectangle to capture mouse
        // svg.append("rect")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .style("fill", "none")
        //     .style("pointer-events", "all")
        //     .on("mouseover", function() { focus.style("display", "block"); })
        //     .on("mouseout", function() { focus.style("display", "none"); })
        //     .on("mousemove", mousemove);

        //     function mousemove() {
        //         var x0 = x.invert(d3.mouse(this)[0]),
        //             i = bisectDate(res, x0, 1),
        //             d0 = res[i - 1],
        //             d1 = res[i],
        //             d = x0 - d0.Price > d1.Price - x0 ? d1 : d0;
        //         focus.select("circle.y")
        //             .attr("transform",
        //                   "translate(" + x(d[myVar]) + "," +
        //                                  y(d[myVar1]) + ")");
        //     }
        /*End*/

        }
    });
    return false;
// Set the dimensions of the canvas / graph
}

function readData(value,myVar,myVar1){
    var resli={};  
    for(var j in value){
        if(j==myVar)       
            resli[j]=value;
        else if(value[j]==myVar)
            resli[myVar]=value["attributeValue"];
        else{
            var objs=value[j];
            for(var k in objs){
                if(k==myVar)
                    resli[k]=objs[k];
                else
                    for(var l in objs[k]) 
                    {
                        var objk=objs[k]
                        if(l==myVar)
                            resli[l]=objk[l];
                    }
            }
        }
    }
    for(var j in value){
        if(j==myVar1)       
                resli[j]=value;
            else if(value[j]==myVar1)
                resli[myVar]=value["attributeValue"];
            else{
                var objs=value[j];
                for(var k in objs){
                    if(k==myVar1)
                        resli[k]=objs[k];
                    else
                        for(var l in objs[k]) 
                        {
                            var objk=objs[k]
                            if(l==myVar1)
                                resli[l]=objk[l];
                        }
                }
            }
    }

    return resli;
}
function readKey(result){
    var keys=[];
    var value= result[0];
    for (var j in value) {
        if(j=='Prices' || j=='attributes' || j=='Product')
       {    
            var val=value[j];          
            for(l in val[0]){    
                var v=val[0][l];           
                if(l!='_id' && l.toLowerCase().indexOf('id')==-1 && v!='' && !isNaN(v)) keys.push(l);                
            }
        }    
        else if(value[j]!=null && value[j]!='' && j!='_id' && value[j].toLowerCase().indexOf('id')==-1 && 
            !isNaN(value[j]))
        {
            keys.push(j);
        }  
    }         
   return keys;
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
