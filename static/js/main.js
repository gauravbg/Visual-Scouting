queue()
    .defer(d3.json, "/data/menu/")
    .await(initMenu);
    // .defer(d3.json, "/data/global/scout")
    // .await(plotPlayers);



function init(error, standings) {

    for (var key in standings) {
        console.log(key);
        console.log(standings[key]);
    }

    loadStackedBars();
}

function onTeamClicked() {
    console.log("onTeamClicked");
    document.getElementById("teamSection").style.display = 'inline-block';
    document.getElementById("playerSection").style.display = 'none';

}

function onPlayerClicked() {
    console.log("onPlayerClicked");
    document.getElementById("teamSection").style.display = 'none';
    document.getElementById("playerSection").style.display = 'inline-block';

}

function onRangeChanged() {
    console.log("onRangeChanged");
    var low = document.getElementById("overall-min").value;
    var high = document.getElementById("overall-max").value;
    // low = 85; high =90;
    console.log("low:" + low);
    console.log("high:" + high);
    var url = "/data/global/scout/filter?min_ovl=" + low + "&max_ovl=" + high;
    queue()
        .defer(d3.json, url)
        .await(plotPlayers);

}
