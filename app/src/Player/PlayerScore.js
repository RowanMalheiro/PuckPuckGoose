import {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import '../css/PlayerPage.css'

function PlayerScore(props){
    const svg = useRef(null)
    const width = 100, height = 100

    //Run code whenever PlayerScore is called
    useEffect(() => {
        //Return early if data does not exist
        if(!props.percentile){
            return
        }

        //Create a colour scale based on the percentile
        const colourScale = d3.scaleDiverging()
            .interpolator(d3.interpolateRdBu)
            .domain([100,50,0])
        
        //Add styles and a viewbox to the svg
        const svgRef =  d3.select(svg.current)
            .style("height", "20vh")
            .style("width", "20vh")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("margin", "auto")


        //Add a g element with no transformation
        const g = svgRef.append("g")
            .attr("transform", `translate(0,0)`)
        
        //Add the square a colour it based on the percentile
        const square = g.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", colourScale(props.percentile))

        //Add the percentile into the rectangle
        const text = g.append("text")
            .attr("x", "50%")
            .attr("y", "50%")
            .attr("dominant-baseline", "middle")
            .attr("text-anchor", "middle")
            .style("font", "bold 60px sans-serif")
            .attr("class-name", "playercard-scoretext")
            .text(Math.round(props.percentile))
        
            if(30<props.percentile && props.percentile<70){
                text.style("fill", "black")
            }
            else{
                text.style("fill", "white")
            }
        

    }, [])

    return(
        <svg ref={svg} id="svg"></svg>
    )

}

export default PlayerScore