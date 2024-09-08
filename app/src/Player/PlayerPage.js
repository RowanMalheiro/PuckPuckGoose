import {useParams} from 'react-router-dom'
import ShotMap from '../ShotMap.js'
import {useEffect, useState, useRef} from 'react'
import PlayerFinishing from './PlayerFinishing.js'
import PlayerFinishingGrid from './PlayerFinishingGrid.js'
import * as d3 from 'd3'
import Playercard from './Playercard.js'
//Page for individual players
function PlayerPage(){
    const params = useParams()
    const svgRef1 = useRef(null)
    const svgRef2 = useRef(null)
    const [shotData, setShotData] = useState()
    const [svg, setsvg] = useState(null)

    const fetchShotData = (team) => {
        fetch(`/data/${team}_shots.csv`)
        .then((response) => response.text())
        .then((csvText) => {
            console.log(d3.csvParse(csvText)[0].shooterPlayerId)
            setShotData(d3.csvParse(csvText).filter((d) => d.shooterPlayerId == `${params.id}.0`))
        })
    }

    useEffect(() => {
        let teamName
        setsvg(svgRef1)
        if(shotData){
            return
        }
        fetch(`/data/skaters.csv`)
        .then((response) => response.text())
        .then((csvText) => {
            console.log(csvText)
            teamName = d3.csvParse(csvText).filter((d) => d.playerId == params.id)[0].team
            console.log(teamName)
            fetchShotData(teamName)
        })}, [])

    useEffect(() => {
        console.log(shotData)
    }, [shotData])


    return(
        <>
            <div className="playercard-wrapper">
                <Playercard id={params.id}/>
            </div>
            <div className="player-shotmapconts">
                <div className="player-shotmap">
                {!shotData ? <p>Loading...</p> : <></>}
                    <svg ref={svgRef1}>
                        <ShotMap key={svg} svg={svgRef1.current}>   
                            <PlayerFinishing key={shotData} svg={svgRef1.current} id={params.id} data={shotData}/>  
                        </ShotMap>               
                    </svg>
                <p className='shotmap-label'>Individual Player Scoring</p>
                <p className='shotmap-sublabel'>Locations of player shots including goals, misses, and saves</p>
                </div>
                <div className="player-shotmap">
                 {!shotData ? <p>Loading...</p> : <></>}
                    <svg ref={svgRef2}>
                        <ShotMap key={svg} svg={svgRef2.current}>   
                            <PlayerFinishingGrid key={shotData} svg={svgRef2.current} id={params.id} data={shotData}/>  
                        </ShotMap>               
                    </svg>
                <p className='shotmap-label'>Individual Player Finishing</p>
                <p className='shotmap-sublabel'>Heatmap of how good a player is at scoring from different regions on the ice</p>

                </div>
            </div>
            
            
        </>
    )
}
export default PlayerPage