import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Players.css'
import * as d3 from 'd3'

function Players(){
    //useState is a function that declares a function to change the value of a variable
    const [playerName, setPlayerName] = useState("");
    const [data, setData] = useState()
    const [playerList, setPlayerList] = useState([])
    const navigate = useNavigate()
    

    //[]= runs only when the page is open for the first time, creates a list of all player names   
    useEffect(() => {
        fetch("/data/skaters.csv")
            .then(response => response.text())
            .then(csvString => {
                const rawData = d3.csvParse(csvString)
                //Filter out the data so there is only 1 entry per player and only have players with > 20 games
                setData(rawData.filter(player => player.situation.includes("5on5") && player.games_played > 20))
            })
    }, []);

    //runs whenever player name changes (name in search bar)
    useEffect(() => {
        //checks for data, exits if the data doesnt exist before trying to set the player list
        if(!data){
            return
        }
        setPlayerList(data.filter(player => player.name.toLowerCase().includes(playerName.toLowerCase())))
    }, [playerName])

    function luckyButton (){
        navigate(`/Players/${data[Math.floor(Math.random() * data.length)].playerId}`)
    }


    //className for the css stuffs
    //href for page name thing
    return(  
        <>
            <form>
                <label className='player-label'>Player:</label>
   
                <div className='searchbarcont'>
                    <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder='Search for player'/>
                    <div className='buttoncont'>
                        <button onClick={luckyButton}>
                            <img src={`/rand-dice.png`} title="Random search"/>
                        </button>
                    </div> 
                </div>              
                
                <div className="player-selectcont">
                {playerList.map((player, i) => {
                    if(i<52)
                        return <a href={`/Players/${player.playerId}`}>
                            <div className="player-select">
                                <div className="player-imgcont">
                                    <img src={`/logos/${player.team}.png`} alt="" className="player-img"/>
                                </div>
                                <p1 className="player-name">{player.name}</p1>
                            </div>
                        </a>
                })}
                </div>
            </form>
        </>
    )
}

export default Players;