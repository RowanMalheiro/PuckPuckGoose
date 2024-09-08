import {useState, useEffect, useRef, useWorker} from 'react'
import {useParams} from 'react-router-dom'
import Teamcard from './Teamcard'
import * as d3 from 'd3'
import ShotMap from '../ShotMap.js'
import ExcessShots from './ExcessShots'

function TeamPage(){
    const params = useParams()
    const [oData, setOData] = useState()
    const [dData, setDData] = useState()
    const [svg1, setSVG1] = useState()
    const [svg2, setSVG2] = useState()
    const [totalIceTime, setTotalIceTime] = useState(0)
    const [teamIceTime, setTeamIceTime] = useState(0)
    const svgRef1 = useRef(null)
    const svgRef2 = useRef(null)
    //width and height of the shotmaps
    const setheight = useRef(92)
    const setwidth = useRef(85)
    

    const fetchOffense = () => {
        fetch(`/data/${params.team}_shots.csv`)
            .then((response) => response.text())
            .then((csvText) => {
                setOData(d3.csvParse(csvText))
            })
    }

    const fetchDefence = () => {
        fetch('/data/shots_2022.csv')
            .then((response) => response.text())
            .then((csvText) => {
                let data = d3.csvParse(csvText)
                setDData(data.filter((d) => d.teamCode == d.awayTeamCode ? d.homeTeamCode == params.team : d.awayTeamCode == params.team))
            })
    }

    const calculateIceTime = () => {
        if(totalIceTime != 0){
            return
        }
        fetch("/data/teams.csv")
            .then((response) => response.text())
            .then((csvString) => {
                let runningIceTime = 0
                let teams = d3.csvParse(csvString).filter((d) => d.situation == "all")
                let iceTimes = teams.map((d) => Number(d.iceTime))
                for(let IT in iceTimes){
                    runningIceTime += iceTimes[IT]
                    if(teams[IT].team == params.team){
                       setTeamIceTime(iceTimes[IT])
                    }
                }
                setTotalIceTime(runningIceTime)
                
        })
    }

    useEffect(() => {
        console.log(dData)
        console.log(oData)
    }, [dData, oData])

    useEffect(() => {
        if(oData){
            return
        }
        setSVG1(svgRef1.current)
        setSVG2(svgRef2.current)
        calculateIceTime()
        fetchOffense()
        fetchDefence()
    }, [])

    return(
        <>
            <Teamcard team={params.team}/>
            <div className="player-shotmapconts">
            <div className="player-shotmap">
                <svg ref={svgRef1}>
                    <ShotMap svg={svg1} key={svg1}>
                        <ExcessShots key={oData} data={oData} svg={svg1} totalIceTime={totalIceTime} teamIceTime={teamIceTime}></ExcessShots>
                    </ShotMap>
                </svg>
                <p className='shotmap-label'>Team Offensive Pressure</p>
                <p className='shotmap-sublabel'>Excess shots per hour by the team for certain points of the ice relative to the league average</p>
            </div>
            <div className="player-shotmap">
                <svg ref={svgRef2}>
                    <ShotMap svg={svg2} key={svg2}>
                        <ExcessShots key={dData} data={dData} svg={svg2} totalIceTime={totalIceTime} teamIceTime={teamIceTime}></ExcessShots>
                    </ShotMap>
                </svg>
                <p className='shotmap-label'>Team Defensive Pressure</p>
                <p className='shotmap-sublabel'>Excess shots per hour by the opposing team for certain points of the ice relative to the league average</p>
            </div>
            </div>
            
        </>
    )
}
export default TeamPage