import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Players.css'
import * as d3 from 'd3'

export function getTeamColour(abbrv){
    const teamColour = {
        'ANA': 'brown',
        'ARI': 'maroon',
        'BOS': 'orange',
        'BUF': 'blue',
        'CGY': 'red',
        'CAR': 'red',
        'CHI': 'red',
        'COL': 'maroon',
        'CBJ': 'blue',
        'DAL': 'green',
        'DET': 'red',
        'EDM': 'orange',
        'FLA': 'red',
        'LAK': 'black',
        'MIN': 'green',
        'MTL': 'blue',
        'NSH': 'orange',
        'NJD': 'red',
        'NYI': 'blue',
        'NYR': 'blue',
        'OTT': 'red',
        'PHI': 'orange',
        'PIT': 'orange',
        'SEA': 'teal',
        'SJS': 'teal',
        'STL': 'blue',
        'TBL': 'blue',
        'TOR': 'blue',
        'VAN': 'blue',
        'VGK': 'gold',
        'WSH': 'red',
        'WPG': 'blue'
    }
    return teamColour[abbrv]    
}

export function getFullTeamName(abbrv){
    const convTeamName = {
        'ANA': 'Anaheim Ducks',
        'ARI': 'Arizona Coyotes',
        'BOS': 'Boston Bruins',
        'BUF': 'Buffalo Sabres',
        'CGY': 'Calgary Flames',
        'CAR': 'Carolina Hurricanes',
        'CHI': 'Chicago Blackhawks',
        'COL': 'Colorado Avalanche',
        'CBJ': 'Columbus Blue Jackets',
        'DAL': 'Dallas Stars',
        'DET': 'Detroit Red Wings',
        'EDM': 'Edmonton Oilers',
        'FLA': 'Florida Panthers',
        'LAK': 'Los Angeles Kings',
        'MIN': 'Minnesota Wild',
        'MTL': 'Montreal Canadiens',
        'NSH': 'Nashville Predators',
        'NJD': 'New Jersey Devils',
        'NYI': 'New York Islanders',
        'NYR': 'New York Rangers',
        'OTT': 'Ottawa Senators',
        'PHI': 'Philadelphia Flyers',
        'PIT': 'Pittsburgh Penguins',
        'SEA': 'Seattle Kraken',
        'SJS': 'San Jose Sharks',
        'STL': 'St. Louis Blues',
        'TBL': 'Tampa Bay Lightning',
        'TOR': 'Toronto Maple Leafs',
        'VAN': 'Vancouver Canucks',
        'VGK': 'Vegas Golden Knights',
        'WSH': 'Washington Capitals',
        'WPG': 'Winnipeg Jets'
    }
    return convTeamName[abbrv]
}

function Teams(){
    const [teamName, setTeamName] = useState("")
    const [data, setData] = useState()
    const [teamList, setTeamList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/data/teams.csv")
            .then(response => response.text())
            .then(csvString => {
                const rawData = d3.csvParse(csvString)
                setData(rawData.filter(team => team.situation.includes("5on5")))
                console.log(data)
            })
    }, []);

    useEffect(() => {
        console.log(data)
        if(!data){
            return
        }
        setTeamList(data.filter(team => getFullTeamName(team.team).toLowerCase().includes(teamName.toLowerCase())))
        console.log(teamList)
    }, [teamName])

    function luckyButton (){
        navigate(`/Teams/${data[Math.floor(Math.random() * data.length)].team}`)
    }

    return(  
        <>
            <form>
            <label className='player-label'>Team:</label>
            <div className='searchbarcont'>
                <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder='Search for a team'/>
                    <div className='buttoncont'>
                        <button onClick={luckyButton}>
                            <img src={`/rand-dice.png`} title="Random search"/>
                        </button>
                    </div> 
                </div>   
                <div className="player-selectcont">
                {teamList.map((team, i) => {
                    if(i<52)
                        return <a href={`/Teams/${team.team}`}>
                            <div className="player-select">
                                <div className="player-imgcont">
                                    <img src={`/logos/${team.team}.png`} alt="" className="player-img"/>
                                </div>
                                <p1 className="player-name">{getFullTeamName(team.team)}</p1>
                            </div>
                        </a>
                })}
                </div>
                </form>
        </>
    )

}

export default Teams