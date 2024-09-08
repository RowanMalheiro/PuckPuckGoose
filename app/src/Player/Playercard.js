import {useEffect, useState, useRef} from 'react'
import PlayerScore from './PlayerScore.js' 
import PlayerBar from './PlayerBar.js'
import * as d3 from 'd3'
import {getTeamColour} from '../Team/Teams.js'
import '../css/PlayerPage.css'


function Playercard(props){
    //initialize variables (can be used anywhere within playercard)
    const [playerData, setPlayerData] = useState()
    const rawData = useRef(null)
    const [percentile, setPercentile] = useState()
    const [otherPercentiles, setOtherPercentiles] = useState()

    //general functions for drawing all of the graphs
    const drawPage = () => {
        getpScore()
        getBarData()
    }

    //Return the percentile of a value in an array
    const calculatePercentile = (values, index) => {
        return (index+1)/values.length*100
    }

    //Get the percentile of the player's average game score
    const getpScore = () => {
        const score = playerData.gameScore
        const pScoreArray = rawData.current.filter((player) => player.situation == "5on5" && player.games_played > 20 && player.position == playerData.position).map((player) => player.gameScore).sort((a,b) => a-b)
        setPercentile(calculatePercentile(pScoreArray, pScoreArray.findIndex((d) => d==score)))
    }

    //Returns percentile of stats based on data and a function
    function calculateStats(filteredData, func) {
        const value = func(playerData)
        const array = filteredData.map((player) => func(player)).sort((a, b) => a - b)
        const percentile = calculatePercentile(array, array.findIndex((d) => d == value))
        return percentile
      }

    //Get the percentile for all of the other stats displayed in the bars
    const getBarData = () => {
        let filteredData = rawData.current.filter((player) => player.situation == "5on5" && player.games_played > 20 && player.position == playerData.position)

        const goalsPercentile = calculateStats(filteredData, (object) => object[`I_F_goals`]/object.games_played)
        const pointsPercentile = calculateStats(filteredData, (object) => object[`I_F_points`]/object.games_played)
        const primaryAssistsPercentile = calculateStats(filteredData, (object) => object[`I_F_primaryAssists`]/object.games_played)
        const xGoalsPercentile = calculateStats(filteredData, (object) => object[`onIce_xGoalsPercentage`])
        const corsiPercentile = calculateStats(filteredData, (object) => object[`onIce_corsiPercentage`])
        const penaltyPercentile = calculateStats(filteredData, (object) => object[`penalityMinutesDrawn`]-object[`penalityMinutes`])
        const offensePercentile = calculateStats(filteredData, (object) => object[`OnIce_F_xGoals`]/object[`icetime`])
        const defencePercentile = 100 - calculateStats(filteredData, (object) => object[`OnIce_A_xGoals`]/object[`icetime`])
        const finishingPercentile = calculateStats(filteredData, (object) => object[`I_F_goals`]-object[`I_F_xGoals`])

        setOtherPercentiles([
            {stat: 'Goals', percentile: goalsPercentile},
            {stat: 'Assists', percentile: primaryAssistsPercentile},
            {stat: 'Points', percentile: pointsPercentile},
            {stat: 'xGoals', percentile: xGoalsPercentile},
            {stat: 'Corsi', percentile: corsiPercentile},
            {stat: 'Penalties', percentile: penaltyPercentile},
            {stat: 'Offense', percentile: offensePercentile},
            {stat: 'Defence', percentile: defencePercentile},
            {stat: 'Finishing', percentile: finishingPercentile},
        ])
    }

    useEffect(() => {
        //Fetch data
        fetch("/data/skaters.csv")
            .then(response => response.text())
            .then(csvString => {
                rawData.current = d3.csvParse(csvString).filter((player) => player.situation == "5on5")
                let i = rawData.current.find(player =>  player.playerId == props.id)
                setPlayerData(i)
            })
    }, []);

    useEffect(() => {
        if(playerData){
            drawPage()
        }
    }, [playerData])

    useEffect(() => {
    }, [otherPercentiles])
    
    //Return JSX for the playercard
    return(
        <div className="playercard-cont">
            {playerData ?
            (
            <>
                <div className="playercard-header">  
                    <img src={`/logos/${playerData.team}.png`} />
                    <p className="playercard-pname">{playerData.name}</p>
                    <PlayerScore percentile={percentile} key={percentile}></PlayerScore>
                </div>
                <div className="playercard-divider" style={{
                    backgroundColor: `${getTeamColour(playerData.team)}`
                }}></div>
                <div className="playercard-bars">
                    <PlayerBar key={otherPercentiles} data={otherPercentiles} color={getTeamColour(`${playerData.team}`)}></PlayerBar>
                </div>
            </>
            )
            : 
            (
                <p>loading...</p>  
            )
            }

        </div>
    )
}

export default Playercard