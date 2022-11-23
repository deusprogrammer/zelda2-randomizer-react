import { useNavigate } from "react-router";
import { drawMap } from "../lib/zelda2/Z2Utils"

export default ({level, levelExitData, mapSet}) => {
    const navigate = useNavigate();

    const drawSideView = (level) => {
        let mapBuffer = drawMap(level);
        let mapBlocks = [];
        mapBuffer.forEach((mapBlock) => {
            if (!mapBlock || mapBlock.clear) {
                mapBlocks.push(
                    <div className="side-view-block" />
                );
            } else {
                let backgroundColor = "gray";
                if (mapBlock.solid) {
                    backgroundColor = "white"
                } else if (mapBlock.name === "lava") {
                    backgroundColor = "red";
                } else if (mapBlock.name === "collectible") {
                    backgroundColor = "green";
                }
                mapBlocks.push(
                    <div className="side-view-block" style={{backgroundColor}} />
                );
            }
        });

        return (
            <div className="side-view">
                {mapBlocks}
            </div>
        )
    }

    return (
        <>
            <h5>Map</h5>
            <div className="side-view-map-grid">
                <div></div>
                <div><button onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${levelExitData.upExit.mapNumber}`)}} disabled={levelExitData.upExit.mapNumber === 63} className="top">Up</button></div>
                <div></div>
                <div><button onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${levelExitData.leftExit.mapNumber}`)}} disabled={levelExitData.leftExit.mapNumber === 63} className="side">Left</button></div>
                {drawSideView(level)}
                <div><button onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${levelExitData.rightExit.mapNumber}`)}} disabled={levelExitData.rightExit.mapNumber === 63} className="side">Right</button></div>
                <div></div>
                <div><button onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${levelExitData.downExit.mapNumber}`)}} disabled={levelExitData.downExit.mapNumber === 63} className="top">Down</button></div>
                <div></div>
            </div>
        </>
    )
}