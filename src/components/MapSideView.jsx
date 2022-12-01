import { useState } from 'react';
import { Link } from "react-router-dom"
import { ITEM_MAP } from '../lib/zelda2/Z2Utils';

import MapSideViewData from "./MapSideViewData"
import MapSideViewDisplay from "./MapSideViewDisplay"
import MapSideViewExitData from "./MapSideViewExitData"

export default ({location, map}) => {
    const [steps, setSteps] = useState(-1);

    return (
        <div>
            <h4>Actions</h4>
            <div className="data-div">
                <Link to={`${process.env.PUBLIC_URL}/`}><button>Back to World Map</button></Link>
            </div>
            <MapSideViewDisplay steps={steps} level={map} />
            <div style={{display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center"}}>
                <MapSideViewData location={location} onStepChange={(step) => {setSteps(step)}} level={map} />
                <MapSideViewExitData level={map} />
            </div>
        </div>
    )
}