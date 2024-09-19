import React from "react"
import { Link } from "react-router-dom";
import '../App.css'
function Welcome(){
    return(
        <div className="welcome">
        <h1>Welcome! Take survey</h1>
        <Link to="/survey">  <button>Start</button></Link>
        </div>

    )
}
export default Welcome;
