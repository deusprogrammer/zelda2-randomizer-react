import MapSideViewData from "./MapSideViewData";
import MapSideViewDisplay from "./MapSideViewDisplay";

export default ({locationData, maps, continent}) => {
    return Object.keys(locationData).map((key) => {
        let location = locationData[key];
        let mapNumber = location.mapNumber;
        let mapSet = 0;

        if (location.mapSet === 0 && location.continent === 0) {        // Overworld
            mapSet = continent;
        } else if (location.mapSet === 1 || location.mapSet === 2) {    // Towns
            mapSet = 4;
        } else if (location.mapSet > 2) {                               // Palaces
            mapSet = location.mapSet + 2;
        } else {
            return null;
        }
        return (
            <div>
                <h5>{key}</h5>
                <MapSideViewData level={maps[mapSet][mapNumber]} />
                <MapSideViewDisplay level={maps[mapSet][mapNumber]} />
            </div>
        )
    });
}