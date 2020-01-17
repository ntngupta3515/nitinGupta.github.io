let themeChangeButton = d3.select("#changeThemeButton")

let backgroundDivToRotate = d3.select("#backgroundDiv2").style("transform", "rotate(-90deg)")

themeChangeButton.on("click", function() {
    
    if(backgroundDivToRotate.style("transform") == "rotate(-90deg)") {

        themeChangeButton.text("Light Theme")

        backgroundDivToRotate.style("transform", "rotate(0deg)")
        d3.select("#topHeadingbg2").transition().delay(300).style("left", "100%")
        d3.select("#headingTitle").transition().delay(700).style("color", "white")

        initializeMap("white", "#18202a")
        //initializeTimeline("#18202a", "white")

        /*d3.select("#sortAttributeButton").style("border", "1px solid #18202a")
        d3.select("#sortAscDscButton").style("border", "1px solid #18202a")
        d3.select("#sortButton").style("border", "1px solid #18202a")


        //DEMO GLASS
        d3.select("#listingContainer").transition().delay(300).style("border", "1px solid #18202a")
        d3.select("#demoGlass1").transition().delay(300).attr("stroke", "#18202a")
        d3.select("#demoDrink1").transition().delay(300).attr("fill", "#18202a")

        d3.selectAll(".lineMarkerDemo").transition().delay(300).attr("stroke", "#18202a")
        d3.selectAll(".lineMarkerWithFillDemo").transition().delay(300).attr("stroke", "#18202a").attr("fill", "#18202a")
        d3.selectAll(".fillMarkerDemo").transition().delay(300).attr("fill", "#18202a")
        d3.selectAll(".drinkMarkerDemo").transition().delay(300).attr("fill", "white")
        

        //COLUMN SELECTOR
        d3.select("#legend").selectAll(".nonClickableP").transition().delay(300).style("color", "#18202a").style("background-color", "white").style("border", "1px solid #18202a")
        d3.select("#legend").selectAll(".clickableP").transition().delay(300).style("color", "white").style("background-color", "#18202a").style("border", "1px solid #18202a")        
        //d3.select("#mainDiv").selectAll("div").transition().style("background-color", "#18202a").style("border", "1px solid white")
        //d3.selectAll(".glass").transition().attr("stroke", "white")*/
    }
    else {

        themeChangeButton.text("Dark Theme")

        backgroundDivToRotate.style("transform", "rotate(-90deg)")
        d3.select("#topHeadingbg2").transition().delay(300).style("left", "0%")
        d3.select("#headingTitle").transition().delay(700).style("color", "#18202a")

        initializeMap("#18202a", "white")
        //initializeTimeline("white", "#18202a")

        /*d3.select("#sortAttributeButton").transition().delay(700).style("border-top", "1px solid white").style("border-bottom", "1px solid white").style("border-left", "1px solid white")
        d3.select("#sortAscDscButton").transition().delay(700).style("border-top", "1px solid white").style("border-bottom", "1px solid white").style("border-right", "1px solid white")
        d3.select("#sortButton").transition().delay(700).style("border", "1px solid white")


        //DEMO GLASS
        d3.select("#listingContainer").transition().delay(300).style("border", "1px solid white")
        d3.select("#demoGlass1").transition().delay(300).attr("stroke", "white")
        d3.select("#demoDrink1").transition().delay(300).attr("fill", "white")

        d3.selectAll(".lineMarkerDemo").transition().delay(300).attr("stroke", "white")
        d3.selectAll(".lineMarkerWithFillDemo").transition().delay(300).attr("stroke", "white").attr("fill", "white")
        d3.selectAll(".fillMarkerDemo").transition().delay(300).attr("fill", "white")
        d3.selectAll(".drinkMarkerDemo").transition().delay(300).attr("fill", "#18202a")

        //COLUMN SELECTOR
        d3.select("#legend").selectAll(".nonClickableP").transition().delay(300).style("color", "#18202a").style("background-color", "white").style("border", "1px solid white")
        d3.select("#legend").selectAll(".clickableP").transition().delay(300).style("color", "white").style("background-color", "#18202a").style("border", "1px solid white")
        

        //d3.select("#mainDiv").selectAll("div").transition().style("background-color", "white").style("border", "1px solid #18202a")
        //d3.selectAll(".glass").transition().attr("stroke", "#18202a")*/

    }
})