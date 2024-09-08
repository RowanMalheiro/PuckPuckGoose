import {useEffect, useRef} from 'react'
import * as d3 from 'd3'

function PlayerBar(props){
    const svg = useRef(null)

    useEffect(() => {
        console.log(props.data)
        console.log("HI")
        if(!props.data){
            return
        }

        const statNames = props.data.map((dataPoint) => dataPoint.stat)
        const percentiles = props.data.map((dataPoint) => dataPoint.percentile)

        const xScale = d3.scaleLinear()
            .domain([0,100])
            .range([300, 1000])
        
        const yScale = d3.scaleBand()
            .domain(statNames)
            .range([0,500])
            .padding(0.2)
        
        //Add styles and a viewbox to the svg
        const svgRef = d3.select(svg.current)  
            .attr("viewBox", "0 0 100 500")          
            .style('width' , '100%')
            .style('height', '100%')
            .style('transform-origin', (0,0))

        //Remove preexisting g elements before adding a new one
        svgRef.selectAll("g").remove()
        
        //Add a g element with no transformation
        const g = svgRef.append("g")
            .attr("transform", `translate(0,0)`)
            
        //Create the bars based on the percentiles
        const bars = g.selectAll("rect")
            .data(percentiles)
            .join("rect")
                .attr("x", -500 + xScale(0))
                .attr("y", (d,i) => yScale(statNames[i]))
                .attr("height", yScale.bandwidth())
                .transition()
                .duration(500)
                .attr("width", (d,i) => xScale(d)-xScale(0))
                .attr("fill", props.color)
            
        //Create the labels
        const labels = g.selectAll("text")
            .data(statNames)
            .join("text")
                .attr("x", -600)
                .attr("y", (d,i) =>  yScale(statNames[i]) + 0.5*(yScale.bandwidth()))
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "left")
                .attr("fill", "black")
                .style("font", "bold 50px sans-serif")
                .text(d => d)
        
        percentiles.forEach((percentile, i) => {
            g.append("text")
                .attr("x", () => {
                    if(xScale(percentile)-xScale(0) > 80){
                        return xScale(percentile)-550
                    }
                    return xScale(percentile)-490
                })
                .attr("y", () =>  yScale(statNames[i]) + 0.5*(yScale.bandwidth()))
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "left")
                .attr("fill", () => xScale(percentile)-xScale(0) > 80 ? "white" : "black")
                .style("font", "bold 20px sans-serif")
                .text(`${Math.round(percentile)}%`)
        })
    }, [])

    return(
        <svg className="" ref={svg}></svg>
    )
}

export default PlayerBar