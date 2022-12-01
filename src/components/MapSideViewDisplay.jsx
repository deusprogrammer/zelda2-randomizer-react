import { useNavigate } from "react-router";
import { drawMap } from "../lib/zelda2/Z2Utils"

export default ({level, steps}) => {
    const navigate = useNavigate();

    let {exit: levelExitData, mapSetNumber: mapSet} = level;

    const drawSideView = (level, steps) => {
        let mapBuffer = drawMap(level, null, steps);
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
                } else if (mapBlock.collectable) {
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
                <div><button onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${levelExitData.upExit.mapNumber}`)}} disabled={levelExitData.upExit.mapNumber === 63 || levelExitData.upExit.mapNumber === 0 && levelExitData.upExit.xCoord === 0} className="top">Up</button></div>
                <div></div>
                <div><button onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${levelExitData.leftExit.mapNumber}`)}} disabled={levelExitData.leftExit.mapNumber === 63 || levelExitData.leftExit.mapNumber === 0 && levelExitData.leftExit.xCoord === 0} className="side">Left</button></div>
                {drawSideView(level, steps)}
                <div><button onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${levelExitData.rightExit.mapNumber}`)}} disabled={levelExitData.rightExit.mapNumber === 63 || levelExitData.rightExit.mapNumber === 0 && levelExitData.rightExit.xCoord === 0} className="side">Right</button></div>
                <div></div>
                <div><button onClick={() => {navigate(`${process.env.PUBLIC_URL}/maps/${mapSet}/${levelExitData.downExit.mapNumber}`)}} disabled={levelExitData.downExit.mapNumber === 63 || levelExitData.downExit.mapNumber === 0 && levelExitData.downExit.xCoord === 0} className="top">Down</button></div>
                <div></div>
            </div>
        </>
    )
}