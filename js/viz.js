var WIDTH = screen.width - 150
var HEIGHT = screen.width
var rectw = 70;
var colors = ["#00a0b0", "#FF0000", "#76448A", "#283747", "#2874A6", "#F5B041"];  
var rects = [];
var r = 150
var simulation = d3.forceSimulation(rects);
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
var grouplevel = false;
var singledes = d3.select("body").append("div")
var screenWidth = window.innerWidth;

    var margin = {left: 20, top: 20, right: 20, bottom: 20},
      width = Math.min(screenWidth, 500) - margin.left - margin.right,
      height = Math.min(screenWidth, 500) - margin.top - margin.bottom;

var svg = d3.select("#teachersvg").append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .append("g");

d3.tsv("Capstone Data.tsv", function(error, data) {
  d3.select("#racecheck").on("change",update);
  d3.select("#gendercheck").on("change",update);
  
  rects = svg.selectAll(".teacher")
    .data(data)
    .enter().append("image")
    .attr("xlink:href", function(d, i) { return ("img/female" + (i+1) + ".png");})
    .attr("class", "teacher")
    .attr('x', function (d, i) { return (WIDTH / (data.length + 1) * i);})
    .attr('y', function (d, i) {return 60;})
    .attr('width', rectw)
    .attr('height', rectw)
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
          if (d['Name'] == d1['Name']) {return WIDTH/2 - rectw/2 - 100;}
          else {return WIDTH;}
        })
        .attr('y', r + .5*r - rectw)
        handleOneView(d1, r)
        makeQuestionText(d1)
    }
  }

  function makeQuestionText(d) {
    svg.select("rect.teachrect")
      .remove()
    var w = 300
    var h = 300
    var questiontext = "Click on a Question to show the teacher's response!"

    bar = d3.select("g")
      .attr("transform", function(d, i) { return "translate(0,0)"; });

    bar.append("rect")
        .attr("class", "teachrect")
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "gray")
        .attr("stroke", "black")
        .attr("stroke-width", .5)
        .attr("opacity", .2)
        .attr("y", .5*r)
        .attr("x", WIDTH - w);

    bar.append("text")
        .attr("class", "teacherdata")
        .attr("x", WIDTH - w + 10)
        .attr("y", .5*r + 20)
        .attr("dy", ".35em")
        .text(questiontext)
        .call(wrap, w - 10);

    bar.append("text")
        .attr("class", "name")
        .attr("x", WIDTH/2)
        .attr("y", r + .65*r)
        .style("text-anchor", "middle")
        .text(d.Name)
    bar.append("text")
        .attr("class", "race")
        .attr("x", WIDTH/2)
        .attr("y", r + .65*r + 20)
        .style("text-anchor", "middle")
        .text(d.Race)
    bar.append("text")
        .attr("class", "gender")
        .attr("x", WIDTH/2)
        .attr("y", r + .65*r + 40)
        .style("text-anchor", "middle")
        .text(d.Gender)
    bar.append("text")
        .attr("class", "age")
        .attr("x", WIDTH/2)
        .attr("y", r + .65*r + 60)
        .style("text-anchor", "middle")
        .text(d.Age)

  }

  function handleOneView(d, r) {
    var svg = d3.select("g")
       .append("g").attr("class", "wrapper")
      .attr("transform", "translate(" + (WIDTH/2) + "," + (r + .5*r) + ")");

    ////////////////////////////////////////////////////////////// 
    ///////////////////// Data &  Scales ///////////////////////// 
    ////////////////////////////////////////////////////////////// 

    //Some random data
    var donutData = [
      {name: "Q1",  value: 15, data: d['School Type Attended'], question: "School Type Attended"},
      {name: "Q2",    value: 15, data: d['Current Job in Education'], question: 'Current Job in Education'},
      {name: "Q3",   value: 15, data: d['Past Jobs in Education'], question: 'Past Jobs in Education'},
      {name: "Q4",   value: 15, data: d['3 Favorite Books '], question: '3 Favorite Books'},
      {name: "Q5",  value: 15, data: d['Makeup of population, how does identity'], question: 'Makeup of population, how does identity'},
      {name: "Q6",  value: 15, data: d['Racial identity influence'], question: 'Racial identity influence'},
      {name: "Q7", value: 15, data: d['misbehaved meaning'], question: 'misbehaved meaning'},
      {name: "Q8",   value: 15, data: d['classroom setup'], question: 'classroom setup'},
      {name: "Q9", value: 15, data: d['cultural competency'], question: 'cultural competency'},
      {name: "Q10",   value: 15, data: d['proficiency of CC'], question: 'proficiency of CC'}
    ];

    //Create an arc function   
    var arc = d3.arc()
      .innerRadius(r) 
      .outerRadius(r + 10);

    //Turn the pie chart 90 degrees counter clockwise, so it starts at the left 
    var pie = d3.pie()
      .startAngle(-90 * Math.PI/180)
      .endAngle(-90 * Math.PI/180 + 2*Math.PI)
      .value(function(d) { return d.value; })
      .padAngle(.3)
      .sort(null);
     
    ////////////////////////////////////////////////////////////// 
    //////////////////// Create Donut Chart ////////////////////// 
    ////////////////////////////////////////////////////////////// 

    //Create the donut slices and also the invisible arcs for the text 
    svg.selectAll(".donutArcs")
      .data(pie(donutData))
      .enter().append("path")
      .attr("class", "donutArcs")
      .on("click", handleQuestionClick)
      .on("mouseover", handleQuestionMouseOver)
      .on("mouseout", handleQuestionMouseOut)
      .attr("d", arc)
      .style("fill", function(d,i) {
        if(i === 7) return "#CCCCCC"; //Other
        else return colorScale(i); 
      })
    .each(function(d,i) {
      //Search pattern for everything between the start and the first capital L
      var firstArcSection = /(^.+?)L/;  

      //Grab everything up to the first Line statement
      var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
      //Replace all the comma's so that IE can handle it
      newArc = newArc.replace(/,/g , " ");
      
      //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
      //flip the end and start position
      if (d.endAngle > 90 * Math.PI/180) {
        var startLoc  = /M(.*?)A/,    //Everything between the first capital M and first capital A
          middleLoc   = /A(.*?)0 0 1/,  //Everything between the first capital A and 0 0 1
          endLoc    = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
        //Flip the direction of the arc by switching the start en end point (and sweep flag)
        //of those elements that are below the horizontal line
        var newStart = endLoc.exec( newArc )[1];
        var newEnd = startLoc.exec( newArc )[1];
        var middleSec = middleLoc.exec( newArc )[1];
        
        //Build up the new arc notation, set the sweep-flag to 0
        newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
      }//if
      
      //Create a new invisible arc that the text can flow along
      svg.append("path")
        .attr("class", "hiddenDonutArcs")
        .attr("id", "donutArc"+i)
        .attr("d", newArc)
        .style("fill", "none");
    });
      
    //Append the label names on the outside
    svg.selectAll(".donutText")
      .data(pie(donutData))
       .enter().append("text")
      .attr("class", "donutText")
      //Move the labels below the arcs for those slices with an end angle greater than 90 degrees
      .attr("dy", function(d,i) { return (d.endAngle > 90 * Math.PI/180 ? 18 : -11); })
       .append("textPath")
      .attr("startOffset","50%")
      .style("text-anchor","middle")
      .attr("xlink:href",function(d,i){return "#donutArc"+i;})
      .text(function(d){return d.data.name;});

  }

  function handleQuestionClick(d, i) {
    questiontext = d.data.data;
    question = d.data.question;
    svg.select("text.teacherdata")
      .text(question + ':\n' + questiontext)
      .call(wrap, 290);
    svg.select("rect.teachrect")
      .style("fill", colorScale(i));
  }

  function handleQuestionMouseOver(d, i) {
    var opacity = 0.2
    d3.selectAll(".donutArcs")
      .attr("opacity", function(o) {
          thisOpacity = (d.data.name == o.data.name) ? 1 : opacity;
          return thisOpacity;
    })
  }

  function handleQuestionMouseOut(d, i) {
    d3.selectAll(".donutArcs")
    .attr("opacity", 1)
  }

  function handleMouseOver(d, i) {
    var opacity = 0.2
    displaytext = "";
    if(d3.select("#racecheck").property("checked") && d3.select("#gendercheck").property("checked")  && !grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Race == o.Race && d.Gender == o.Gender) ? 1 : opacity;
          return thisOpacity;
      })
      displaytext = d.Race + " & " + d.Gender;
    } else if(d3.select("#racecheck").property("checked")  && !grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Race == o.Race) ? 1 : opacity;
          return thisOpacity;
      })
      displaytext = d.Race;
    } else if(d3.select("#gendercheck").property("checked")  && !grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Gender == o.Gender) ? 1 : opacity;
          return thisOpacity;
      })
      displaytext = d.Gender;
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
    console.log(WIDTH)
    d3.selectAll(".donutArcs")
    .remove()
    d3.selectAll(".donutText")
    .remove()
    svg.select("rect.teachrect")
      .remove()
    svg.select("text.teacherdata")
      .remove()
    svg.select("text.name")
      .remove()
    svg.select("text.gender")
      .remove()
    svg.select("text.race")
      .remove()
    svg.select("text.age")
      .remove()
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
        .attr("transform", "translate(100,0)")
      .attr('y', r + .5*r - rectw)
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
      .attr('y', r + .5*r - rectw)
      .attr("transform", "translate(100,0)")
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
        .attr("transform", "translate(100,0)")
        .attr('y', r + .5*r - rectw)
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
      console.log("here")
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("transform", "translate(100,0)")
        .attr('y', r + .5*r - rectw)
        .attr('x', function(d, i) { return (WIDTH / (data.length + 1) * i);})
    }
  }
});

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

//Create a color scale
var colorScale = d3.scaleLinear()
   .domain([1,3.5,6])
   .range(["#2c7bb6", "#ffffbf", "#d7191c"])
   .interpolate(d3.interpolateHcl);







