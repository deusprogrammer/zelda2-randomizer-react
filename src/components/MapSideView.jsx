import { Link } from "react-router-dom"

import MapSideViewData from "./MapSideViewData"
import MapSideViewDisplay from "./MapSideViewDisplay"
import MapSideViewExitData from "./MapSideViewExitData"

export default ({levelExits, maps, mapNumber, mapSet}) => {
    return (
        <div>
            <Link to={`${process.env.PUBLIC_URL}/`}><button>Back to World Map</button></Link>
            <MapSideViewDisplay level={maps[mapSet][mapNumber]} levelExitData={levelExits[mapSet][mapNumber]} mapSet={mapSet} />
            <MapSideViewData level={maps[mapSet][mapNumber]} />
            <MapSideViewExitData levelExitData={levelExits[mapSet][mapNumber]} />
        </div>
    )
}