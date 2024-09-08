import * as d3 from 'd3'
import{useEffect, useRef} from 'react'

export function Scatterplot(props){
    const svgRef = useRef(null)
    var xData = props.xData, yData=props.yData, teams=props.teams, xScale, yScale, svg, margin = 30, width = 500

    const drawPoints = () => {
        svg.append("g").selectAll("image")
            .data(teams)
            .join("image")
                .attr("x", (d, i) => xScale(xData[i]))
                .attr("y", (d,i) => yScale(yData[i]))
                .attr("width", 20)
                .attr("height", 20)
                .attr("preserveAspectRatio" , "xMidYMid meet")
                .attr("href", (d) => `/logos/${d}.png`)
            
    }
    
    useEffect(() => {
        if(!props.xData) return

        console.log(props.invertedyScale)

        xScale = d3.scaleLinear()
            .domain([d3.extent(xData)[0]-0.1*d3.extent(xData)[0], d3.extent(xData)[1]+0.1*d3.extent(xData)[1]])
            .range(props.invertedxScale ? [width, margin] : [margin, width])
    
        yScale = d3.scaleLinear()
            .domain([d3.extent(yData)[0]-0.1*d3.extent(yData)[0], d3.extent(yData)[1]+0.1*d3.extent(yData)[1]])
            .range(props.invertedyScale ? [margin, width-margin] : [width-margin, margin])
    
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)
        
        svg = d3.select(svgRef.current)
            .style("width", '100%')
            .style("height", "100%")
            .attr("viewBox", `0 0 ${width} ${width}`)
        
        svg.append("g")
            .attr("transform", `translate(${margin}, 0)`)
            .call(yAxis)
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width-margin)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", margin)
                .attr("y", margin - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .style("font", "8px sans-serif")
                .text(props.yLabel))
            .select("path").remove()
        
        svg.append("g")
            .attr("transform", `translate(0, ${width-margin})`)
            .call(xAxis)
            .call(g => g.selectAll(".tick line").clone()
                .attr("y2", margin + margin - width)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", 480)
                .attr("y", 25)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .style("font", "8px sans-serif")
                .text(props.xLabel))
            .select("path").remove()
        
        svg.append("g")
            .attr("transform", 'translate(0,0)')
            .append("text")
                .attr("x", width/2)
                .attr("y", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .style("font", "20px sans-serif")
                .text(props.title)

        drawPoints()
        
    }, [])

    return(<svg ref={svgRef}/>)
}
//export default Scatterplot