import { useNavigate } from "react-router";
import { drawMap } from "../lib/zelda2/Z2Utils"

export default ({level, steps, enemyData}) => {
    const navigate = useNavigate();

    let {exits: levelExitData, mapSetNumber: mapSet, header} = level;

    const drawSideView = (level, steps) => {
        let mapBuffer = drawMap(level, null, steps);
        let mapBlocks = [];
        mapBuffer.forEach((mapBlock, index) => {
            let x = index % (16 * (header.widthOfLevelInScreens + 1));
            let y = Math.floor(index / (16 * (header.widthOfLevelInScreens + 1)));

            let found = enemyData.enemies.find(({x: x1, y: y1}) => {
                if (y1 === 0) {
                    y1 = 1;
                } else {
                    y1 += 2;
                }

                return x === x1 && y === y1;
            });

            let border = null;
            if (found) {
                border = "1px solid yellow";
            }

            if (!mapBlock || mapBlock.clear) {
                mapBlocks.push(
                    <div className="side-view-block" style={{border}} />
                );
            } else {
                let backgroundColor = "gray";
                if (mapBlock.locked) {
                    backgroundColor = "yellow";
                } if (mapBlock.breakable) {
                    backgroundColor = "purple";
                } else if (mapBlock.solid) {
                    backgroundColor = "white";
                } else if (mapBlock.name === "lava") {
                    backgroundColor = "red";
                } else if (mapBlock.collectable) {
                    backgroundColor = "green";
                }
                mapBlocks.push(
                    <div className="side-view-block" style={{backgroundColor, border}} />
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