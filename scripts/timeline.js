function initializeTimeline(color1 = "white", color2 = "#18202a") {

    // Variables for quick changing the properties
    let timelineStrokeWidth = 4
    let timelineHeight = 23
    
    // Remove any SVG before recreating it
    let timelineDiv = d3.select("#timeline")
    timelineDiv.selectAll("svg").remove()

    // Create/recreate the SVG
    let timelineSVG = timelineDiv.append("svg").attr("id", "timelineSVG")
    let timeline = timelineSVG.append("g")

    // Create the BG rectangle for the timeline
    let timelineRect = timeline.append("rect")
        .attr("fill", color2)
        .attr("stroke", color1)
        .attr("id", "timelineRect")
        .attr("width", `calc(80% - ${timelineStrokeWidth})`)
        .attr("x", `calc(10% + ${timelineStrokeWidth/2})`)
        .attr("y", `${timelineStrokeWidth/2}`)
        .attr("height", timelineHeight - timelineStrokeWidth)
        .attr("stroke-width", timelineStrokeWidth)
    
    // List down all the major events of my life
    let relevantEvents = {
        "Born": ["Apr", 1995, "0%"],
        "Pursuing primary/secondary education": ["Apr", 1999, "5%"],
        "Graduated from secondary school": ["May", 2011, "15%"],
        "Pursuing high school": ["Apr", 2011, "17%"],
        "Graduated from high school": ["May", 2013, "27%"],
        "Pursuing undergrad at DTU": ["Aug", 2013, "30%"],
        "Summer Intern at Infosys": ["Jun", 2016, "40%"],
        "Graduated from DTU": ["May", 2017, "45%"],
        "Data Engineer at UHG": ["July", 2017, "50%"],
        "Resigned from my job at UHG": ["July", 2019, "60%"],
        "Pursuing Masters at ASU (Go Sundevils!!)": ["Aug", 2019, "62%"],
        "Summer Intern at Amazon": ["May", 2020, "72%"],
        "Graduated from ASU": ["May", 2021, `calc(80% - ${timelineStrokeWidth/2})`]
    } // The percent should be at max 80


    // What is the current event of my life
    let currentEvent = "Pursuing Masters at ASU (Go Sundevils!!)"
    //let totalNumberOfEvents = Object.keys(relevantEvents).length
    //let currentEventIndex = Object.keys(relevantEvents).indexOf(currentEvent)

    // Create the tooltip and ticks for the timeline
    let toolTip = timeline.append("g")
    let ticksGroup = timeline.append("g")

    // initialize the load bar upto my current event
    let loadBar = timeline.append("rect")
        .attr("id", "timelineLoadBar")
        .attr("fill", color1)
        .attr("stroke", color1)
        .attr("width", `calc(${relevantEvents[currentEvent][2]} - ${timelineStrokeWidth/2})`) //80*currentEventIndex/totalNumberOfEvents
        .attr("height", timelineHeight - timelineStrokeWidth)
        .attr("x", `calc(10% + ${timelineStrokeWidth/2})`)
        .attr("y", `${timelineStrokeWidth/2}`)
        .attr("stroke-width", timelineStrokeWidth)

    // Variables needed for tooltip of the timeline
    let loadBarInitialWidth = document.getElementById("timelineLoadBar").getBoundingClientRect().width
    let loadBarXPos = document.getElementById("timelineLoadBar").getBoundingClientRect().x
    let timelineSVGXPos = document.getElementById("timelineSVG").getBoundingClientRect().x

    //Update toolTip Attributes
    toolTip.attr("transform", `translate(${loadBarXPos - timelineSVGXPos + loadBarInitialWidth + timelineStrokeWidth}, ${timelineHeight + 8})`)

    let toolTipBG = toolTip.append("path")
        .attr("fill", color1)
        .attr("stroke", "none")
        .attr("stroke-width", 0)
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

    let toolTipText = toolTip.append("text")
        .text(currentEvent)
        .attr("fill", color2)
        .style("font-size", 8)
        .attr("text-anchor", "middle")
        

    // Add a mouseover and mousemove functionality to the timeline
    let timelineRectBounding = document.getElementById("timelineRect").getBoundingClientRect()

    timeline.on("mouseover", function() {
        let newWidth = d3.event.x - timelineRectBounding.x
        if(newWidth >= 0 && newWidth <= timelineRectBounding.width) {
            loadBar.transition().ease(d3.easeLinear).duration(50).attr("width", newWidth)
            toolTip.transition().ease(d3.easeLinear).duration(50).attr("transform", `translate(${loadBarXPos - timelineSVGXPos + newWidth + timelineStrokeWidth}, ${timelineHeight + 8})`)
        }
    })
    .on("mousemove", function() {
        let newWidth = d3.event.x - timelineRectBounding.x
        if(newWidth >= 0 && newWidth <= timelineRectBounding.width) {
            loadBar.attr("width", newWidth)
            toolTip.transition().ease(d3.easeLinear).duration(50).attr("transform", `translate(${loadBarXPos - timelineSVGXPos + newWidth + timelineStrokeWidth}, ${timelineHeight + 8})`)
        }
    })
    .on("touchstart", function() {
        d = d3.touches(this)[0][0];
        let newWidth = d - 50
        if(newWidth >= 0 && newWidth <= timelineRectBounding.width) {
            loadBar.attr("width", newWidth)
            toolTip.transition().ease(d3.easeLinear).duration(50).attr("transform", `translate(${loadBarXPos - timelineSVGXPos + newWidth + timelineStrokeWidth}, ${timelineHeight + 8})`)
        }
    })
    .on("touchmove", function() {
        d = d3.touches(this)[0][0];
        let newWidth = d - 50
        if(newWidth >= 0 && newWidth <= timelineRectBounding.width) {
            loadBar.attr("width", newWidth)
            toolTip.transition().ease(d3.easeLinear).duration(50).attr("transform", `translate(${loadBarXPos - timelineSVGXPos + newWidth + timelineStrokeWidth}, ${timelineHeight + 8})`)
        }
    })

    // Add attributes to ticks on the timeline representing years
    ticksGroup.attr("transform", `translate(${loadBarXPos - timelineSVGXPos - timelineStrokeWidth/2}, ${timelineHeight})`)
    
    Object.keys(relevantEvents).forEach(key => {
        let time = `${relevantEvents[key][0]} ${relevantEvents[key][1]}`
        ticksGroup.append("rect")
            .attr("fill", "white")
            .attr("id", `tick${relevantEvents[key][0]}${relevantEvents[key][1]%100}`)
            .attr("x", `${relevantEvents[key][2]}`)
            .attr("y", `0`)
            .attr("height", `5`)
            .attr("width", `2`)
        
        let tickX = document.getElementById(`tick${relevantEvents[key][0]}${relevantEvents[key][1]%100}`).getBoundingClientRect().x

        ticksGroup.append("text")
            .text(time)
            .attr("fill", "white")
            .attr("transform", `translate(${tickX - (loadBarXPos - timelineStrokeWidth/2) + 4}, 30) rotate(-90)`)
            .style("font-size", 8)
            .attr("text-anchor", "middle")

    });


}