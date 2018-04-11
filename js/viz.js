var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var rectw = 70;
var colors = ["#00a0b0", "#FF0000", "#76448A", "#283747", "#2874A6", "#F5B041"];  
var rects = [];
var simulation = d3.forceSimulation(rects);
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
var grouplevel = false;
var singledes = d3.select("body").append("div")

var svg = d3.select("#teachersvg").append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .append("g")
    .attr("transform", "translate(100,100)");

d3.tsv("Capstone Data.tsv", function(error, data) {
  console.log(data);
  d3.select("#racecheck").on("change",update);
  d3.select("#gendercheck").on("change",update);

  console.log(WIDTH)
  rects = svg.selectAll(".teacher")
    .data(data)
    .enter().append("image")
    .attr("xlink:href", function(d, i) { return ("img/female" + (i+1) + ".png");})
    .attr("class", "teacher")
    .attr('x', function(d, i) { return (WIDTH / (data.length + 1) * i);})
    .attr('y', function (d, i) {return 60;})
    .attr('width', rectw)
    .attr('height', rectw)
    .attr('text', function(d, i) {return d["Name"];})
    .attr('transform', 'translate(0, 0)')
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleMouseClick)
    .attr("fill", function(d, i) {
      return colors[i];
    })

  update();

  function handleMouseClick(d1, i) {
    div.html("");
    if(d3.select("#racecheck").property("checked") && d3.select("#gendercheck").property("checked")  && !grouplevel){
      counter = 0
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Race'] == d1['Race'] && d['Gender'] == d1['Gender']) {
            w = counter*(rectw+5)
            counter += 1
            return w;
          }
          else {return WIDTH;}
        })
      grouplevel = true;
    } else if(d3.select("#racecheck").property("checked") && !grouplevel){
        counter = 0
        d3.selectAll(".teacher")
          .transition()
          .attr("duration", 1000)
          .attr('x', function(d, i) { 
            if (d['Race'] == d1['Race']) {
              w = counter*(rectw+5)
              counter += 1
              return w;
            }
            else {return WIDTH;}
          })
        grouplevel = true;
    } else if(d3.select("#gendercheck").property("checked")  && !grouplevel){
      counter = 0
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Gender'] == d1['Gender']) {
            w = counter*(rectw+5)
            counter += 1
            return w;
          }
          else {return WIDTH;}
        })
      grouplevel = true;
    } else if(d3.select("#agecheck").property("checked")  && !grouplevel){
      console.log("TODO")
    } else {
      grouplevel = false;
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Name'] == d1['Name']) {return 0;}
          else {return WIDTH;}
        })
      div.transition()
        .duration(200)
        .style("opacity", 1);
      div.html("<h3>Name: " + d1.Name + 
               "</h3><br/><h4>Age: " + d1.Age + 
               "</h4><h4>Race: " + d1.Race + 
               "<h4/><h4>Gender: " + d1.Gender + 
               "</h4><h4>School Type Attended: " + d1["School Type Attended"] + 
               "</h4><h4>Current Job in Education: " + d1["Current Job in Education"] +  
               "</h4><h4>Past Jobs in Education: " + d1["Past Jobs in Education"] + 
               "</h4><h4>3 Favorite Books" + d1["3 Favorite Books"])  
        .style("left", WIDTH/3 + "px")   
        .style("top", (d3.event.pageY - 100) + "px"); 
    }
  }

  function handleMouseOver(d, i) {
    var opacity = 0.2
    if(d3.select("#racecheck").property("checked") && d3.select("#gendercheck").property("checked")  && !grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Race == o.Race && d.Gender == o.Gender) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#racecheck").property("checked")  && !grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Race == o.Race) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#gendercheck").property("checked")  && !grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Gender == o.Gender) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#agecheck").property("checked")  && !grouplevel){
      console.log("TODO")
    } else {   
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Name == o.Name) ? 1 : opacity;
          return thisOpacity;
      })
    }
  }

  function handleMouseOut(d, i) { 
    d3.selectAll(".teacher")
    .attr("opacity", 1)
  }

  function update(){
    div.html("");
    //TODO transitions http://bl.ocks.org/cartoda/035f893cd5fc86bb955f
    if(d3.select("#racecheck").property("checked") && d3.select("#gendercheck").property("checked")){
      wmcount = 0;
      bmcount = 0;
      fmcount = 0;
      wfcount = 0;
      bfcount = 0;
      ffcount = 0;
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
      .attr("x", function(d) {
        if (d["Race"] == "White" && d["Gender"] == "Male") {
          w = wmcount*(rectw+5);
          wmcount += 1;
          return w;}
        if (d["Race"] == "Black" && d["Gender"] == "Male") {
          w = WIDTH/8 + bmcount*(rectw+5);
          bmcount += 1;
          return w;}
        if (d["Race"] == "Filipino" && d["Gender"] == "Male") {
          w = WIDTH/5 + fmcount*(rectw+5);
          fmcount += 1;
          return w;}
        if (d["Race"] == "White" && d["Gender"] == "Female") {
          w = WIDTH/4 + wfcount*(rectw+5);
          wfcount += 1;
          return w;}
        if (d["Race"] == "Black" && d["Gender"] == "Female") {
          w = WIDTH/3 + bfcount*(rectw+5);
          bfcount += 1;
          return w;}
        if (d["Race"] == "Filipino" && d["Gender"] == "Female") {
          w = WIDTH/2+ ffcount*(rectw+5);
          ffcount += 1;
          return w;}
      });
    }else if(d3.select("#racecheck").property("checked")){
      wcount = 0;
      bcount = 0;
      fcount = 0;

      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 1000)
      .attr("x", function(d) {
        if (d["Race"] == "White") {
          w = wcount*(rectw+5);
          wcount += 1;
          return w;}
        if (d["Race"] == "Black") {
          w = WIDTH/3 + bcount*(rectw+5);
          bcount += 1;
          return w;}
        if (d["Race"] == "Filipino") {
          w = WIDTH/1.5 + fcount*(rectw+5);
          fcount += 1;
          return w;}
      });
    } else if(d3.select("#gendercheck").property("checked")){
      mcount = 0;
      fcount = 0;

      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("x", function(d) {
          if (d["Gender"] == "Male") {
            w = mcount*(rectw+5);
            mcount += 1;
            return w;}
          if (d["Gender"] == "Female") {
            w = WIDTH/2 + fcount*(rectw+5);
            fcount += 1;
            return w;}
        })

    } else if(d3.select("#agecheck").property("checked")){
      console.log("TODO");

    } else {
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { return (WIDTH / (data.length + 1) * i);})
    }
  }
});








