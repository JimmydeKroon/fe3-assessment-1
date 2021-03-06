var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 70, left: 80},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
// selects the svg and gives it margins
// takes the svg width and height and takes the margins away so it stays in proportion

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
// makes the x and y axis

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// adds a group to the svg with an attribute that places the svg on the right spot

d3.tsv("data.tsv", function(d) {
  d.speakers = +d.speakers;
  return d;
}, function(error, data) {
  if (error) throw error;
// loades the data file

  x.domain(data.map(function(d) { return d.language; }));
  // map the data from the first tab in data.tsv on x axis
  y.domain([0, d3.max(data, function(d) { return d.speakers; })]);
  // check the data in data.tsv to make the y axis

  g.append("g")
      .attr("class", "axisaxis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  // adds some attributes to the x axis

  g.append("g")
      .attr("class", "axisaxis--y")
      .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "right")
      .text("Speakers");
  // adds some attributes for the y axis

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.language); })
      .attr("y", function(d) { return y(d.speakers); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.speakers); });
});
// make and select "bar" and add the data to make the different bars
