function initializeMap(color1 = "white", color2 = "#18202a") {
    d3.json("./data/us.geo.json").then(function(data) {
        drawMap(data, color1, color2)
    })
}

function drawMap(geoData, color1, color2) {

    d3.select("#mainMap").selectAll("svg").remove()

    let projection = d3.geoMercator()
        .center([-110.2551, 37.0902])
        .scale(600)

    // Creating a map generator
    let geoPath = d3.geoPath()
        .projection(projection)

    geoData.features = geoData.features.filter(d => {
        return d.properties.NAME != "Alaska" && d.properties.NAME != "Hawaii" && d.properties.NAME != "Puerto Rico"
    })
        
    let mapSVG = d3.select("#mainMap").append("svg").attr("id", "mainMapSVG")
    let map = mapSVG.append("g")

    map.selectAll("path")
        .data(geoData.features)
        .enter().append("path")
        .attr("id", d => d.properties.NAME.replace(" ",""))
        .attr("d", d => geoPath(d))
        .attr("stroke", color1)
        .attr("fill", d => {
            if(d.properties.NAME == "Arizona") {
                return color1
            }
            return "none"
        })
        .attr("stroke-width", 1.5)
}