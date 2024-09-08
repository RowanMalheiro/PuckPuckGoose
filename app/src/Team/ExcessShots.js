import {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import {drawRink} from '../ShotMap.js'

//Component for the excess shots heatmaps
function ExcessShots(props){
    var avgData, g, colourScale
    const setheight = useRef(92)
    const setwidth = useRef(85)

    //fill in the grid
    const drawShots = (shots) => {
        for(let shot of shots){
            g.append("rect")
                .attr("x", shot.x)
                .attr("y", shot.y)
                .attr("width", 1)
                .attr("height", 1)
                .attr("stroke-width", 0.1)
                .attr("stroke", colourScale(shot.score))
                .attr("fill", colourScale(shot.score))
        }
    } 

    //Adds trhe legend to the shot map
    const addLegend = () => {
        for(let x = 20; x<=60; x+=5){
            g.append("rect")
                .attr("width", 5)
                .attr("height", 5)
                .attr("x", x)
                .attr("y", setheight.current/8)
                .attr("fill", colourScale(0.025*(x)-1))

            g.append("text")
                .attr("y", setheight.current/8 + 10)
                .attr("x", 20)
                .attr("fill", 'black')
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")
                .style("font", "0.3vh sans-serif")
                .text("+0.5 Shots Per Hour")

            g.append("text")
                .attr("y", setheight.current/8 + 10)
                .attr("x", 65)
                .attr("fill", 'black')
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")
                .style("font", "0.3vh sans-serif")
                .text("-0.5 Shots Per Hour")
        }
    }

    //Callback is called when component is called
    useEffect(() => {
        g = d3.select(props.svg).select("g")

        //Add the loading text which gets overwritten once the squares are filled in
        g.append("text")
            .attr("dominant-baseline", "middle")
            .attr("text-anchor", "middle")
            .attr("x", 85/2)
            .attr("y", 92/2)
            .style("font", "bold 2vh sans-serif")
            .text("Loading...")  

            //Early return if no data
        if(!props.data){
            return
        }

        //Create the colour scale
        colourScale = d3.scaleDiverging()
            .domain([0.5,0,-0.5])
            .interpolator(d3.interpolateRdBu)

        //Add the legend
        addLegend()

        //fetch the shots data and then run the calculations for each pixel on a seperate thread (calculations at public/Addgrid.js)
        fetch('/data/averageShots.csv')
            .then((response) => response.text())
            .then((csvText) => {
                avgData = d3.csvParse(csvText)
                //run the code on a seperate thread
                const worker = new Worker('/AddGrid.js')
                worker.postMessage({'data': props.data, 'teamIceTime': props.teamIceTime, 'totalIceTime': props.totalIceTime, 'avgData': avgData})
                worker.onmessage= (message) => {
                    drawShots(message.data)
                    drawRink(g)
                    worker.terminate()
                }

            })
    }, [])

    return(<></>)
}

export default ExcessShots