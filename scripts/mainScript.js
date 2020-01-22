buildTheWebsite()

function changeStyle(element, property) {
    let currentProperty = parseFloat(d3.select(element).style(property).replace("px",''))
    d3.select(element).style(property, `${currentProperty/window.devicePixelRatio}px`)
}

function initializeStyle() {
    changeStyle("body", "font-size")
    changeStyle("#topHeading", "height")
    changeStyle("#headingTitle", "top")
    changeStyle("#headingTitle", "font-size")
    changeStyle("#topHeadingbg1", "border-bottom-width")
    changeStyle("#topHeadingbg2", "border-bottom-width")
    changeStyle("#changeThemeButton", "top")
    changeStyle("#changeThemeButton", "right")
    changeStyle("#changeThemeButton", "width")
    changeStyle("#changeThemeButton", "border-radius")
    changeStyle("#changeThemeButton", "border-width")
    changeStyle("#changeThemeButton", "padding")
    changeStyle("#middleMainDiv", "top")

    changeStyle("#footer", "padding-top")
    changeStyle("#footer", "border-top-width")
    changeStyle("#timeline", "height")
    d3.select("#mainMap").style("height", `calc(100% - ${parseFloat(d3.select("#topHeading").style("height").replace("px",'')) + parseFloat(d3.select("#footer").style("padding-top").replace("px",'')) + parseFloat(d3.select("#timeline").style("height").replace("px",''))}px)`)
    d3.select("#mainContent").style("height", `calc(100% - ${parseFloat(d3.select("#topHeading").style("height").replace("px",'')) + parseFloat(d3.select("#footer").style("padding-top").replace("px",'')) + parseFloat(d3.select("#timeline").style("height").replace("px",''))}px)`)
    d3.select("#headingTitle").style("left", `calc(50% - ${45/window.devicePixelRatio}px`)

}

function buildTheWebsite() {

    // Initialize the style
    initializeStyle()

    // Load the map
    loadEvent(currentEvent)

    // Load the timeline
    initializeTimeline()
}