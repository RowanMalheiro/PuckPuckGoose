import * as d3 from 'd3'
import {useEffect, useState, useRef} from 'react'
import './css/HomePage.css'

function Home(){
  return(
    <div className="body" id="body">
      <section className="sectioncont">
        <div className="section-head"><h1 className="text-bigger">ABOUT</h1></div>
        <div className="section">
          <div className="subsection-other">
            <div className="nav-buttoncont"><a href="/Players" className="nav-buttons"> To Players</a></div>
            <div className="nav-buttoncont"><a href="/Teams" className="nav-buttons" >To Teams</a></div>
            <div className="nav-buttoncont"><a href="/Misc" className="nav-buttons">To Misc</a></div>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">General Info</h1>
            <p className="text-small">This is an NHL visualizations website made by Rowan & Sid for the independent study unit in ICS4U.</p>
            <p className="text-small">The Player page contains data visualizations for NHL player analytics.</p>
            <p className="text-small">The Team page contains data visualizations for NHL team analytics.</p>
            <p className="text-small">The Misc (Miscellaneous) page contains scatterplots that illustrate NHL team analytics in comparison to other teams.</p>
          </div>
        </div>
      </section>


      <section className="sectioncont">
        <div className="section-head">
          <h1 className="text-bigger">USER GUIDE</h1>
        </div>
        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/clicky.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Navigation Bar</h1>
            <p className="text-small">Clicking one of the buttons in the horizontal bar at the top of the website will redirect you to the corresponding page.</p>
          </div>
        </div>
        
        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/searchex.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Search Bar</h1>
            <p className="text-small">Begin typing to search for a player or a team. As you type, a drop-down list of suggested search terms should appear below the search field. This list will update in real-time as you type. If you see a suggested search term that matches what you are looking for, you can select it from the drop-down list by clicking on it. Selecting a player or team should redirect you to their page.</p>
          </div>
        </div>
        <div className="section"></div>
        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/dice.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Random Search</h1>
            <p className="text-small">Clicking on the random search button (dice button) will redirect you to a random team or player page.</p>
          </div>
        </div>

        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/player-score.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Player Scores</h1>
            <p className="text-small">On the right side of each player's name is a number that represents their percentile of the average game score. The colour of the box containing the percentile directly corresonds with the number, scaling from blue to red with a white midpoint. The darker the shade of blue is, the lower the percentile. Similarly, the darker the shade of red is, the higher the percentile.</p>
          </div>
        </div>

        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/team-score.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Team Scores</h1>
            <p className="text-small">On the right side of each team's name is a number that aims to represent how good a team is. The number is a percentile of the teams expected goals. The colour of the box containing the percentile directly corresonds with the number, just like the player scores.</p>
          </div>
        </div>

        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/player-bars.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Player Bar Graphs</h1>
            <p className="text-small">Each player has bars that represent how good they are in each category. There are 9 bars for each player: Goals, Assists, Points, xGoals, Corsi, Penalties, Offence, Defence and Finishing.</p>
          </div>
        </div>

        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/team-bars.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Team Bar Graphs</h1>
            <p className="text-small">Each team has bars that represent how good they are in each category. There are 7 bars for each player: Goals, Goals Against, Fenwick, Penalties, Finishing, Powerplay and Penalty Kill.</p>
          </div>
        </div>

        <div className="section">
          <div className="subsection-big">
            <h1 className="text-big">Bar Graph Categories</h1>
            <p className="text-small">
              <b>Goals Percentile:</b> Goals scored by a team or player per game played<br/>
              <b>Assists Percentile:</b> Assists made by a player per game<br/>
              <b>Points Percentile:</b> Points scored by a player per game<br/>
              <b>xGoals Percentile:</b> Expected goals (based on shot quality and quantity) by a team or player per game played<br/>
              <b>Corsi Percentile:</b> Total shot attempts (shots on goal, missed shots, and blocked shots) for a player relative to their opponents per game played<br/>
              <b>Penalties Percentile:</b> Total penalty minutes taken by a team or player per game played<br/>
              <b>Offence Percentile:</b> Overall offensive performance of a team or player, based on various statistics such as goals, assists, and shots per game played<br/>
              <b>Defence Percentile:</b> Overall defensive performance of a team or player, based on various statistics such as blocked shots, takeaways, and hits per game played<br/>
              <b>Finishing Percentile:</b> Ability of a team or player to convert scoring chances into goals per game played<br/>
              <b>Goals Against Percentile:</b> Goals allowed by a team or player per game played<br/>
              <b>Fenwick Percentile:</b> Total shot attempts (shots on goal and missed shots) for a team or player relative to their opponents per game played, excluding blocked shots<br/>
              <b>Powerplay Percentile:</b> Percentage of power play opportunities in which a team or player scores a goal<br/>
              <b>Penalty Kill Percentile:</b> Percentage of penalty kill opportunities in which a team or player prevents the opponent from scoring a goal<br/>
            </p>
          </div>
        </div>

        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/player-shotmaps.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Player Shotmaps</h1>
            <p className="text-small">Every player has two shotmaps: Individual Player Scoring and Individual Player Finishing. Each shotmap displays one half of the rink, specifically the attacking or offensive zone, and provides a visual representation of a player's shooting tendencies. By analyzing them, users can gain insights into a player's preferred shooting areas and their success rate from different locations on the ice.</p>
          </div>
        </div>

        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/teamheat1.png`} className="userguide-img"/>
            <img src={`/guide-images/teamheat2.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Team Shotmaps</h1>
            <p className="text-small">Every team has two shotmaps: Team Offensive Pressure and Team Defensive Pressure. These shotmaps are heatmaps that visually represent how much pressure a team puts on their opponents offensively and defensively. The heatmap of Team Offensive Pressure shows the areas of the ice where the team is most active in generating offensive opportunities. The heatmap is color-coded to indicate the level of offensive pressure, with red representing high pressure areas and blue representing low-pressure areas. The areas where the team takes the most shots or spends the most time in the offensive zone are highlighted in red. On the other hand, the heatmap of Team Defensive Pressure shows the areas of the ice where a team is most effective in defending against their opponents. The heatmap is color-coded in a similar way as the Team Offensive Pressure heatmap, with red indicating high-pressure defensive areas and blue indicating low-pressure defensive areas. Areas where the team is most successful in limiting their opponents' shots or puck possession are highlighted in red.</p>
          </div>
        </div>

        <div className="section">
          <div className="subsection-other">
            <img src={`/guide-images/misc.png`} className="userguide-img"/>
          </div>
          <div className="subsection-info">
            <h1 className="text-big">Scatterplots</h1>
            <p className="text-small">The upper-right corner of each scatterplot represents the combination of the two variables on the x and y axes that are considered the most favorable or desirable, while the lower-left corner represents the combination of the two variables that are considered the least favorable or desirable. The other two corners of the graph represent the combinations of the variables that fall in between these two extremes.</p>
          </div>
        </div>

      </section>

    </div>      
  ) 
}

export default Home;