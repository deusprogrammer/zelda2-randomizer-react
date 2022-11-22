import { drawMap } from "../lib/zelda2/Z2Utils"

export default ({level}) => {
    const drawSideView = (level) => {
        let mapBuffer = drawMap(level);
        let mapBlocks = [];
        mapBuffer.forEach((mapBlock) => {
            if (!mapBlock) {
                mapBlocks.push(
                    <div className="side-view-block" />
                );
            } else {
                let color = "gray";
                if (mapBlock.solid) {
                    color = "black"
                } else if (mapBlock.name === "lava") {
                    color = "red";
                } else if (mapBlock.name === "collectible") {
                    color = "green";
                }
                mapBlocks.push(
                    <div className="side-view-block" style={{backgroundColor: color}} />
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
            {drawSideView(level)}
        </div>
    )
}