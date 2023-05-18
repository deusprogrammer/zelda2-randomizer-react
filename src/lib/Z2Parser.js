import { calculateNESOffsets, extractNESHeaders } from './nes/NESUtils';
import {
    extractEastHyruleSpriteMap,
    extractWestHyruleSpriteMap,
    extractWestHyruleMapLocations,
    extractEastHyruleMapLocations,
    extractSideViewMapData,
    extractLevelExits,
    extractDeathMountainMapLocations,
    extractDeathMountainSpriteMap,
    extractMazeIslandSpriteMap,
    extractMazeIslandMapLocations,
    extractTextData,
    isDigiShakeRando,
    combineLevelData
} from './zelda2/Z2Utils';


export const parse = (rom) => {
    let isDigiShake = isDigiShakeRando(rom);

    let mode = isDigiShake ? "RANDO" : "VANILLA";

    let nesHeaders = extractNESHeaders(rom);
    let nesOffsets = calculateNESOffsets(nesHeaders);

    let westHyruleMap = extractWestHyruleMapLocations(rom);
    let westHyruleSpriteMap = extractWestHyruleSpriteMap(rom, mode);

    let eastHyruleMap = extractEastHyruleMapLocations(rom);
    let eastHyruleSpriteMap = extractEastHyruleSpriteMap(rom, mode);

    let deathMountainHyruleMap = extractDeathMountainMapLocations(rom);
    let deathMountainHyruleSpriteMap = extractDeathMountainSpriteMap(rom, mode);

    let mazeIslandMountainHyruleMap = extractMazeIslandMapLocations(rom);
    let mazeIslandMountainHyruleSpriteMap = extractMazeIslandSpriteMap(rom, mode);

    let sideViewMaps = extractSideViewMapData(rom);
    let levelExits = extractLevelExits(rom);
    sideViewMaps = combineLevelData(sideViewMaps, levelExits);

    let textData = extractTextData(rom);

    let overworld = [
        { 
            locations: westHyruleMap, 
            spriteMap: westHyruleSpriteMap, 
            worldNumber: 0, 
            index: 0 
        },
        { 
            locations: deathMountainHyruleMap, 
            spriteMap: deathMountainHyruleSpriteMap, 
            worldNumber: 1, 
            index: 1 
        },
        { 
            locations: eastHyruleMap, 
            spriteMap: eastHyruleSpriteMap, 
            worldNumber: 2, 
            index: 2 
        },
        { 
            locations: mazeIslandMountainHyruleMap, 
            spriteMap: mazeIslandMountainHyruleSpriteMap, 
            worldNumber: 3, 
            index: 3 
        }
    ];

    return {
        nesHeaders,
        nesOffsets,
        overworld,
        sideViewMaps,
        textData,
        isDigiShake,
        rawBytes: rom
    }
}

export default parse;