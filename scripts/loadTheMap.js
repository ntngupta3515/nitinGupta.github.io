let loadedData = null
function initializeMap(country, state) {
    if(state != currentState)
        currentState = state
    updateTheColors(state)
    if(country != currentCountry) {
        currentCountry = country
        currentState = state
        if(loadedData == null) {
            Promise.all([
                d3.json(`data/India.geo.json`),
                d3.json(`data/US.geo.json`)
            ]).then(function(data) {
                loadedData = [topojson.feature(data[0], data[0].objects.ne_10m_admin_1_India_Official), data[1]]
                drawMap()
            })
        }
        else {
            drawMap()
        }
    }
}

function updateTheColors(state) {
    let mapSVG = d3.select("#mainMapSVG")
    let map = mapSVG.select("g")

    map.selectAll("path")
        .attr("stroke", primaryColor)
        .attr("fill", function() {
            if(d3.select(this).attr("id") == state) {
                return primaryColor
            }
            return "none"
        })
}

function drawMap() {
    let name = "NAME"
    let coordinates = [-110.2551, 37.0902]
    if(currentCountry != "US") {
        name = "name"
        coordinates = [67.9629, 20.5937]
        geoData = loadedData[0]
    }
    else
        geoData = loadedData[1]

    let projection = d3.geoMercator()
        .center(coordinates)
        .scale(600)

    // Creating a map generator
    let geoPath = d3.geoPath()
        .projection(projection)

    geoData.features = geoData.features.filter(d => {
        return d.properties[name] != "Alaska" && d.properties[name] != "Hawaii" && d.properties[name] != "Puerto Rico"
    })
        
    let mapSVG = d3.select("#mainMapSVG")
    let map = mapSVG.select("g")

    let mapBinding =  map.selectAll("path")
        .data(geoData.features)
    
    mapBinding.enter().append("path").transition().duration(1000)
        .attr("id", d => d.properties[name].replace(" ",""))
        .attr("d", d => geoPath(d))
        .attr("stroke", primaryColor)
        .attr("fill", d => {
            if(d.properties[name] == currentState) {
                return primaryColor
            }
            return "none"
        })
        .attr("stroke-width", 1.5)

    mapBinding.transition().duration(1000).attr("id", d => d.properties[name].replace(" ",""))
        .attr("d", d => geoPath(d))
        .attr("stroke", primaryColor)
        .attr("fill", d => {
            if(d.properties[name] == currentState) {
                return primaryColor
            }
            return "none"
        })
        .attr("stroke-width", 1.5)

    mapBinding.exit().remove()
}