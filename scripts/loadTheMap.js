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
                d3.json(`./data/india.geo.json`),
                d3.json(`./data/us.geo.json`)
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
    let coordinates = [-78.7129, 34.0902]
    let scale = 880
    if(currentCountry != "US") {
        name = "name"
        scale = 890
        coordinates = [97.9629, 17.5937]
        geoData = loadedData[0]
    }
    else
        geoData = loadedData[1]

    let projection = d3.geoMercator()
        .center(coordinates)
        .scale(scale/window.devicePixelRatio)

    // Creating a map generator
    let geoPath = d3.geoPath()
        .projection(projection)

    geoData.features = geoData.features.filter(d => {
        return d.properties[name] != "Alaska" && d.properties[name] != "Hawaii" && d.properties[name] != "Puerto Rico"
    })
        
    let mapSVG = d3.select("#mainMapSVG")
    let mapSVGbounding = document.getElementById("mainMapSVG").getBoundingClientRect()
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
        .attr("stroke-width", 2.25/window.devicePixelRatio)

    mapBinding.transition().duration(1000).attr("id", d => d.properties[name].replace(/ /g,""))
        .attr("d", d => geoPath(d))
        .attr("stroke", primaryColor)
        .attr("fill", d => {
            if(d.properties[name] == currentState) {
                return primaryColor
            }
            return "none"
        })
        .attr("stroke-width", 2.25/window.devicePixelRatio)

    mapBinding.exit().remove()
    
    let currentStateBounding = document.getElementById(currentState.replace(/ /g, "")).getBoundingClientRect()
    let currentStateX = currentStateBounding.x + currentStateBounding.width/2
    let currentStateY = currentStateBounding.y + currentStateBounding.height/2
    mapSVG.selectAll("circle").remove()
    mapSVG.append("circle")
        .attr("fill", secondaryColor)
        .attr("cx", currentStateX)
        .attr("cy", currentStateY)
        .attr('r', 4.5/window.devicePixelRatio)
}