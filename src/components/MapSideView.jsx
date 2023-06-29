import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import MapSideViewData from "./MapSideViewData"
import MapSideViewDisplay from "./MapSideViewDisplay"
import MapSideViewExitData from "./MapSideViewExitData"

export default ({location, map, enemyData}) => {
    const [steps, setSteps] = useState(-1);
    const [connectionData, setConnectionData] = useState({});

    return (
        <div>
            <h4>Actions</h4>
            <div className="data-div">
                <Link to={`${process.env.PUBLIC_URL}/`}><button>Back to World Map</button></Link>
            </div>
            <MapSideViewDisplay steps={steps} level={map} enemyData={enemyData} />
            <div style={{display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center"}}>
                <MapSideViewData location={location} onStepChange={(step) => {setSteps(step)}} level={map} enemyData={enemyData} />
                <MapSideViewExitData level={map} />
            </div>
        </div>
    )
}