var WIDTH = screen.width - 150
var HEIGHT = window.innerHeight
var rectw = 70;
var colors = ["#00a0b0", "#FF0000", "#76448A", "#283747", "#2874A6", "#F5B041"];  
var rects = [];
var r = 150;
var cirlcepos = WIDTH/3.5;
var simulation = d3.forceSimulation(rects);
var grouplevel = false;
var singledes = d3.select("body").append("div")
var screenWidth = window.innerWidth;
var margin = {left: 20, top: 20, right: 20, bottom: 20},
  width = Math.min(screenWidth, 500) - margin.left - margin.right,
  height = Math.min(screenWidth, 500) - margin.top - margin.bottom;

var svg = d3.select("#teachersvg").append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT - 175)
  .append("g");

var div = d3.select("#teachersvg").append("div") 
      .attr("class", "simdiff")

var divdiff = d3.select("#teachersvg").append("div") 
      .attr("class", "simdiff")

var teacherdiv = d3.select("#teachersvg").append("div")
      .attr("class", "teacherdiff")

d3.csv("Capstone Data.csv", function(error, data) {
  d3.select("#racecheck").on("change",update);
  d3.select("#gendercheck").on("change",update);
  d3.select("#agecheck").on("change",update);
  rects = svg.selectAll(".teacher")
    .data(data)
    .enter().append("image")
    .attr("xlink:href", function(d, i) { 
      if (d['Gender'] == 'Male') {
        return ("img/male" + (i+1) + ".png");
      } else {
        return ("img/female" + (i+1) + ".png");
      }
    })
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
    //div.html("");
    w = 500
    h = 200
    svg.selectAll(".label").remove()
    svg.selectAll("text.name").remove()
    div.html("").style("height", "0px").style("width", "0px");
    divdiff.html("").style("height", "0px").style("width", "0px");
    teacherdiv.html("").style("height", "0px").style("width", "0px");
    document.getElementById("buttontch").style.bottom = "0px";

    counter = {'rga': 0, 'rg': 0, 'ra': 0, 'ga': 0 ,'r': 0, 'g': 0, 'a': 0};  

    if(d3.select("#gendercheck").property("checked") && d3.select("#agecheck").property("checked") && d3.select("#racecheck").property("checked") && grouplevel){
      simtext = "Similarities:"+"<br>"+ "My Capstone Project seeks to understand the question of: What do teachers think about race? and What do they think they’re supposed to think? So often we hear about schools, teachers, and administrators engaging in “Diversity Trainings” and culturally competent professional development seminars, but how does this really manifest in the classroom? I was curious to find out. With a little bit of persuasiveness and a lot of Midwestern kindness, I was able to get a sample of 6 teachers from an elementary school in Grand Rapids, Michigan. For the privacy of the respondents and the school district I won’t be using any real names.";
      difftext = "Differences:"+"<br>"+ "TESTESTESTESTTEST";
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Gender'] == d1['Gender'] && d['Race'] == d1['Race'] && ((d1['Age'] <= 50 && d['Age'] <= 50) || (d1['Age'] > 50 && d1['Age'] <= 60 && d['Age'] <= 60 && d['Age'] > 50))) {
            w = counter.rga*(rectw+5)
            counter.rga += 1
            return w;
          }
          else {return WIDTH;}
        })
        if (counter.rga == 1) {
          oneteacher(d1);
        } else {
          grouplevel = false;
          makesimdifftext(simtext, difftext, counter.rga)
          makegroupname("Group: " + d1['Race'] + ", " + d1['Gender'] + " and ", true, d1['Age'])
        }
    } else if(d3.select("#gendercheck").property("checked") && d3.select("#agecheck").property("checked")  && grouplevel){
      simtext = "Similarities:"+"<br>"+ "My Capstone Project seeks to understand the question of: What do teachers think about race? and What do they think they’re supposed to think? So often we hear about schools, teachers, and administrators engaging in “Diversity Trainings” and culturally competent professional development seminars, but how does this really manifest in the classroom? I was curious to find out. With a little bit of persuasiveness and a lot of Midwestern kindness, I was able to get a sample of 6 teachers from an elementary school in Grand Rapids, Michigan. For the privacy of the respondents and the school district I won’t be using any real names.";
      difftext = "Differences:"+"<br>"+ "TESTESTESTESTTEST";
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Gender'] == d1['Gender'] && ((d1['Age'] <= 50 && d['Age'] <= 50) || (d1['Age'] > 50 && d1['Age'] <= 60 && d['Age'] <= 60 && d['Age'] > 50))) {
            w = counter.ga*(rectw+5)
            counter.ga += 1
            return w;
          }
          else {return WIDTH;}
        })
        grouplevel = false;
        makesimdifftext(simtext, difftext, counter.ga)
        makegroupname("Group: " + d1['Gender'] + " and ", true, d1['Age'])
    } else if(d3.select("#racecheck").property("checked") && d3.select("#agecheck").property("checked")  && grouplevel){
      simtext = "Similarities:"+"<br>"+ "My Capstone Project seeks to understand the question of: What do teachers think about race? and What do they think they’re supposed to think? So often we hear about schools, teachers, and administrators engaging in “Diversity Trainings” and culturally competent professional development seminars, but how does this really manifest in the classroom? I was curious to find out. With a little bit of persuasiveness and a lot of Midwestern kindness, I was able to get a sample of 6 teachers from an elementary school in Grand Rapids, Michigan. For the privacy of the respondents and the school district I won’t be using any real names.";
      difftext = "Differences:"+"<br>"+ "TESTESTESTESTTEST";
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Race'] == d1['Race'] && ((d1['Age'] <= 50 && d['Age'] <= 50) || (d1['Age'] > 50 && d1['Age'] <= 60 && d['Age'] <= 60 && d['Age'] > 50))) {
            w = counter.ra*(rectw+5)
            counter.ra += 1
            return w;
          }
          else {return WIDTH;}
        })
        if (counter.ra == 1) {
          oneteacher(d1);
        } else {
          grouplevel = false;
          makesimdifftext(simtext, difftext, counter.ra)
          makegroupname("Group: " + d1['Race'] +  " and ", true, d1['Age'])
        }
    } else if(d3.select("#racecheck").property("checked") && d3.select("#gendercheck").property("checked")  && grouplevel){
      simtext = "Similarities:"+"<br>"+ "My Capstone Project seeks to understand the question of: What do teachers think about race? and What do they think they’re supposed to think? So often we hear about schools, teachers, and administrators engaging in “Diversity Trainings” and culturally competent professional development seminars, but how does this really manifest in the classroom? I was curious to find out. With a little bit of persuasiveness and a lot of Midwestern kindness, I was able to get a sample of 6 teachers from an elementary school in Grand Rapids, Michigan. For the privacy of the respondents and the school district I won’t be using any real names.";
      difftext = "Differences:"+"<br>"+ "TESTESTESTESTTEST";
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Race'] == d1['Race'] && d['Gender'] == d1['Gender']) {
            w = counter.rg*(rectw+5)
            counter.rg += 1
            return w;
          }
          else {return WIDTH;}
        })
        if (counter.rg == 1) {
          oneteacher(d1);
        } else {
          grouplevel = false;
          makesimdifftext(simtext, difftext, counter.rg)
          makegroupname("Group: " + d1['Race'] + " and " + d1['Gender'], false, 0)
        }
    } else if(d3.select("#racecheck").property("checked") && grouplevel){
      simtext = "Similarities:"+"<br>"+ "My Capstone Project seeks to understand the question of: What do teachers think about race? and What do they think they’re supposed to think? So often we hear about schools, teachers, and administrators engaging in “Diversity Trainings” and culturally competent professional development seminars, but how does this really manifest in the classroom? I was curious to find out. With a little bit of persuasiveness and a lot of Midwestern kindness, I was able to get a sample of 6 teachers from an elementary school in Grand Rapids, Michigan. For the privacy of the respondents and the school district I won’t be using any real names.";
      difftext = "Differences:"+"<br>"+ "TESTESTESTESTTEST";
        d3.selectAll(".teacher")
          .transition()
          .attr("duration", 1000)
          .attr('x', function(d, i) { 
            if (d['Race'] == d1['Race']) {
              w = counter.r*(rectw+5)
              counter.r += 1
              return w;
            }
            else {return WIDTH;}
          })
        if (counter.r == 1) {
          oneteacher(d1);
        } else {
          grouplevel = false;
          makesimdifftext(simtext, difftext, counter.r)
          makegroupname("Group: " + d1['Race'], false, 0)
        }
    } else if(d3.select("#gendercheck").property("checked")  && grouplevel){
      simtext = "Similarities:"+"<br>"+ "My Capstone Project seeks to understand the question of: What do teachers think about race? and What do they think they’re supposed to think? So often we hear about schools, teachers, and administrators engaging in “Diversity Trainings” and culturally competent professional development seminars, but how does this really manifest in the classroom? I was curious to find out. With a little bit of persuasiveness and a lot of Midwestern kindness, I was able to get a sample of 6 teachers from an elementary school in Grand Rapids, Michigan. For the privacy of the respondents and the school district I won’t be using any real names.";
      difftext = "Differences:"+"<br>"+ "TESTESTESTESTTEST";
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Gender'] == d1['Gender']) {
            w = counter.g*(rectw+5)
            counter.g += 1
            return w;
          }
          else {return WIDTH;}
        })
        grouplevel = false;
        makesimdifftext(simtext, difftext, counter.g)
        makegroupname("Group: " + d1['Gender'], false, 0)
    } else if(d3.select("#agecheck").property("checked")  && grouplevel){
      simtext = "Similarities:"+"<br>"+ "My Capstone Project seeks to understand the question of: What do teachers think about race? and What do they think they’re supposed to think? So often we hear about schools, teachers, and administrators engaging in “Diversity Trainings” and culturally competent professional development seminars, but how does this really manifest in the classroom? I was curious to find out. With a little bit of persuasiveness and a lot of Midwestern kindness, I was able to get a sample of 6 teachers from an elementary school in Grand Rapids, Michigan. For the privacy of the respondents and the school district I won’t be using any real names.";
      difftext = "Differences:"+"<br>"+ "TESTESTESTESTTEST";
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if ((d1['Age'] <= 50 && d['Age'] <= 50) || (d1['Age'] > 50 && d1['Age'] <= 60 && d['Age'] <= 60 && d['Age'] > 50)) {
            w = counter.a*(rectw+5)
            counter.a += 1
            return w;
          }
          else {return WIDTH;}
        })
        grouplevel = false;
        makesimdifftext(simtext, difftext, counter.a)
        makegroupname("Group: ", true, d1['Age'])
    } else {
      oneteacher(d1);
    }
  }

  function oneteacher(d1) {
    d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr('x', function(d, i) { 
          if (d['Name'] == d1['Name']) {return cirlcepos - rectw/2 - 100;}
          else {return WIDTH;}
        })
        .attr('y', r + .5*r - rectw)
        handleOneView(d1, r)
        makeQuestionText(d1)
        grouplevel = false;
  }

  function makegroupname(name, useage, age) {
    groupname = d3.select("g")

    if (useage && age <= 50) {
      name += "40-50"
    } else if (useage) {
      name += "51-60"
    }

   groupname.append("text")
        .attr("class", "name")
        .attr("x", 110)
        .attr("y", r + .65*r)
        .style("text-anchor", "left")
        .text(name)
  }

  function makesimdifftext(simtext, difftext, counter) {
      if (counter >= 6) {
        left = WIDTH/8 + counter*rectw + counter*5;
      } else {
        left = WIDTH/2;
      }
      bottom = .79*HEIGHT

      if (counter == 8)  {
        wid = 400;
      } else {
        wid = 500;
      }

      div.html(simtext)  
      .style("left", left+"px")
      .style("bottom", bottom+"px")
      .style("height", "200px")
      .style("width", wid+"px");

      divdiff.html(difftext)  
      .style("left", left+"px")
      .style("bottom", .95*bottom+"px")
      .style("height", "200px")
      .style("width", wid+"px");

      document.getElementById("buttontch").style.bottom = "400px"

  }


  function makeQuestionText(d) {
    svg.selectAll("rect.teachrect").remove()
    svg.selectAll("text.teacherdata").remove();

    var w = 300
    var h = 300
    var questiontext = "Click on a Question to show the teacher's response!"

    bar = d3.select("g")
      .attr("transform", function(d, i) { return "translate(0,0)"; });

    document.getElementById("buttontch").style.bottom = "285px";
    //TODO make rect scrollable like in group view
    // teacherdiv.html(questiontext)
    // .style("left", WIDTH-1.48*w+"px")
    // .style("bottom", HEIGHT/1.51+"px")
    // .style("height", .95*h+"px")
    // .style("width", 1.15*w+"px")

    teacherdiv.html(questiontext)
    .style("left", WIDTH-1.48*w+"px")
    .style("bottom", HEIGHT/1.51+"px")
    .style("height", .95*h+"px")
    .style("width", 1.15*w+"px")


    // bar.append("rect")
    //     .attr("class", "teachrect")
    //     .attr("width", 1.2*w)
    //     .attr("height", h)
    //     .attr("fill", "gray")
    //     .attr("stroke", "black")
    //     .attr("stroke-width", .5)
    //     .attr("opacity", .2)
    //     .attr("y", .5*r)
    //     .attr("x", WIDTH - 1.5*w);

    // bar.append("text")
    //     .attr("class", "teacherdata")
    //     .attr("x", WIDTH - w + 10)
    //     .attr("y", .5*r + 20)
    //     .attr("dy", ".35em")
    //     .text(questiontext)
    //     .call(wrap, w - 10);

    bar.append("text")
        .attr("class", "name")
        .attr("x", cirlcepos)
        .attr("y", r + .65*r)
        .style("text-anchor", "middle")
        .text(d.Name)
    bar.append("text")
        .attr("class", "race")
        .attr("x", cirlcepos)
        .attr("y", r + .65*r + 20)
        .style("text-anchor", "middle")
        .text(d.Race)
    bar.append("text")
        .attr("class", "gender")
        .attr("x", cirlcepos)
        .attr("y", r + .65*r + 40)
        .style("text-anchor", "middle")
        .text(d.Gender)
    bar.append("text")
        .attr("class", "age")
        .attr("x", cirlcepos)
        .attr("y", r + .65*r + 60)
        .style("text-anchor", "middle")
        .text(d.Age)

  }

  function handleOneView(d, r) {
    var svg = d3.select("g")
       .append("g").attr("class", "wrapper")
      .attr("transform", "translate(" + (cirlcepos) + "," + (r + .5*r) + ")");

    ////////////////////////////////////////////////////////////// 
    ///////////////////// Data &  Scales ///////////////////////// 
    ////////////////////////////////////////////////////////////// 

    //Some random data
    var donutData = [
      {name: "1",  value: 15, data: d['School Type Attended'], question: "School Type Attended"},
      {name: "2",    value: 15, data: d['Current Job in Education'], question: 'Current Job in Education'},
      {name: "3",   value: 15, data: d['Past Jobs in Education'], question: 'Past Jobs in Education'},
      {name: "4",   value: 15, data: d['3 Favorite Books '], question: '3 Favorite Books'},
      {name: "5",  value: 15, data: d['Makeup of population how does identity'], question: 'Makeup of population, how does identity'},
      {name: "6",  value: 15, data: d['Racial identity influence'], question: 'Racial identity influence'},
      {name: "7",  value: 15, data: d['Well-behaved meaning'], question: "Well-behaved meaning"},
      {name: "8", value: 15, data: d['misbehaved meaning'], question: 'misbehaved meaning'},
      {name: "9", value: 15, data: d['disciplinary strategy'], question: 'disciplinary strategy'},
      {name: "10",   value: 15, data: d['classroom setup'], question: 'classroom setup'},
      {name: "11", value: 15, data: d['cultural competency'], question: 'cultural competency'},
      {name: "12",   value: 15, data: d['proficiency of CC'], question: 'proficiency of CC'}
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
      .padAngle(.25)
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
    // svg.select("text.teacherdata")
    //   .text(question + ':\n' + questiontext)
    //   .call(wrap, 290);
    // svg.select("rect.teachrect")
    //   .style("fill", colorScale(i));

    color = colorScale(i)
    color = color.substring(0, color.length - 1);
    color += ', .2)';

    teacherdiv
      .html(question + ": <br>"+ questiontext)
      .style("background", color);

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

    if(d3.select("#gendercheck").property("checked") && d3.select("#agecheck").property("checked")  && d3.select("#racecheck").property("checked")&& grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Gender == o.Gender && d.Race == o.Race && ((d['Age'] <= 50 && o['Age'] <= 50) || (d['Age'] > 50 && d['Age'] <= 60 && o['Age'] <= 60 && o['Age'] > 50))) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#gendercheck").property("checked") && d3.select("#agecheck").property("checked")  && grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Gender == o.Gender && ((d['Age'] <= 50 && o['Age'] <= 50) || (d['Age'] > 50 && d['Age'] <= 60 && o['Age'] <= 60 && o['Age'] > 50))) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#racecheck").property("checked") && d3.select("#agecheck").property("checked")  && grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Race == o.Race && ((d['Age'] <= 50 && o['Age'] <= 50) || (d['Age'] > 50 && d['Age'] <= 60 && o['Age'] <= 60 && o['Age'] > 50))) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#racecheck").property("checked") && d3.select("#gendercheck").property("checked")  && grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Race == o.Race && d.Gender == o.Gender) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#racecheck").property("checked")  && grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Race == o.Race) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#gendercheck").property("checked")  && grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = (d.Gender == o.Gender) ? 1 : opacity;
          return thisOpacity;
      })
    } else if(d3.select("#agecheck").property("checked")  && grouplevel){
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 10)
      .attr("opacity", function(o) {
          thisOpacity = ((d['Age'] <= 50 && o['Age'] <= 50) || (d['Age'] > 50 && d['Age'] <= 60 && o['Age'] <= 60 && o['Age'] > 50)) ? 1 : opacity;
          return thisOpacity;
      })
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
    console.log(HEIGHT)
    d3.selectAll(".donutArcs").remove()
    d3.selectAll(".donutText").remove()
    svg.selectAll("rect.teachrect").remove()
    svg.selectAll("text.teacherdata").remove()
    svg.selectAll("text.name").remove()
    svg.selectAll("text.gender").remove()
    svg.selectAll("text.race").remove()
    svg.selectAll("text.age").remove()
    svg.selectAll(".label").remove()
    div.html("").style("height", "0px").style("width", "0px");
    divdiff.html("").style("height", "0px").style("width", "0px");
    teacherdiv.html("").style("height", "0px").style("width", "0px");
    document.getElementById("buttontch").style.bottom = "0px";

    if(d3.select("#agecheck").property("checked") && d3.select("#gendercheck").property("checked") && d3.select("#racecheck").property("checked")){
      counter = {'40-50, Male and Pacific Islander': 0, '40-50, Male and White': 0, '40-50, White and Female': 0, '51-60, White and Female': 0};
      pos = {'40-50, Male and Pacific Islander': 0, '40-50, Male and White': 0, '40-50, White and Female': 0, '51-60, White and Female': 0};
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("transform", "translate(100,0)")
        .attr('y', r + .5*r - rectw)
        .attr("x", function(d) {
          if (d["Age"] <= 50 && d["Gender"] == "Male" && d['Race'] == "Pacific Islander") {
            w = counter['40-50, Male and Pacific Islander']*(rectw+5);
            counter['40-50, Male and Pacific Islander'] += 1;
            pos['40-50, Male and Pacific Islander'] += w
            return w;}
          if (d["Age"] <= 50 && d["Gender"] == "Male" && d['Race'] == "White") {
            w = WIDTH/6 + counter['40-50, Male and White']*(rectw+5);
            counter['40-50, Male and White'] += 1;
            pos['40-50, Male and White'] += w
            return w;}
          if (d["Age"] <= 50 && d["Gender"] == "Female" && d['Race'] == "White") {
            w = WIDTH/3 + counter['40-50, White and Female']*(rectw+5);
            counter['40-50, White and Female'] += 1;
            pos['40-50, White and Female'] += w
            return w;}
          if (d["Age"] > 50 && d["Age"] <= 60 && d['Gender'] == "Female" && d['Race'] == "White") {
            w = WIDTH/2 + counter['51-60, White and Female']*(rectw+5);
            counter['51-60, White and Female'] += 1;
            pos['51-60, White and Female'] += w
            return w;}
        })
      textlabels(counter, pos)
      grouplevel = true;
    } else if(d3.select("#agecheck").property("checked") && d3.select("#gendercheck").property("checked")){
      counter = {'40-50 and Male': 0, '40-50 and Female': 0, '51-60 and Female': 0};
      pos = {'40-50 and Male': 0, '40-50 and Female': 0, '51-60 and Female': 0};
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("transform", "translate(100,0)")
        .attr('y', r + .5*r - rectw)
        .attr("x", function(d) {
          if (d["Age"] <= 50 && d["Gender"] == "Male") {
            w = counter['40-50 and Male']*(rectw+5);
            counter['40-50 and Male'] += 1;
            pos['40-50 and Male'] += w
            return w;}
          if (d["Age"] <= 50 && d["Gender"] == "Female") {
            w = WIDTH/4 + counter['40-50 and Female']*(rectw+5);
            counter['40-50 and Female'] += 1;
            pos['40-50 and Female'] += w
            return w;}
          if (d["Age"] > 50 && d["Age"] <= 60 && d['Gender'] == "Female") {
            w = WIDTH/2 + counter['51-60 and Female']*(rectw+5);
            counter['51-60 and Female'] += 1;
            pos['51-60 and Female'] += w
            return w;}
        })
      textlabels(counter, pos)
      grouplevel = true;
    } else if(d3.select("#agecheck").property("checked") && d3.select("#racecheck").property("checked")){
      counter = {'40-50 and White': 0, '51-60 and White': 0, '40-50 and Pacific Islander': 0};
      pos = {'40-50 and White': 0, '51-60 and White': 0, '40-50 and Pacific Islander': 0};
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("transform", "translate(100,0)")
        .attr('y', r + .5*r - rectw)
        .attr("x", function(d) {
          if (d["Age"] <= 50 && d["Race"] == "White") {
            w = counter['40-50 and White']*(rectw+5);
            counter['40-50 and White'] += 1;
            pos['40-50 and White'] += w
            return w;}
          if (d["Age"] > 50 && d["Age"] <= 60 && d["Race"] == "White") {
            w = WIDTH/2 + counter['51-60 and White']*(rectw+5);
            counter['51-60 and White'] += 1;
            pos['51-60 and White'] += w
            return w;}
          if (d["Age"] <= 50 && d["Race"] == "Pacific Islander") {
            w = WIDTH/3 + counter['40-50 and Pacific Islander']*(rectw+5);
            counter['40-50 and Pacific Islander'] += 1;
            pos['40-50 and Pacific Islander'] += w
            return w;}
        })
      textlabels(counter, pos)
      grouplevel = true;
    } else if(d3.select("#racecheck").property("checked") && d3.select("#gendercheck").property("checked")){
      counter = {'White and Male': 0, 'Pacific Islander and Male': 0, 'White and Female': 0};
      pos = {'White and Male': 0, 'Pacific Islander and Male': 0, 'White and Female': 0};

      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("transform", "translate(100,0)")
      .attr('y', r + .5*r - rectw)
      .attr("x", function(d) {
        if (d["Race"] == "White" && d["Gender"] == "Male") {
          w = counter['White and Male']*(rectw+5);
          counter['White and Male'] += 1;
          pos['White and Male'] += w;
          return w;}
        if (d["Race"] == "Pacific Islander" && d["Gender"] == "Male") {
          w = WIDTH/1.4 + counter['Pacific Islander and Male']*(rectw+5);
          counter['Pacific Islander and Male'] += 1;
          pos['Pacific Islander and Male'] += w;
          return w;}
        if (d["Race"] == "White" && d["Gender"] == "Female") {
          w = WIDTH/6 + counter['White and Female']*(rectw+5);
          counter['White and Female'] += 1;
          pos['White and Female'] += w;
          return w;}
      });
      textlabels(counter, pos)
      grouplevel = true;
    }else if(d3.select("#racecheck").property("checked")){
      counter = {'White': 0, 'Pacific Islander': 0};
      pos = {'White': 0, 'Pacific Islander': 0}
      d3.selectAll(".teacher")
      .transition()
      .attr("duration", 1000)
      .attr('y', r + .5*r - rectw)
      .attr("transform", "translate(100,0)")
      .attr("x", function(d) {
        if (d["Race"] == "White") {
          w = counter.White*(rectw+5);
          counter.White += 1;
          pos.White += w
          return w;}
        if (d["Race"] == "Pacific Islander") {
          w = WIDTH/1.5 + counter["Pacific Islander"]*(rectw+5);
          counter["Pacific Islander"] += 1;
          pos["Pacific Islander"] += w
          return w;}
      });
      textlabels(counter, pos)
      grouplevel = true;
    } else if(d3.select("#gendercheck").property("checked")){
      counter = {'Male': 0, 'Female': 0};
      pos = {'Male': 0, 'Female': 0}
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("transform", "translate(100,0)")
        .attr('y', r + .5*r - rectw)
        .attr("x", function(d) {
          if (d["Gender"] == "Female") {
            w = WIDTH/3 + counter.Female*(rectw+5);
            counter.Female += 1;
            pos.Female += w
            return w;}
          if (d["Gender"] == "Male") {
            w = counter.Male*(rectw+5);
            counter.Male += 1;
            pos.Male += w
            return w;}
        })
      textlabels(counter, pos)
      grouplevel = true;
    } else if(d3.select("#agecheck").property("checked")){
      counter = {'40-50': 0, '51-60': 0};
      pos = {'40-50': 0, '51-60': 0}

      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("transform", "translate(100,0)")
        .attr('y', r + .5*r - rectw)
        .attr("x", function(d) {
          if (d["Age"] <= 50) {
            w = counter['40-50']*(rectw+5);
            counter['40-50'] += 1;
            pos['40-50'] += w
            return w;}
          if (d["Age"] > 50 && d["Age"] <=60) {
            w = WIDTH/2 + counter['51-60']*(rectw+5);
            counter['51-60'] += 1;
            pos['51-60'] += w
            return w;}
        })
      textlabels(counter, pos)
      grouplevel = true;
    } else {
      grouplevel = false;
      d3.selectAll(".teacher")
        .transition()
        .attr("duration", 1000)
        .attr("transform", "translate(100,0)")
        .attr('y', r + .5*r - rectw)
        .attr('x', function(d, i) { return (WIDTH / (data.length + 1) * i);})
    }
  }
});

function textlabels(counter, pos) {
  desc = d3.select("g")
    .attr("transform", function(d, i) { return "translate(0,0)"; });      

  for (var entry in counter) {
    if (counter[entry] > 0) {
      desc.append("text")
        .attr("class", "label")
        .attr("transform", "translate(100,0)")
        .attr("x", pos[entry]/counter[entry] + rectw/5)
        .attr("y", r + .5*r + rectw/3)
        .style("text-anchor", "left")
        .text(entry)
        .call(wrap, rectw);
    }
  }
}

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

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}






