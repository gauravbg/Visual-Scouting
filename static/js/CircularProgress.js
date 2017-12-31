var att;
var men;
var phy;
var tech;
var gk;
var def;

function CircularProgress(element, settings, name){
    var type = name;
	var duration = settings.duration || 500;
	var w = settings.width || 200;
	var h = settings.height || w;
	var outerRadius = settings.outerRadius || w/2;
	var innerRadius = settings.innerRadius || (w/2) * (80/100);
	var range = settings.range || {min: 0, max: 100};
	var fill = settings.fill || "#F20100";

	var svg = d3.select(element)
		.append("svg")
			.attr("width", w)
			.attr("height", h);

	var arc = d3.svg.arc()
			.innerRadius(innerRadius-10)
			.outerRadius(outerRadius-10);

	var paths = function(numerators) {
		return numerators.map(function(numerator){
			var degrees = ((numerator - range.min) / (range.max - range.min)) * 360.0;
			var radians = degrees * (Math.PI / 180);
			var data = {value: numerator, startAngle: 0, endAngle: radians};
			return data;
		});
	}

	var g = svg.append('g').attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

	//initialise the control
	g.datum([0]).selectAll("path")
		.data(paths)
	.enter()
		.append("path")
		.attr("fill", fill)
		.attr("d", arc)
	.each(function(d){ this._current = d; });

	svg.datum([0]).selectAll("text")
		.data(paths)
	.enter()
		.append("text")
		.attr("transform", "translate(" + w/2 + ", " + h/1.6 + ")")
		.attr("text-anchor", "middle")
		.text(function(d){return type + ":"+ d.value});



	this.update = function(percent) {
		g.datum(percent).selectAll("path").data(paths).transition().duration(duration).attrTween("d", arcTween);
		svg.datum(percent).selectAll("text").data(paths).text(function(d){return type + ":"+ d.value;});
	};

	var arcTween = function(initial) {
		var interpolate = d3.interpolate(this._current, initial);
		this._current = interpolate(0);
		return function(t) {
			return arc(interpolate(t));
		};
	}
};


function showPlayerDetails(data) {
    var charts = document.getElementById("playerCircles");
    var name = document.getElementById("playerName");
    name.innerHTML = data.Name;

    var settings = {
        fill: "#f0f0f0",
        width: 200,
        height: 200
    };

    if(att === undefined)
        att = new CircularProgress(charts, settings, "Attacking");
	att.update([data.Att]);

    if(def === undefined)
        def = new CircularProgress(charts, settings, "Defence");
	def.update([data.Def]);

    if(men === undefined)
        men = new CircularProgress(charts, settings, "Mental");
	men.update([data.Men]);

    if(gk === undefined)
        gk = new CircularProgress(charts, settings, "Goalkeeping");
	gk.update([data.GK]);

    if(phy === undefined)
        phy = new CircularProgress(charts, settings, "Physical");
	phy.update([data.Phy]);

    if(tech === undefined)
        tech = new CircularProgress(charts, settings, "Technical");
    tech.update([data.Tech]);

}
