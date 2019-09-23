// D3 Animated Scatter Plot

// Containing box width
var width = parseInt(d3.select("#bar").style("width"));

// Designate height of graph
var height = width - width / 3.9;

// Margin spacing for graph
var margin = 20;

// Space for words
var labelArea = 110;

// Padding for text at bottom and left axes
var tPadBot = 40;
var tPadLeft = 40;

// Create canvas for the graph
var svg = d3
  .select("#bar")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");


// Bottom axes labels
svg.append("g").attr("class", "xText");
// xText selects group
var xText = d3.select(".xText");

// Transform xText to bottom
function xTextRefresh() {
  xText.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - tPadBot) +
      ")"
  );
}
xTextRefresh();

// xText appends four text SVG files with y coordinates
// 1. Gender
xText
  .append("text")
  .attr("y", -40)
  .attr("data-name", "gender")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("Gender (Male/Female)");

// 2. Age
xText
  .append("text")
  .attr("y", -14)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age Range");

// 3. Ethnicity
xText
  .append("text")
  .attr("y", 12)
  .attr("data-name", "ethnicity")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Ethnicity");

// 3. Hair Color
xText
.append("text")
.attr("y", 38)
.attr("data-name", "hair color")
.attr("data-axis", "x")
.attr("class", "aText inactive x")
.text("Hair Color");


// Left Axis

// Specify variables to make transform attributes more readable.
var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

// We add a second label group for axis left of chart.
svg.append("g").attr("class", "yText");

// yText allows us to select group without excess code.
var yText = d3.select(".yText");


// Append text.
// Count
yText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "Frequency of Adjective in Profiles")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Frequency of Adjective in Profiles");


// Import .csv file.
d3.csv("assets/data/data.csv").then(function(data) {
  // Visualize the data
  visualize(data);
});

// Create visualization function
function visualize(theData) {
  
  
  // Local Variables and Functions
  // curX and curY determine what data gets represented in each axis.
  // Designate defaults, which carry same names as their headings in matching .csv data file.
  var curX = "gender: female";
  var curY = "curvy";

  // Empty variables for min and max values of x and y
  var xMin;
  var xMax;
  var yMin;
  var yMax;

  // This function allows us to set up tooltip rules (see d3-tip.js).
  var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
      // x key
      var theX;
      
      // curvy y axis key and value.
      var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
      // If x key is gender
      if (curX === "gender") {
        //  x key and a version of the value formatted to show percentage
        theX = "<div>" + curX + ": " + d[curX] + "%</div>";
      }
      else {
        // Otherwise x key and version of value formatted to include commas after every third digit.
        theX = "<div>" +
          curX +
          ": " +
          parseFloat(d[curX]).toLocaleString("en") +
          "</div>";
      }
      // Display capture
      return theX + theY;
    });
  // Call toolTip function.
  svg.call(toolTip);

  


  // a. change min and max for x
  function xMinMax() {
    // min will grab smallest datum from selected column.
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[curX]) * 0.90;
    });

    // .max will grab largest datum from selected column.
    xMax = d3.max(theData, function(d) {
      return parseFloat(d[curX]) * 1.10;
    });
  }

  // b. change min and max for y
  function yMinMax() {
    // min will grab smallest datum from selected column.
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[curY]) * 0.90;
    });

    // .max will grab largest datum from selected column.
    yMax = d3.max(theData, function(d) {
      return parseFloat(d[curY]) * 1.10;
    });
  }

  // c. change classes and color of label text when clicked.
  function labelChange(axis, clickedText) {
    // Switch the currently active to inactive.
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);

    // Switch the text clicked to active.
    clickedText.classed("inactive", false).classed("active", true);
  }

  // This will add first placement of data and axes to scatter plot.

  // First grab min and max values of x and y.
  xMinMax();
  yMinMax();
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    // Height is inverses due to how d3 calc's y-axis placement
    .range([height - margin - labelArea, margin]);


  // Pass scales into the axis methods to create the axes.
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // Determine x and y tick counts.
  // Saved as function for easy mobile updates.
  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();

  // Append axes in group elements. Includes
  // all numbers, borders, and ticks.
  // Transform attribute specifies where to place axes.
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

 

  // Dynamic attributes

  // Select all axis text and add d3 click event.
  d3.selectAll(".aText").on("click", function() {
    // Save a selection of clicked text, to reference
    var self = d3.select(this);

    // Only run on inactive labels.
    if (self.classed("inactive")) {
      // Label name and axis
      var axis = self.attr("data-axis");
      var name = self.attr("data-name");

      // When x is saved axis:
      if (axis === "x") {
        // Make curX the same as data name.
        curX = name;

        // Change min and max of x-axis
        xMinMax();

        // Update domain of x.
        xScale.domain([xMin, xMax]);

        // Transition when xAxis is updated
        svg.select(".xAxis").transition().duration(300).call(xAxis);

        

        // Change classes of last active label and clicked label
        labelChange(axis, self);
      }
      else {
        // When y is saved axis:
        // Make curY the same as the data name.
        curY = name;

        // Change min and max of y-axis.
        yMinMax();

        // Update the domain of y.
        yScale.domain([yMin, yMax]);

        // Update Y Axis
        svg.select(".yAxis").transition().duration(300).call(yAxis);

        // Change classes of last active label and clicked label
        labelChange(axis, self);
      }
    }
  });

  
  // Mobile Responsive
  // Resize function when window dimensions change
  d3.select(window).on("resize", resize);

  // Specify which parts of chart need size and position changes
  function resize() {
    // Redefine width, height, and leftTextY
    width = parseInt(d3.select("#bar").style("width"));
    height = width - width / 3.9;
    leftTextY = (height + labelArea) / 2 - labelArea;

    // Apply width and height to svg canvas.
    svg.attr("width", width).attr("height", height);

    // Change xScale and yScale ranges
    xScale.range([margin + labelArea, width - margin]);
    yScale.range([height - margin - labelArea, margin]);

    // Update axes and height of the x-axis
    svg
      .select(".xAxis")
      .call(xAxis)
      .attr("transform", "translate(0," + (height - margin - labelArea) + ")");

    svg.select(".yAxis").call(yAxis);

    // Update the ticks on each axis.
    tickCount();

    // Update the labels.
    xTextRefresh();
    yTextRefresh();

    // Update radius of each dot.
    crGet();

    // With axis changed, update location and radius of circles.
    d3
      .selectAll("circle")
      .attr("cy", function(d) {
        return yScale(d[curY]);
      })
      .attr("cx", function(d) {
        return xScale(d[curX]);
      })
      .attr("r", function() {
        return circRadius;
      });

   
      }
    }
