import MapSideViewData from "./MapSideViewData"
import MapSideViewDisplay from "./MapSideViewDisplay"
import MapSideViewExitData from "./MapSideViewExitData"

export default ({levelExits, maps, mapNumber, mapSet}) => {
    return (
        <div>
            <MapSideViewDisplay level={maps[mapSet][mapNumber]} levelExitData={levelExits[mapSet][mapNumber]} mapSet={mapSet} />
            <MapSideViewData level={maps[mapSet][mapNumber]} />
            <MapSideViewExitData levelExitData={levelExits[mapSet][mapNumber]} />
        </div>
    )
}