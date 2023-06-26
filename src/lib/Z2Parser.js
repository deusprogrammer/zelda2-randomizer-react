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
    isExtended,
    combineLevelData,
    extractMapEnemyData
} from './zelda2/Z2Utils';


export const parse = (rom) => {
    let isExtendedRom = isExtended(rom);

    let mode = isExtendedRom ? "RANDO" : "VANILLA";

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
    let enemyData = extractMapEnemyData(rom);
    let levelExits = extractLevelExits(rom);
    sideViewMaps = combineLevelData(sideViewMaps, levelExits, enemyData);

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
        enemyData,
        textData,
        isExtendedRom,
        rawBytes: rom
    }
}

export default parse;