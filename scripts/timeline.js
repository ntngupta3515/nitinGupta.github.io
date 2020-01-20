function initializeTimeline(color1 = "white", color2 = "#18202a") {

    // Variables for quick changing the properties
    let timelineStrokeWidth = 6/window.devicePixelRatio
    let timelineHeight = 34.5/window.devicePixelRatio
    
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
    
    
    let timelineRectBounding = document.getElementById("timelineRect").getBoundingClientRect()
    let lastPercent = 80 - 80*(timelineStrokeWidth/2)/timelineRectBounding.width
    relevantEvents["Graduated from ASU"][2] = `${lastPercent}%`

    // What is the current event of my life
    let currentEventTime = `${relevantEvents[currentEvent][0]} ${relevantEvents[currentEvent][1]}`
    //let totalNumberOfEvents = Object.keys(relevantEvents).length
    //let currentEventIndex = Object.keys(relevantEvents).indexOf(currentEvent)

    // Create the tooltip and ticks for the timeline
    let ticksGroup = timeline.append("g")
    let toolTip = timeline.append("g")
    
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
            L ${15/window.devicePixelRatio} ${15/window.devicePixelRatio}
            L ${75/window.devicePixelRatio} ${15/window.devicePixelRatio}
            L ${75/window.devicePixelRatio} ${75/window.devicePixelRatio}
            L -${75/window.devicePixelRatio} ${75/window.devicePixelRatio}
            L -${75/window.devicePixelRatio} ${15/window.devicePixelRatio}
            L -${15/window.devicePixelRatio} ${15/window.devicePixelRatio}
            z
        `)

    let toolTipText = toolTip.append("text")
        .text(currentEvent)
        .attr("fill", color2)
        .attr("id", "timelineTooltipText1")
        .attr("transform", `translate(0, ${37.5/window.devicePixelRatio})`)
        .style("font-size", 10.5/window.devicePixelRatio)
        .attr("text-anchor", "middle")
    
    let toolTipYear = toolTip.append("text")
        .text(currentEventTime)
        .attr("fill", color2)
        .attr("id", "timelineTooltipText2")
        .attr("transform", `translate(0, ${60/window.devicePixelRatio})`)
        .style("font-size", 10.5/window.devicePixelRatio)
        .attr("text-anchor", "middle")
        

    // Add a mouseover and mousemove functionality to the timeline
    timelineSVG.on("mouseover", function() {
        let newWidth = d3.event.x - timelineRectBounding.x
        let currentPercent = newWidth*80/timelineRectBounding.width
        let newText = ""
        let oldEvent = ""
        if(currentPercent <= 0)
            newText = "Born"
        else {
            Object.keys(relevantEvents).forEach(event => {
                let percent = parseFloat(relevantEvents[event][2].replace("%",".00"))
                if(percent >= currentPercent) {
                    newText = oldEvent
                    return
                }
                else {
                    oldEvent = event
                }
            });
        }
        
        if(newText == "")
            newText = "Graduated from ASU"
        toolTipText.text(newText)
        currentEvent = newText
        loadEvent(newText)
        toolTipYear.text(`${relevantEvents[newText][0]} ${relevantEvents[newText][1]}`)

        let tooltipNewWidth = Math.max(document.getElementById("timelineTooltipText1").getBoundingClientRect().width, document.getElementById("timelineTooltipText2").getBoundingClientRect().width)/2 + 10
        toolTipBG.transition().duration(50).attr("d", `
            M 0 0
            L ${15/window.devicePixelRatio} ${15/window.devicePixelRatio}
            L ${tooltipNewWidth} ${15/window.devicePixelRatio}
            L ${tooltipNewWidth} ${75/window.devicePixelRatio}
            L -${tooltipNewWidth} ${75/window.devicePixelRatio}
            L -${tooltipNewWidth} ${15/window.devicePixelRatio}
            L -${15/window.devicePixelRatio} ${15/window.devicePixelRatio}
            z
        `)
        if(newWidth >= 0 && newWidth <= timelineRectBounding.width) {
            loadBar.transition().ease(d3.easeLinear).duration(50).attr("width", newWidth)
            toolTip.transition().ease(d3.easeLinear).duration(50).attr("transform", `translate(${loadBarXPos - timelineSVGXPos + newWidth + timelineStrokeWidth}, ${timelineHeight + 8})`)
        }
    })
    .on("mousemove", function() {
        let newWidth = d3.event.x - timelineRectBounding.x
        let currentPercent = newWidth*80/timelineRectBounding.width
        let newText = ""
        let oldEvent = ""

        if(currentPercent <= 0)
            newText = "Born"
        else {
            Object.keys(relevantEvents).forEach(event => {
                let percent = parseFloat(relevantEvents[event][2].replace("%",".00"))
                if(percent >= currentPercent) {
                    newText = oldEvent
                    return
                }
                else {
                    oldEvent = event
                }
            });
        }

        if(newText == "")
            newText = "Graduated from ASU"
        toolTipText.text(newText)
        currentEvent = newText
        loadEvent(newText)
        toolTipYear.text(`${relevantEvents[newText][0]} ${relevantEvents[newText][1]}`)

        let tooltipNewWidth = Math.max(document.getElementById("timelineTooltipText1").getBoundingClientRect().width, document.getElementById("timelineTooltipText2").getBoundingClientRect().width)/2 + 15/window.devicePixelRatio
        toolTipBG.transition().duration(50).attr("d", `
            M 0 0
            L ${15/window.devicePixelRatio} ${15/window.devicePixelRatio}
            L ${tooltipNewWidth} ${15/window.devicePixelRatio}
            L ${tooltipNewWidth} ${75/window.devicePixelRatio}
            L -${tooltipNewWidth} ${75/window.devicePixelRatio}
            L -${tooltipNewWidth} ${15/window.devicePixelRatio}
            L -${15/window.devicePixelRatio} ${15/window.devicePixelRatio}
            z
        `)
        if(newWidth >= 0 && newWidth <= timelineRectBounding.width) {
            loadBar.attr("width", newWidth)
            toolTip.transition().ease(d3.easeLinear).duration(50).attr("transform", `translate(${loadBarXPos - timelineSVGXPos + newWidth + timelineStrokeWidth}, ${timelineHeight + 12/window.devicePixelRatio})`)
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
            .attr("height", 7.5/window.devicePixelRatio)
            .attr("width", 3/window.devicePixelRatio)
        
        let tickX = document.getElementById(`tick${relevantEvents[key][0]}${relevantEvents[key][1]%100}`).getBoundingClientRect().x

        ticksGroup.append("text")
            .text(time)
            .attr("fill", "white")
            .attr("transform", `translate(${tickX - (loadBarXPos - timelineStrokeWidth/2) + 4}, ${45/window.devicePixelRatio}) rotate(-90)`)
            .style("font-size", 12/window.devicePixelRatio)
            .attr("text-anchor", "middle")

    });


}