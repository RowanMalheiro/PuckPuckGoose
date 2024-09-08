import Navbar from './Navbar.js'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom"
import {useEffect, useState, useRef} from 'react'
import Home from './Home.js'
import Players from './Player/Players.js'
import Teams from './Team/Teams.js'
import PlayerPage from './Player/PlayerPage.js'
import TeamPage from './Team/TeamPage.js'
//import Misc from './Misc/Misc.js'
import * as d3 from 'd3'

function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route path = "/" element={<Home/>}></Route>
          <Route exact path = "/Players/:id" element = {<PlayerPage/>}/>
          <Route exact path = "Teams/:team" element = {<TeamPage/>}/>
          <Route path = "/Players" element={<Players/>}/>
          <Route path = "/Teams" element={<Teams/>}/>
          {//<Route path = "/Misc" element={<Misc/>}/>
          }
        </Routes>
    </Router>
    </>
  );
}

export default App;