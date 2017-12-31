var margin = {
    top : 20,
    right : 10,
    bottom : 20,
    left : 10
},
width = 1200 - margin.right - margin.left,
height = 800 - margin.top - margin.bottom;
var maxVal = 100
var selectedID;

function padExtent(e, p) {
  	if (p === undefined) p = maxVal * 0.1;
  	return ([e[0] - p, e[1] + p]);
}



function makeScatterPlot(data) {

    d3.select("#scatter").select("svg").remove();
    var x = d3.scaleLinear()
    	.domain(padExtent([-1,1]))
    	.range(padExtent([0, domainwidth]));
    var y = d3.scaleLinear()
    	.domain(padExtent([-1,1]))
    	.range(padExtent([domainheight, 0]));

    // var zoomBeh = d3.behavior.zoom()
    //       .x(x)
    //       .y(y)
    //       .scaleExtent([0, 500])
    //       .on("zoom", zoom);

    var svg = d3.select("#scatter"),
        domainwidth = width - margin.left - margin.right,
        domainheight = height - margin.top - margin.bottom;

    // var svg = d3.select("#scatter");
    //         // .call(zoomBeh);
    //       var domainwidth = width - margin.left - margin.right;
    //       var domainheight = height - margin.top - margin.bottom;


    var g = svg.append("g")
		.attr("transform", "translate(" + margin.top + "," + margin.top + ")");

    g.append("rect")
    	.attr("width", width)
    	.attr("height", height)
        .attr("fill", "#ebebeb");


        var dataset = new Array(data.player_list.length);

        x = d3.scaleLinear()
          .domain(padExtent([data.minX, data.maxX]))
          .range(padExtent([0, domainwidth]));
        y = d3.scaleLinear()
          .domain(padExtent([data.minY, data.maxY]))
          .range(padExtent([domainheight, 0]));

        for(var i=0; i<dataset.length; i++) {
            dataset[i] = data.player_list[i];
        }
        console.log(data.player_list);

        g.selectAll("circle")
            .data(data.player_list)
            .enter().append("circle")
            .on("mouseover", function() {

          d3.select(this)
              .attr("r", 6)
              })
            .on("mouseout", function() {

          d3.select(this)
              .attr("r", 4)
              })
            .on("click", function(d) {
                console.log(selectedID);
                if (selectedID != undefined) {

                    // d3.select("#"+selectedID).style("fill", function(d) {return "#60B19C";});
                }
                // d3.select(this).style("fill", function(d) {return "#A72D73";});
                // selectedID =  this.id;
                showPlayerDetails(d);

            })
            .attr("class", ".dot")
            .attr("r", 4)
            // .attr("transform", transform)
            .attr("id", function(d, i){ return d.id; })
            .attr("cx", function(d) { return x(d.X); })
            .attr("cy", function(d) { return y(d.Y); })
              .style("fill", function(d) {
                return "#60B19C";
            });

        // var xAxis = d3.axisBottom(x).ticks(10);
        //
        // var yAxis = d3.axisLeft(y).ticks(10);
        //
        // g.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + y.range()[0] / 2 + ")")
        //     .call(xAxis);
        //
        // g.append("g")
        //     .attr("class", "y axis")
        //     .attr("transform", "translate(" + x.range()[1] / 2 + ", 0)")
        //     .call(yAxis);


    // function zoom() {
    //     console.log("zoom called");
    //     svg.select("g.x.axis").call(xAxis);
    //     svg.select("g.y.axis").call(yAxis);
    //
    //     svg.selectAll(".dot")
    //     .attr("transform", transform);
    // }
    //
    // function transform(d) {
    //
    //     return "translate(" + x(d.X) + "," + y(d.Y) + ")";
    // }

}

function plotPlayers(error, data) {
    makeScatterPlot(data);
}
