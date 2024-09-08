import{useEffect, useRef} from 'react'
import * as d3 from 'd3'

//Componenet for making the finishing shot map (not heatmap)
function PlayerFinishing(props){
    //constant variables
    const setheight = useRef(92)
    const setwidth = useRef(85)
    const shotColorDict = {
        "GOAL": 'red',
        "SHOT": 'green',
        "MISS": "blue"
    }

    //function for converting an angle to radians
    function toRadians (angle) {
        let radians=  angle * (Math.PI / 180);
        return radians
        
    }

    //function that displays all of the shots
    const displayShots = (g) => {
        let shot, x, y, height = setheight.current, width = setwidth.current
        for(shot of props.data){
            if(shot.shotAngle>0){
                x=(width/2)-shot.shotDistance*Math.cos(toRadians(90-Number(shot.shotAngle)))
                y=(height-64)+shot.shotDistance*Math.sin(toRadians(90-Number(shot.shotAngle)))
            }
            else{
                x=(width/2)+shot.shotDistance*Math.cos(toRadians(90+Number(shot.shotAngle)))
                y=(height-64)+shot.shotDistance*Math.sin(toRadians(90+Number(shot.shotAngle)))
            }

            g.append("rect")
                .attr("x", x)
                .attr("y", y)
                .attr("width", 2)
                .attr("height", 2)
                .attr("fill", shotColorDict[shot.event])
                .attr("opacity", shot.event == "GOAL" ? 0.5 : 0.1)
        }
    }

    useEffect(() =>{
        let height = setheight.current
        let width = setwidth.current
        const svg = d3.select(props.svg)
        const g = svg.select("g")
        
        let row, col
        //early return if g element has yet to be made
        if(!g){
            return
        }

        if(!props.data){
            return
        }
        
        g.append("rect")
        .attr("y", 14)
        .attr("x", width/3)
        .attr("width", 2)
        .attr("height", 2)
        .attr("fill", 'green')

        g.append("rect")
            .attr("y", 10)
            .attr("x", width/3)
            .attr("width", 2)
            .attr("height", 2)
            .attr("fill", 'blue') 
            
        g.append("rect")
            .attr("y", 18)
            .attr("x", width/3)
            .attr("width", 2)
            .attr("height", 2)
            .attr("fill", 'red')  
            
        g.append("text")
            .attr("y", 12)
            .attr("x", 2*(width/5))
            .attr("fill", 'black')
            .style("font", "4px sans-serif")
            .text("Missed Shot")

        g.append("text")
            .attr("y", 16)
            .attr("x", 2*(width/5))
            .attr("fill", 'black')
            .style("font", "4px sans-serif")
            .text("Save")

        g.append("text")
            .attr("y", 20)
            .attr("x", 2*(width/5))
            .attr("fill", 'black')
            .style("font", "4px sans-serif")
            .text("Goal")

        displayShots(g)

    },[])

    return(<></>)
}

export default PlayerFinishing