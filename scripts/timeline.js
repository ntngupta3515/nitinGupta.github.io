function initializeTimeline(color1 = "white", color2 = "#18202a") {

    let timelineStrokeWidth = 4
    let timelineHeight = 23
    
    let timelineDiv = d3.select("#timeline")
    timelineDiv.selectAll("svg").remove()

    let timelineSVG = timelineDiv.append("svg").attr("id", "timelineSVG")
    let timeline = timelineSVG.append("g")

    let timelineRect = timeline.append("rect")
        .attr("fill", color2)
        .attr("stroke", color1)
        .attr("id", "timelineRect")
        .attr("width", `calc(80% - ${timelineStrokeWidth})`)
        .attr("x", `calc(10% + ${timelineStrokeWidth/2})`)
        .attr("y", `${timelineStrokeWidth/2}`)
        .attr("height", timelineHeight - timelineStrokeWidth)
        .attr("stroke-width", timelineStrokeWidth)
    
    let relevantEvents = {
        "Born": ["Apr", 1995],
        "Pursuing primary/secondary education": ["", 1999],
        "Graduated from secondary school": ["May", 2011],
        "Pursuing high school": ["Apr", 2011],
        "Graduated from high school": ["May", 2013],
        "Pursuing undergrad at DTU": ["Aug", 2013],
        "Summer Intern at Infosys": ["Jun", 2016],
        "Graduated from DTU": ["May", 2017],
        "Data Engineer at UHG": ["July", 2017],
        "Resigned from my job at UHG": ["July", 2019],
        "Pursuing Masters at ASU (Go Sundevils!!)": ["Aug", 2019],
        "Summer Intern at Amazon": ["May", 2020],
        "Graduated from ASU": ["May", 2021]
    }

    let currentEvent = "Pursuing Masters at ASU (Go Sundevils!!)"
    let totalNumberOfEvents = Object.keys(relevantEvents).length
    let currentEventIndex = Object.keys(relevantEvents).indexOf(currentEvent)

    let loadBar = timeline.append("rect")
        .attr("id", "timelineLoadBar")
        .attr("fill", color1)
        .attr("stroke", color1)
        .attr("width", `calc(${80*currentEventIndex/totalNumberOfEvents}% - ${timelineStrokeWidth})`)
        .attr("height", timelineHeight - timelineStrokeWidth)
        .attr("x", `calc(10% + ${timelineStrokeWidth/2})`)
        .attr("y", `${timelineStrokeWidth/2}`)
        .attr("stroke-width", timelineStrokeWidth)

    let loadBarInitialWidth = document.getElementById("timelineLoadBar").getBoundingClientRect().width
    let loadBarXPos = document.getElementById("timelineLoadBar").getBoundingClientRect().x
    let timelineSVGXPos = document.getElementById("timelineSVG").getBoundingClientRect().x

    let toolTip = timeline.append("path")
        .attr("fill", color1)
        .attr("stroke", "none")
        .attr("stroke-width", 0)
        .attr("transform", `translate(${loadBarXPos - timelineSVGXPos + loadBarInitialWidth + timelineStrokeWidth}, ${timelineHeight + 4})`)
        .attr("d", `
            M 0 0
            L 10 10
            L 50 10
            L 50 50
            L -50 50
            L -50 10
            L -10 10
            z
        `)

    let timelineRectBounding = document.getElementById("timelineRect").getBoundingClientRect()

    timeline.on("mouseover", function() {
        let newWidth = d3.event.x - timelineRectBounding.x
        if(newWidth >= 0 && newWidth <= timelineRectBounding.width) {
            loadBar.transition().ease(d3.easeLinear).duration(50).attr("width", newWidth)
            toolTip.transition().ease(d3.easeLinear).duration(50).attr("transform", `translate(${loadBarXPos - timelineSVGXPos + newWidth + timelineStrokeWidth}, ${timelineHeight + 4})`)
        }
    })
    .on("mousemove", function() {
        let newWidth = d3.event.x - timelineRectBounding.x
        if(newWidth >= 0 && newWidth <= timelineRectBounding.width) {
            loadBar.attr("width", newWidth)
            toolTip.transition().ease(d3.easeLinear).duration(50).attr("transform", `translate(${loadBarXPos - timelineSVGXPos + newWidth + timelineStrokeWidth}, ${timelineHeight + 4})`)
        }
    })


}