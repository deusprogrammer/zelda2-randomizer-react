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
    isDigiShakeRando} from './zelda2/Z2Utils';


export const parse = (rom) => {
    let isDigiShake = isDigiShakeRando(rom);

    let mode = isDigiShake ? "RANDO" : "VANILLA";

    let nesHeaders = extractNESHeaders(rom);
    let nesOffsets = calculateNESOffsets(nesHeaders);
    let sideViewMaps = extractSideViewMapData(rom);
    let westHyruleMap = extractWestHyruleMapLocations(rom);
    let westHyruleSpriteMap = extractWestHyruleSpriteMap(rom, mode);
    let eastHyruleMap = extractEastHyruleMapLocations(rom);
    let eastHyruleSpriteMap = extractEastHyruleSpriteMap(rom, mode);
    let deathMountainHyruleMap = extractDeathMountainMapLocations(rom);
    let deathMountainHyruleSpriteMap = extractDeathMountainSpriteMap(rom, mode);
    let mazeIslandMountainHyruleMap = extractMazeIslandMapLocations(rom);
    let mazeIslandMountainHyruleSpriteMap = extractMazeIslandSpriteMap(rom, mode);
    let textData = extractTextData(rom);
    let levelExits = extractLevelExits(rom);
    let mapData = [westHyruleMap, deathMountainHyruleMap, eastHyruleMap, mazeIslandMountainHyruleMap];
    
    return {
        nesHeaders,
        nesOffsets,
        mapData,
        sideViewMaps,
        westHyruleMap,
        westHyruleSpriteMap,
        eastHyruleMap,
        eastHyruleSpriteMap,
        deathMountainHyruleMap,
        deathMountainHyruleSpriteMap,
        mazeIslandMountainHyruleMap,
        mazeIslandMountainHyruleSpriteMap,
        levelExits,
        textData,
        isDigiShake
    }
}

export default parse;