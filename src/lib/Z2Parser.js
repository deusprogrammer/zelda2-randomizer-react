const {
    printSpriteMap,
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
    extractBackMapData
} = require('./zelda2/Z2Utils');


export const parse = (rom, mode) => {
    let westHyruleMap = extractWestHyruleMapLocations(rom);
    let westHyruleSpriteMap = extractWestHyruleSpriteMap(rom, mode);
    let eastHyruleMap = extractEastHyruleMapLocations(rom);
    let eastHyruleSpriteMap = extractEastHyruleSpriteMap(rom, mode);
    let deathMountainHyruleMap = extractDeathMountainMapLocations(rom);
    let deathMountainHyruleSpriteMap = extractDeathMountainSpriteMap(rom, mode);
    let mazeIslandMountainHyruleMap = extractMazeIslandMapLocations(rom);
    let mazeIslandMountainHyruleSpriteMap = extractMazeIslandSpriteMap(rom, mode);
    let textData = extractTextData(rom);

    return {
        westHyruleMap,
        westHyruleSpriteMap,
        eastHyruleMap,
        eastHyruleSpriteMap,
        deathMountainHyruleMap,
        deathMountainHyruleSpriteMap,
        mazeIslandMountainHyruleMap,
        mazeIslandMountainHyruleSpriteMap,
        textData
    }
}