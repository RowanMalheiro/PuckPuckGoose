import './css/index.css'

function Navbar(){
    return(
        <div className="navbar">
            <a href="/" className="nav-home">Home</a>
            <a href="/Players" className="nav-option">Players</a>
            <a href="/Teams" className="nav-option">Teams</a>
            <a href="/Misc" className="nav-option">Misc</a>
        </div>
    )
}

export default Navbar