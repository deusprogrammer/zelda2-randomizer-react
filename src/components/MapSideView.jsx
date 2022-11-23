import { useState } from 'react';
import { Link } from "react-router-dom"

import MapSideViewData from "./MapSideViewData"
import MapSideViewDisplay from "./MapSideViewDisplay"
import MapSideViewExitData from "./MapSideViewExitData"

export default ({levelExits, maps, mapNumber, mapSet}) => {
    const [steps, setSteps] = useState(-1);

    return (
        <div>
            <h4>Actions</h4>
            <div className="data-div">
                <Link to={`${process.env.PUBLIC_URL}/`}><button>Back to World Map</button></Link>
            </div>
            <MapSideViewDisplay steps={steps} level={maps[mapSet][mapNumber]} levelExitData={levelExits[mapSet][mapNumber]} mapSet={mapSet} />
            <div style={{display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center"}}>
                <MapSideViewData onStepChange={(step) => {setSteps(step)}} level={maps[mapSet][mapNumber]} />
                <MapSideViewExitData levelExitData={levelExits[mapSet][mapNumber]} />
            </div>
        </div>
    )
}