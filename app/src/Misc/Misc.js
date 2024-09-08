import { useRef, useEffect, useState } from 'react'
import { getFullTeamName } from '../Team/Teams'
import {Scatterplot} from './Scatterplot.js'
import * as d3 from 'd3'

function Misc(){
    const svg = useRef(null)
    const [plot1xData,setPlot1xData] = useState(), [plot1yData,setPlot1yData] = useState(), [teams, setTeams] = useState()
    const [plot2xData,setPlot2xData] = useState(), [plot2yData,setPlot2yData] = useState()
    const [plot3xData,setPlot3xData] = useState(), [plot3yData,setPlot3yData] = useState()
    const [plot4xData,setPlot4xData] = useState(), [plot4yData,setPlot4yData] = useState()

    const setPlot1 = (data) => {
        let filteredData = data.filter((d) => d.situation == "5on5")
        setPlot1xData(filteredData.map((d) => Number(d.xGoalsFor)))
        setPlot1yData(filteredData.map((d) => Number(d.xGoalsAgainst)))
    }

    const setPlot2 = (data) => {
        let filteredData = data.filter((d) => d.situation == "5on5")
        setPlot2xData(filteredData.map((d) => Number(d.hitsFor)))
        setPlot2yData(filteredData.map((d) => Number(d.hitsAgainst)))
    }

    const setPlot3 = (data) => {
        let filteredData = data.filter((d) => d.situation == "5on5")
        setPlot3xData(filteredData.map((d) => Number(d.goalsFor)))
        setPlot3yData(filteredData.map((d) => Number(d.xGoalsFor)))
    }

    const setPlot4 = (data) => {
        let ppData= data.filter((d) => d.situation == "5on4")
        let pkData= data.filter((d) => d.situation == "4on5")
        setPlot4xData(ppData.map((d) => Number(d.xGoalsFor)))
        setPlot4yData(pkData.map((d) => Number(d.xGoalsAgainst)))
    }
    
    useEffect(() => {
        fetch('/data/teams.csv')
            .then((response) => response.text())
            .then((csvText) => {
                const data = d3.csvParse(csvText)
                setTeams(data.filter((d) => d.situation == "all").map((d) => d.team))
                setPlot1(data)
                setPlot2(data)
                setPlot3(data)
                setPlot4(data)
            })
    }, [])
    return(
        <>
        <div className="player-shotmapconts">
            <div className="player-shotmap">
                <Scatterplot key={plot1yData} xData={plot1xData} yData={plot1yData} teams={teams} xLabel="Expected Goals" yLabel={"Expected Goals Against"} title="xGoals vs xGoalsAgainst" invertedxScale={false} invertedyScale={true}></Scatterplot>
            </div>
            <div className="player-shotmap">
                <Scatterplot key={plot2yData} xData={plot2xData} yData={plot2yData} teams={teams} xLabel="Hits For" yLabel="Hits Against" title="Hits for vs Hits Against" invertedxScale={false} invertedyScale={true}></Scatterplot>
            </div>
        </div>
        <div className="player-shotmapconts">
             <div className="player-shotmap">
                 <Scatterplot key={plot3yData} xData={plot3xData} yData={plot3yData} teams={teams} xLabel="Goals" yLabel="Expected Goals" title="League finishing" invertedxScale={false} invertedyScale={false}></Scatterplot>
             </div>
             <div className="player-shotmap">
                 <Scatterplot key={plot4yData} xData={plot4xData} yData={plot4yData} teams={teams} xLabel="PP xG" yLabel="PK xGA" title="Powerplay vs Penalty Kill" invertedxScale={false} invertedyScale={true}></Scatterplot>
             </div>
         </div>
         </>
    )
}
export default Misc