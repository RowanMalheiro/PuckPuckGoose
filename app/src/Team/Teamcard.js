import {useEffect, useState, useRef} from 'react'
import * as d3 from 'd3'
import {getFullTeamName, getTeamColour} from './Teams'
import PlayerBar from '../Player/PlayerBar'
import PlayerScore from '../Player/PlayerScore'
import '../css/PlayerPage.css'

function Teamcard(props){
    const [teamData, setTeamData] = useState()
    const rawData = useRef(null)
    const [percentile, setPercentile] = useState()
    const [otherPercentiles, setOtherPercentiles] = useState()

    //functions stolen from the Playercard function, changed to fit teams instead of players
    //general functions for drawing all of the graphs
    function calculateStats(filteredData, func) {
        const value = func(filteredData.find((team) => team.name == props.team))
        const array = filteredData.map((team) => func(team)).sort((a, b) => a - b)
        const percentile = calculatePercentile(array, array.findIndex((d) => d == value))
        return percentile
    }

    const drawPage = () => {
        getpScore()
        getBarData()
    }

    //Return the percentile of a value in an array
    const calculatePercentile = (values, index) => {
        return (index+1)/values.length*100
    }

    //Get the percentile of the team's xGoals
    const getpScore = () => {
        const xGoals = teamData.xGoalsPercentage
        const xGoalArray = rawData.current.filter((team) => team.situation == "all").map((team) => team.xGoalsPercentage).sort((a,b) => a-b)
        setPercentile(calculatePercentile(xGoalArray, xGoalArray.findIndex((d) => d==xGoals)))
    }

    const getBarData = () => {
        let filteredData = rawData.current.filter((team) => team.situation == "all")
        let ppData = rawData.current.filter((team) => team.situation == "5on4")
        let pkData = rawData.current.filter((team) => team.situation == "4on5")

        const goalsPercentile = calculateStats(filteredData, (object) => object[`goalsFor`]/object.games_played)
        const fenwickPercentile = calculateStats(filteredData, (object) => object[`fenwickPercentage`])
        const GoalsAgainstPercentile = 100-calculateStats(filteredData, (object) => object[`goalsAgainst`])
        const penaltyPercentile = calculateStats(filteredData, (object) => object[`penaltiesFor`]/object.games_played)
        const finishingPercentile = calculateStats(filteredData, (object) => object.goalsFor-object.xGoalsFor)
        const ppPercentile = calculateStats(ppData, (object) => object.xGoalsFor/object.iceTime)
        const pkPercentile = 100-calculateStats(pkData, (object) => object.xGoalsAgainst/object.iceTime)


        setOtherPercentiles([
            {stat: 'Goals', percentile: goalsPercentile},
            {stat: 'Goals Against', percentile: GoalsAgainstPercentile},
            {stat: 'Fenwick', percentile: fenwickPercentile},
            {stat: 'Penalties', percentile: penaltyPercentile},
            {stat: 'Finishing', percentile: finishingPercentile},
            {stat: 'Powerplay', percentile: ppPercentile},
            {stat: 'Penalty Kill', percentile: pkPercentile}
        ])
        console.log(otherPercentiles)
    }

    useEffect(() => {
        //Fetch data
        fetch("/data/teams.csv")
            .then(response => response.text())
            .then(csvString => {
                rawData.current = d3.csvParse(csvString)
                let i = rawData.current.find(team =>  team.team == props.team && team.situation == 'all')
                setTeamData(i)
            })    
    }, []);

    useEffect(() => {
        if(teamData){
            drawPage()
        }
    }, [teamData])
    
    //Return JSX for the teamcard
    return(
        <div className="playercard-cont">
            {teamData ?
            (
            <>
                <div className="playercard-header">  
                    <img src={`/logos/${teamData.team}.png`} />
                    <p className="playercard-pname">{getFullTeamName(teamData.team)}</p>
                    <PlayerScore percentile={percentile} key={percentile}></PlayerScore>
                </div>
                <div className="playercard-divider" style={{
                    backgroundColor: `${getTeamColour(teamData.team)}`
                }}></div>
                <div className="playercard-bars">
                    <PlayerBar key={otherPercentiles} data={otherPercentiles} color={getTeamColour(`${teamData.team}`)}></PlayerBar>
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
export default Teamcard