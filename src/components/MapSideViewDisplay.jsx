import { drawMap } from "../lib/zelda2/Z2Utils"

export default ({level}) => {
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
        <div>
            <h5>Map</h5>
            {drawSideView(level)}
        </div>
    )
}