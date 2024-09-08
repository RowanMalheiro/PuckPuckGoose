import {useEffect, useRef, useState} from 'react'
import PlayerFinishing from './Player/PlayerFinishing'
import * as d3 from 'd3'

export const drawRink = (g) => {
    let height = 92
    let width = 85
    g.selectAll("path").remove()
    
    const blueLine = g.append("path")
        .attr("d", `M 0 ${height} L ${width} ${height}`)
        .attr("stroke", "blue")
        .attr("stroke-width", 6)
        .attr("fill", "none")

    const redLine = g.append(`path`)
        .attr("d", `M 0 ${height-64} L ${width} ${height-64}`)
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("fill", "none");

    const outline = g.append("path")
        .attr("d", `M 0 ${height} L 0 ${height-64} C 0 12, 5 1, 20 1 L ${width-20} 1 C ${width-5} 1, ${width} 12, ${width} ${height-64} L ${width} ${height}`)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", "none");
}


//Component for drawing the actual shot map and then rendering the content inside (children)
function ShotMap({children, svg}){
    const setheight = useRef(92)
    const setwidth = useRef(85)

    //Draw the rink
    const drawRink = (g) => {
        let height = 92
        let width = 85
        g.selectAll("path").remove()
        
        const blueLine = g.append("path")
            .attr("d", `M 0 ${height} L ${width} ${height}`)
            .attr("stroke", "blue")
            .attr("stroke-width", 6)
            .attr("fill", "none")

        const redLine = g.append(`path`)
            .attr("d", `M 0 ${height-64} L ${width} ${height-64}`)
            .attr("stroke", "red")
            .attr("stroke-width", 3)
            .attr("fill", "none");

        const outline = g.append("path")
            .attr("d", `M 0 ${height} L 0 ${height-64} C 0 12, 5 1, 20 1 L ${width-20} 1 C ${width-5} 1, ${width} 12, ${width} ${height-64} L ${width} ${height}`)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");
    }
    
    //Run when ShotMap function is called
    useEffect(() => {
        console.log(svg)
        let height = setheight.current
        let width = setwidth.current

        const svgRef = d3.select(svg)
            .attr("viewBox", [0, 0, width, height])
            .attr("height", "100%")
            .attr("width", "100%")
        
        const g = svgRef.append("g")
            .attr("transform", "translate(0,0)")
        
        drawRink(g)

    },[])

    //Render its children (actual content of the shotmap)
    return(
        <>

            {children}
        </> 
    )
}

export default ShotMap