import * as d3 from 'd3'
import {useEffect, useRef} from 'react'
import {drawRink} from '../ShotMap.js'

//Component for creating the heat map
function PlayerFinishingGrid(props){
    const setheight = useRef(92)
    const setwidth = useRef(85)
    var g, colourScale, colourStrength = 1.5

    //convert degree angle to radians
    function toRadians (angle) {
        let radians=  angle * (Math.PI / 180);
        return radians
        
    }

    //Function that adds a legend
    const addLegend = () => {
        for(let x = 20; x<=60; x+=5){
            g.append("rect")
                .attr("width", 5)
                .attr("height", 5) 
                .attr("x", x)
                .attr("y", setheight.current/8)
                .attr("fill", colourScale(-1.5+((x-20)/5)*0.375))

            g.append("text")
                .attr("y", setheight.current/8 + 10)
                .attr("x", 20)
                .attr("fill", 'black')
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")
                .style("font", "5px sans-serif")
                .text("Poor Finishing")

            g.append("text")
                .attr("y", setheight.current/8 + 10)
                .attr("x", 65)
                .attr("fill", 'black')
                .attr("dominant-baseline", "middle")
                .attr("text-anchor", "middle")
                .style("font", "5px sans-serif")
                .text("Strong Finishing")

        }
    }

    //function that colours in a square in the grid based on how often the player scores from around it compared to how many goals they were expected to score
    const drawShot = (row, col) => {
        let xGoals = 0, goals = 0, x, y, width=setwidth.current, height=setheight.current

        if(!props.data)
            return
    
        //Determine the how many goals & expected goals occured around the point
        for(let shot of props.data){
            x=(width/2)-shot.shotDistance*Math.cos(toRadians(90-Number(shot.shotAngle)))
            y=(height-64)+shot.shotDistance*Math.sin(toRadians(90-Number(shot.shotAngle)))
            let distance = Math.sqrt((row-x)**2+(col-y)**2)
            if(distance < 10){
                Math.pow(1,2)
                xGoals += Number(shot.xGoal)*(-1/10*distance+1)
                shot.event == "GOAL" ? goals+=-1/10*distance+1 : goals = goals          
            }
        }
        let score = goals-xGoals 
        score > 1*colourStrength ? score = 1*colourStrength : score=score
        score < -1*colourStrength ? score = -1*colourStrength : score = score
        //add and colour the square based on the score
        g.append("rect")
            .attr("x", row)
            .attr("y", col)
            .attr("stroke", colourScale(score))
            .attr("stroke-width", 0.1)
            .attr("width", 1)
            .attr("height", 1)
            .attr("fill", colourScale(score))
    }

    //Callback is run when the component is called
    useEffect(() => {
        let width=setwidth.current, height=setheight.current
        const svg = d3.select(props.svg)
        g = svg.select("g")

        colourScale = d3.scaleDiverging()
            .domain([1*colourStrength, 0, -1*colourStrength])
            .interpolator(d3.interpolateRdBu)
        
        addLegend()

        for(let row = 0; row<width; row++){
            for(let col = height-64; col<height; col++){

                drawShot(row, col)

            }
        }
        drawRink(g)
    }, [])

    return (
        <></>
    )
}

export default PlayerFinishingGrid