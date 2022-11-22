const toFileAddr = (ramAddress, bank) => {
    return (ramAddress - 0x8000) + (bank * 0x4000) + 0x10;
}

const TOWN_PPU_DATA_OFFSET = 0x007B3;
const PPU_DATA_LENGTH = 0x4;

const LEVEL_EXIT_MAPPING = [
    {
        name: 'mapNumber',
        relOffset: 0x00,
        mask: 0b11111100
    },
    {
        name: 'xCoord',
        relOffset: 0x00,
        mask: 0b00000011
    }
];

const LEVEL_EXITS_MAPPING = {
    leftExit: {
        size: 0x1,
        offset: 0x0,
        fields: LEVEL_EXIT_MAPPING
    },
    downExit: {
        size: 0x1,
        offset: 0x1,
        fields: LEVEL_EXIT_MAPPING
    },
    upExit: {
        size: 0x1,
        offset: 0x2,
        fields: LEVEL_EXIT_MAPPING
    },
    rightExit: {
        size: 0x1,
        offset: 0x3,
        fields: LEVEL_EXIT_MAPPING
    }
}

const LEVEL_HEADER_MAPPING = [
    {
        name: 'sizeOfLevel',
        relOffset: 0x00,
        mask: 0b11111111
    },
    //------------------------------------
    {
        name: 'objectSet',
        relOffset: 0x01,
        mask: 0b10000000
    },
    {
        name: 'widthOfLevelInScreens',
        relOffset: 0x01,
        mask: 0b01100000
    },
    {
        name: 'reserved1',
        relOffset: 0x01,
        mask: 0b00010000
    },
    {
        name: 'grass',
        relOffset: 0x01,
        mask: 0b00001000
    },
    {
        name: 'bushes',
        relOffset: 0x01,
        mask: 0b00000100
    },
    {
        name: 'reserved2',
        relOffset: 0x01,
        mask: 0b00000011
    },
    //------------------------------------
    {
        name: 'noCeiling',
        relOffset: 0x02,
        mask: 0b10000000
    },
    {
        name: 'groundTiles',
        relOffset: 0x02,
        mask: 0b01110000
    },
    {
        name: 'initialFloorPosition',
        relOffset: 0x02,
        mask: 0b00001111
    },
    //------------------------------------
    {
        name: 'spritePalette',
        relOffset: 0x03,
        mask: 0b11000000
    },
    {
        name: 'backgroundPalette',
        relOffset: 0x03,
        mask: 0b00111000
    },
    {
        name: 'backMap',
        relOffset: 0x03,
        mask: 0b00000111
    },
]

const LEVEL_OBJECT_3B = [
    {
        name: 'yPosition',
        relOffset: 0x00,
        mask: 0b11110000
    },
    {
        name: 'advanceCursor',
        relOffset: 0x00,
        mask: 0b00001111
    },
    {
        name: 'objectNumber',
        relOffset: 0x01,
        mask: 0b11111111
    },
    {
        name: 'collectableObjectNumber',
        relOffset: 0x02,
        mask: 0b11111111
    }
]


const LEVEL_OBJECT = [
    {
        name: 'yPosition',
        relOffset: 0x00,
        mask: 0b11110000
    },
    {
        name: 'advanceCursor',
        relOffset: 0x00,
        mask: 0b00001111
    },
    {
        name: 'objectNumber',
        relOffset: 0x01,
        mask: 0b11111111
    }
]

const LOCATION_MAPPING_FIELDS = [
    {
        name: 'y',
        relOffset: 0x00,
        mask: 0b01111111  
    },
    {
        name: 'external',
        relOffset: 0x00,
        mask: 0b10000000  
    },
    {
        name: 'x',
        relOffset: 0x3F,
        mask: 0b00111111
    },
    {
        name: 'caveSeg',
        relOffset: 0x3F,
        mask: 0b01000000
    },
    {
        name: 'reserved',
        relOffset: 0x3F,
        mask: 0b10000000
    },
    {
        name: 'mapNumber',
        relOffset: 0x7E,
        mask: 0b00111111
    },
    {
        name: 'hPosEnt',
        relOffset: 0x7E,
        mask: 0b11000000
    },
    {
        name: 'continent',
        relOffset: 0xBD,
        mask: 0b00000011
    },
    {
        name: 'mapSet',
        relOffset: 0xBD,
        mask: 0b00011100
    },
    {
        name: 'rightEnt',
        relOffset: 0xBD,
        mask: 0b00100000
    },
    {
        name: 'passThrough',
        relOffset: 0xBD,
        mask: 0b01000000
    },
    {
        name: 'fallInto',
        relOffset: 0xBD,
        mask: 0b10000000
    }
]

const OVERWORLD_SPRITE_TYPES = [
    "Town",
    "Cave",
    "Palace",
    "Bridge",
    "Desert",
    "Grass",
    "Forest",
    "Swamp",
    "Graveyard",
    "Road",
    "Lava",
    "Mountain",
    "Water",
    "Water (walkable)",
    "Rock",
    "Spider"
]

const BACKMAP_OFFSET      = 0x8000;
const MAP_POINTER_OFFSET1 = 0x8523;
const MAP_POINTER_OFFSET2 = 0xA000;

const BACKMAP_POINTER_BANK_OFFSETS = [
    toFileAddr(BACKMAP_OFFSET, 1),
    toFileAddr(BACKMAP_OFFSET, 2),
    toFileAddr(BACKMAP_OFFSET, 3),
    toFileAddr(BACKMAP_OFFSET, 4),
    toFileAddr(BACKMAP_OFFSET, 5),
];

const MAP_POINTER_BANK_OFFSETS1 = [
    toFileAddr(MAP_POINTER_OFFSET1, 1),
    toFileAddr(MAP_POINTER_OFFSET1, 2),
    toFileAddr(MAP_POINTER_OFFSET1, 3),
    toFileAddr(MAP_POINTER_OFFSET1, 4),
    toFileAddr(MAP_POINTER_OFFSET1, 5),
];

const MAP_POINTER_BANK_OFFSETS2 = [
    toFileAddr(MAP_POINTER_OFFSET2, 1),
    toFileAddr(MAP_POINTER_OFFSET1, 2),
    toFileAddr(MAP_POINTER_OFFSET2, 3),
    toFileAddr(MAP_POINTER_OFFSET2, 4),
    toFileAddr(MAP_POINTER_OFFSET2, 5),
];

const LEVEL_EXITS_OFFSET1 = 0x871B;
const LEVEL_EXITS_OFFSET2 = 0xA1F8;

const LEVEL_EXITS_BANK_OFFSETS1 = [
    toFileAddr(LEVEL_EXITS_OFFSET1, 1),
    toFileAddr(LEVEL_EXITS_OFFSET1, 2),
    toFileAddr(LEVEL_EXITS_OFFSET1, 3),
    toFileAddr(LEVEL_EXITS_OFFSET1, 4),
    toFileAddr(LEVEL_EXITS_OFFSET1, 5),
];

const LEVEL_EXITS_BANK_OFFSETS2 = [
    toFileAddr(LEVEL_EXITS_OFFSET2, 1),
    toFileAddr(LEVEL_EXITS_OFFSET2, 2),
    toFileAddr(LEVEL_EXITS_OFFSET2, 3),
    toFileAddr(LEVEL_EXITS_OFFSET2, 4),
    toFileAddr(LEVEL_EXITS_OFFSET2, 5),
];

const WEST_HYRULE_MAP_RANDO_OFFSET      = 0x7480;
const WEST_HYRULE_MAP_VANILLA_OFFSET    = 0x506C;
const WEST_HYRULE_MAP_LENGTH            = 0x538C - 0x506C;

const WEST_HYRULE_OVERWORLD_SPRITE_MAPPING = {
    size: WEST_HYRULE_MAP_LENGTH,
    elements: {
        size: 0x01,
        fields: [
            {
                name: 'length',
                relOffset: 0x0,
                mask: 0b11110000
            },
            {
                name: 'type',
                relOffset: 0x0,
                mask: 0b00001111
            }
        ]
    }
}

const WEST_HYRULE_LOCATION_MAPPINGS = {
    NORTH_CASTLE: {
        offset: 0x462F,
        fields: LOCATION_MAPPING_FIELDS
    },
    TROPHY_CAVE: {
        offset: 0x4630,
        fields: LOCATION_MAPPING_FIELDS
    },
    FOREST_50P: {
        offset: 0x4631,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAGIC_CAVE: {
        offset: 0x4632,
        fields: LOCATION_MAPPING_FIELDS
    },
    FOREST_100P: {
        offset: 0x4633,
        fields: LOCATION_MAPPING_FIELDS
    },
    HEART_CLIFF: {
        offset: 0x4634,
        fields: LOCATION_MAPPING_FIELDS
    },
    LOST_WOODS_1: {
        offset: 0x4635,
        fields: LOCATION_MAPPING_FIELDS
    },
    BUBBLE_CLIFF: {
        offset: 0x4636,
        fields: LOCATION_MAPPING_FIELDS
    },
    EX_LIFE_SWAMP_1: {
        offset: 0x4637,
        fields: LOCATION_MAPPING_FIELDS
    },
    RED_JAR_CEM: {
        offset: 0x4638,
        fields: LOCATION_MAPPING_FIELDS
    },
    PARAPA_CAVE_N: {
        offset: 0x4639,
        fields: LOCATION_MAPPING_FIELDS
    },
    PARAPA_CAVE_S: {
        offset: 0x463A,
        fields: LOCATION_MAPPING_FIELDS
    },
    JUMP_CAVE_N: {
        offset: 0x463B,
        fields: LOCATION_MAPPING_FIELDS
    },
    JUMP_CAVE_S: {
        offset: 0x463C,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_200P: {
        offset: 0x463D,
        fields: LOCATION_MAPPING_FIELDS
    },
    MEDICINE_CAVE: {
        offset: 0x463E,
        fields: LOCATION_MAPPING_FIELDS
    },
    HEART_CAVE: {
        offset: 0x463F,
        fields: LOCATION_MAPPING_FIELDS
    },
    FAIRY_CAVE_HOLE: {
        offset: 0x4640,
        fields: LOCATION_MAPPING_FIELDS
    },
    FAIRY_CAVE: {
        offset: 0x4641,
        fields: LOCATION_MAPPING_FIELDS
    },
    LIFE_TOWN_BRIDGE_NS: {
        offset: 0x4642,
        fields: LOCATION_MAPPING_FIELDS
    },
    LIFE_TOWN_BRIDGE_EW: {
        offset: 0x4643,
        fields: LOCATION_MAPPING_FIELDS
    },
    DM_BRIDGE_EXIT_W: {
        offset: 0x4644,
        fields: LOCATION_MAPPING_FIELDS
    },
    DM_BRIDGE_EXIT_E: {
        offset: 0x4645,
        fields: LOCATION_MAPPING_FIELDS
    },
    MEDICINE_CAVE_FAIRY: {
        offset: 0x4646,
        fields: LOCATION_MAPPING_FIELDS
    },
    RED_JAR_SWAMP: {
        offset: 0x4647,
        fields: LOCATION_MAPPING_FIELDS
    },
    LIFE_TOWN_FAIRY: {
        offset: 0x4648,
        fields: LOCATION_MAPPING_FIELDS
    },
    LOST_WOODS_2: {
        offset: 0x4649,
        fields: LOCATION_MAPPING_FIELDS
    },
    LOST_WOODS_3: {
        offset: 0x464A,
        fields: LOCATION_MAPPING_FIELDS
    },
    LOST_WOODS_4: {
        offset: 0x464B,
        fields: LOCATION_MAPPING_FIELDS
    },
    LOST_WOODS_5: {
        offset: 0x464C,
        fields: LOCATION_MAPPING_FIELDS
    },
    P2_RED_JAR: {
        offset: 0x464D,
        fields: LOCATION_MAPPING_FIELDS
    },
    RED_JAR_BEACH: {
        offset: 0x464E,
        fields: LOCATION_MAPPING_FIELDS
    },
    EX_LIFE_BEACH: {
        offset: 0x464F,
        fields: LOCATION_MAPPING_FIELDS
    },
    RAFT_DOCK: {
        offset: 0x4658,
        fields: LOCATION_MAPPING_FIELDS
    },
    DM_ENTRANCE: {
        offset: 0x4659,
        fields: LOCATION_MAPPING_FIELDS
    },
    DM_EXIT: {
        offset: 0x465A,
        fields: LOCATION_MAPPING_FIELDS
    },
    KINGS_TOMB: {
        offset: 0x465B,
        fields: LOCATION_MAPPING_FIELDS
    },
    SHIELD_TOWN: {
        offset: 0x465C,
        fields: LOCATION_MAPPING_FIELDS
    },
    JUMP_TOWN: {
        offset: 0x465E,
        fields: LOCATION_MAPPING_FIELDS
    },
    LIFE_TOWN_S: {
        offset: 0x465F,
        fields: LOCATION_MAPPING_FIELDS
    },
    LIFE_TOWN_N: {
        offset: 0x4660,
        fields: LOCATION_MAPPING_FIELDS
    },
    BAGUS_CABIN: {
        offset: 0x4661,
        fields: LOCATION_MAPPING_FIELDS
    },
    FAIRY_TOWN: {
        offset: 0x4662,
        fields: LOCATION_MAPPING_FIELDS
    },
    P1: {
        offset: 0x4663,
        fields: LOCATION_MAPPING_FIELDS
    },
    P2: {
        offset: 0x4664,
        fields: LOCATION_MAPPING_FIELDS
    },
    P3: {
        offset: 0x4665,
        fields: LOCATION_MAPPING_FIELDS
    }
}

const DEATH_MOUNTAIN_MAP_RANDO_OFFSET = 0x7A00;
const DEATH_MOUNTAIN_MAP_VANILLA_OFFSET = 0x665C;
const DEATH_MOUNTAIN_MAP_LENGTH = 0x6942 - 0x665C;

const DEATH_MOUNTAIN_OVERWORLD_SPRITE_MAPPING = {
    size: WEST_HYRULE_MAP_LENGTH,
    elements: {
        size: 0x01,
        fields: [
            {
                name: 'length',
                relOffset: 0x0,
                mask: 0b11110000
            },
            {
                name: 'type',
                relOffset: 0x0,
                mask: 0b00001111
            }
        ]
    }
}

const DEATH_MOUNTAIN_LOCATION_MAPPINGS = {
    CAVE_B_W: {
        offset: 0x610C,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_B_E: {
        offset: 0x610D,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_C_E: {
        offset: 0x610E,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_C_W: {
        offset: 0x610F,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_E_N: {
        offset: 0x6110,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_E_S: {
        offset: 0x6111,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_D_E: {
        offset: 0x6112,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_D_W: {
        offset: 0x6113,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_F_E: {
        offset: 0x6114,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_F_W: {
        offset: 0x6115,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_J_E: {
        offset: 0x6116,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_J_W: {
        offset: 0x6117,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_I_S: {
        offset: 0x6118,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_I_N: {
        offset: 0x6119,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_L_S: {
        offset: 0x611A,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_L_N: {
        offset: 0x611B,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_O_S: {
        offset: 0x611C,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_O_N: {
        offset: 0x611D,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_M_E: {
        offset: 0x611E,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_M_W: {
        offset: 0x611F,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_P_E: {
        offset: 0x6120,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_P_W: {
        offset: 0x6121,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_Q_E: {
        offset: 0x6122,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_Q_W: {
        offset: 0x6123,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_R_S: {
        offset: 0x6124,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_R_N: {
        offset: 0x6125,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_N_S: {
        offset: 0x6126,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_N_N: {
        offset: 0x6127,
        fields: LOCATION_MAPPING_FIELDS
    },
    HAMMER_CAVE: {
        offset: 0x6128,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_G_E_BL: {
        offset: 0x6129,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_G_W_BR: {
        offset: 0x612A,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_G_E_TL: {
        offset: 0x612B,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_G_W_TR: {
        offset: 0x612C,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_H_E_TL: {
        offset: 0x612D,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_H_W_TR: {
        offset: 0x612E,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_H_D_BL: {
        offset: 0x612F,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_H_N_BR: {
        offset: 0x6130,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_2: {
        offset: 0x6131,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_1: {
        offset: 0x6132,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_MAGIC: {
        offset: 0x6133,
        fields: LOCATION_MAPPING_FIELDS
    },
    EAST_HYRULE_BRIDGE: {
        offset: 0x6134,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_A: {
        offset: 0x6136,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_K: {
        offset: 0x6137,
        fields: LOCATION_MAPPING_FIELDS
    },
    P4: {
        offset: 0x6140,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_CHILD: {
        offset: 0x6143,
        fields: LOCATION_MAPPING_FIELDS
    },
    DM_MAGIC: {
        offset: 0x6144,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_3: {
        offset: 0x6145,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_7: {
        offset: 0x6146,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_4: {
        offset: 0x6147,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_5: {
        offset: 0x6148,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_6: {
        offset: 0x6149,
        fields: LOCATION_MAPPING_FIELDS
    },
}

const MAZE_ISLAND_MAP_RANDO_OFFSET = 0xBA00;
const MAZE_ISLAND_MAP_VANILLA_OFFSET = 0xA65C;
const MAZE_ISLAND_MAP_LENGTH = 0xA942 - 0xA65C;

const MAZE_ISLAND_OVERWORLD_SPRITE_MAPPING = {
    size: WEST_HYRULE_MAP_LENGTH,
    elements: {
        size: 0x01,
        fields: [
            {
                name: 'length',
                relOffset: 0x0,
                mask: 0b11110000
            },
            {
                name: 'type',
                relOffset: 0x0,
                mask: 0b00001111
            }
        ]
    }
}

const MAZE_ISLAND_LOCATION_MAPPINGS = {
    CAVE_B_W: {
        offset: 0xA10C,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_B_E: {
        offset: 0xA10D,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_C_E: {
        offset: 0xA10E,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_C_W: {
        offset: 0xA10F,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_E_N: {
        offset: 0xA110,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_E_S: {
        offset: 0xA111,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_D_E: {
        offset: 0xA112,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_D_W: {
        offset: 0xA113,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_F_E: {
        offset: 0xA114,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_F_W: {
        offset: 0xA115,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_J_E: {
        offset: 0xA116,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_J_W: {
        offset: 0xA117,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_I_S: {
        offset: 0xA118,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_I_N: {
        offset: 0xA119,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_L_S: {
        offset: 0xA11A,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_L_N: {
        offset: 0xA11B,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_O_S: {
        offset: 0xA11C,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_O_N: {
        offset: 0xA11D,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_M_E: {
        offset: 0xA11E,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_M_W: {
        offset: 0xA11F,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_P_E: {
        offset: 0xA120,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_P_W: {
        offset: 0xA121,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_Q_E: {
        offset: 0xA122,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_Q_W: {
        offset: 0xA123,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_R_S: {
        offset: 0xA124,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_R_N: {
        offset: 0xA125,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_N_S: {
        offset: 0xA126,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_N_N: {
        offset: 0xA127,
        fields: LOCATION_MAPPING_FIELDS
    },
    HAMMER_CAVE: {
        offset: 0xA128,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_G_E_BL: {
        offset: 0xA129,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_G_W_BR: {
        offset: 0xA12A,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_G_E_TL: {
        offset: 0xA12B,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_G_W_TR: {
        offset: 0xA12C,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_H_E_TL: {
        offset: 0xA12D,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_H_W_TR: {
        offset: 0xA12E,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_H_D_BL: {
        offset: 0xA12F,
        fields: LOCATION_MAPPING_FIELDS
    },
    ELEVATOR_CAVE_H_N_BR: {
        offset: 0xA130,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_2: {
        offset: 0xA131,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_1: {
        offset: 0xA132,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_MAGIC: {
        offset: 0xA133,
        fields: LOCATION_MAPPING_FIELDS
    },
    EAST_HYRULE_BRIDGE: {
        offset: 0xA134,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_A: {
        offset: 0xA136,
        fields: LOCATION_MAPPING_FIELDS
    },
    CAVE_K: {
        offset: 0xA137,
        fields: LOCATION_MAPPING_FIELDS
    },
    P4: {
        offset: 0xA140,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_CHILD: {
        offset: 0xA143,
        fields: LOCATION_MAPPING_FIELDS
    },
    DM_MAGIC: {
        offset: 0xA144,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_3: {
        offset: 0xA145,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_7: {
        offset: 0xA146,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_4: {
        offset: 0xA147,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_5: {
        offset: 0xA148,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_FORCED_BATTLE_6: {
        offset: 0xA149,
        fields: LOCATION_MAPPING_FIELDS
    },
}

const EAST_HYRULE_MAP_RANDO_OFFSET      = 0xB480;
const EAST_HYRULE_MAP_VANILLA_OFFSET    = 0x9056;
const EAST_HYRULE_MAP_LENGTH            = 0x936F - 0x9056;

const EAST_HYRULE_OVERWORLD_SPRITE_MAPPING = {
    size: EAST_HYRULE_MAP_LENGTH,
    elements: {
        size: 0x01,
        fields: [
            {
                name: 'length',
                relOffset: 0x0,
                mask: 0b11110000
            },
            {
                name: 'type',
                relOffset: 0x0,
                mask: 0b00001111
            }
        ]
    }
}

const EAST_HYRULE_LOCATION_MAPPINGS = {
    FIRE_TOWN_FOREST_500P_BAG:  {
        offset: 0x862F,
        fields: LOCATION_MAPPING_FIELDS
    },
    P6_500P_BAG: {
        offset: 0x8630,
        fields: LOCATION_MAPPING_FIELDS
    },
    WILSON_FENCE_1: {
        offset: 0x8631,
        fields: LOCATION_MAPPING_FIELDS
    },
    WILSON_FENCE_2: {
        offset: 0x8632,
        fields: LOCATION_MAPPING_FIELDS
    },
    WILSON_FENCE_3: {
        offset: 0x8633,
        fields: LOCATION_MAPPING_FIELDS
    },
    WILSON_FENCE_4: {
        offset: 0x8634,
        fields: LOCATION_MAPPING_FIELDS
    },
    THUNDER_TOWN_N_BRIDGE: {
        offset: 0x8635,
        fields: LOCATION_MAPPING_FIELDS
    },
    THUNDER_TOWN_E_BRIDGE: {
        offset: 0x8636,
        fields: LOCATION_MAPPING_FIELDS
    },
    REFLECT_TOWN_CLIFF_1: {
        offset: 0x8637,
        fields: LOCATION_MAPPING_FIELDS
    },
    REFLECT_TOWN_CLIFF_2: {
        offset: 0x8638,
        fields: LOCATION_MAPPING_FIELDS
    },
    P5_HEART: {
        offset: 0x8639,
        fields: LOCATION_MAPPING_FIELDS
    },
    FIRE_TOWN_CAVE_EXIT: {
        offset: 0x863A,
        fields: LOCATION_MAPPING_FIELDS
    },
    FIRE_TOWN_CAVE_ENTRACE: {
        offset: 0x863B,
        fields: LOCATION_MAPPING_FIELDS
    },
    FIRE_TOWN_CAVE_500P_BAG: {
        offset: 0x863C,
        fields: LOCATION_MAPPING_FIELDS
    },
    THUNDER_TOWN_CAVE_500P_BAG: {
        offset: 0x863D,
        fields: LOCATION_MAPPING_FIELDS
    },
    SPELL_TOWN_CAVE_ENTRANCE: {
        offset: 0x863E,
        fields: LOCATION_MAPPING_FIELDS
    },
    SPELL_TOWN_CAVE_EXIT: {
        offset: 0x863F,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_CAVE_1_EXIT: {
        offset: 0x8640,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_CAVE_1_ENTRANCE: {
        offset: 0x8641,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_CAVE_2_EXIT: {
        offset: 0x8642,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_CAVE_2_ENTRANCE: {
        offset: 0x8643,
        fields: LOCATION_MAPPING_FIELDS
    },
    THUNDER_TOWN_SWAMP_LIFE: {
        offset: 0x8644,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_BATTLE_EX: {
        offset: 0x8645,
        fields: LOCATION_MAPPING_FIELDS
    },
    P5_500P_BAG: {
        offset: 0x8646,
        fields: LOCATION_MAPPING_FIELDS
    },
    FIRE_TOWN_RED_JAR: {
        offset: 0x8647,
        fields: LOCATION_MAPPING_FIELDS
    },
    DAZZLE_LIFE: {
        offset: 0x8648,
        fields: LOCATION_MAPPING_FIELDS
    },
    P6_HEART: {
        offset: 0x8649,
        fields: LOCATION_MAPPING_FIELDS
    },
    FIRE_TOWN_FAIRY: {
        offset: 0x864A,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_500P_BAG: {
        offset: 0x864B,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_RED_JAR: {
        offset: 0x864C,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_BATTLE_3: {
        offset: 0x864D,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_BATTLE_2: {
        offset: 0x864E,
        fields: LOCATION_MAPPING_FIELDS
    },
    DEATH_VALLEY_BATTLE_1: {
        offset: 0x864F,
        fields: LOCATION_MAPPING_FIELDS
    },
    MAZE_ISLAND_BRIDGE: {
        offset: 0x8657,
        fields: LOCATION_MAPPING_FIELDS
    },
    RAFT_DOCK: {
        offset: 0x8658,
        fields: LOCATION_MAPPING_FIELDS
    },
    FIRE_TOWN: {
        offset: 0x865C,
        fields: LOCATION_MAPPING_FIELDS
    },
    REFLECT_TOWN: {
        offset: 0x865E,
        fields: LOCATION_MAPPING_FIELDS
    },
    SPELL_TOWN: {
        offset: 0x8660,
        fields: LOCATION_MAPPING_FIELDS
    },
    THUNDER_TOWN: {
        offset: 0x8662,
        fields: LOCATION_MAPPING_FIELDS
    },
    P5: {
        offset: 0x8663,
        fields: LOCATION_MAPPING_FIELDS
    },
    P6: {
        offset: 0x8664,
        fields: LOCATION_MAPPING_FIELDS
    },
    GP: {
        offset: 0x8665,
        fields: LOCATION_MAPPING_FIELDS
    }
}

const TEXT_DATA_OFFSET = 0xE390;
const TEXT_DATA_LENGTH = 0xEFCC - 0xE390;

exports.LEVEL_OBJECT                            = LEVEL_OBJECT;
exports.LEVEL_OBJECT_3B                         = LEVEL_OBJECT_3B;

exports.WEST_HYRULE_OVERWORLD_SPRITE_MAPPING    = WEST_HYRULE_OVERWORLD_SPRITE_MAPPING;
exports.EAST_HYRULE_OVERWORLD_SPRITE_MAPPING    = EAST_HYRULE_OVERWORLD_SPRITE_MAPPING;
exports.DEATH_MOUNTAIN_OVERWORLD_SPRITE_MAPPING = DEATH_MOUNTAIN_OVERWORLD_SPRITE_MAPPING;
exports.MAZE_ISLAND_OVERWORLD_SPRITE_MAPPING    = MAZE_ISLAND_OVERWORLD_SPRITE_MAPPING;
exports.OVERWORLD_SPRITE_TYPES                  = OVERWORLD_SPRITE_TYPES;

exports.BACKMAP_POINTER_BANK_OFFSETS           = BACKMAP_POINTER_BANK_OFFSETS;
exports.MAP_POINTER_BANK_OFFSETS1               = MAP_POINTER_BANK_OFFSETS1;
exports.MAP_POINTER_BANK_OFFSETS2               = MAP_POINTER_BANK_OFFSETS2;

exports.LEVEL_HEADER_MAPPING                    = LEVEL_HEADER_MAPPING;
exports.LEVEL_EXITS_MAPPING                     = LEVEL_EXITS_MAPPING;
exports.LEVEL_EXITS_BANK_OFFSETS1               = LEVEL_EXITS_BANK_OFFSETS1;
exports.LEVEL_EXITS_BANK_OFFSETS2               = LEVEL_EXITS_BANK_OFFSETS2;

exports.WEST_HYRULE_LOCATION_MAPPINGS           = WEST_HYRULE_LOCATION_MAPPINGS;
exports.WEST_HYRULE_MAP_RANDO_OFFSET            = WEST_HYRULE_MAP_RANDO_OFFSET;
exports.WEST_HYRULE_MAP_VANILLA_OFFSET          = WEST_HYRULE_MAP_VANILLA_OFFSET;
exports.WEST_HYRULE_MAP_LENGTH                  = WEST_HYRULE_MAP_LENGTH;

exports.EAST_HYRULE_LOCATION_MAPPINGS           = EAST_HYRULE_LOCATION_MAPPINGS;
exports.EAST_HYRULE_MAP_RANDO_OFFSET            = EAST_HYRULE_MAP_RANDO_OFFSET;
exports.EAST_HYRULE_MAP_VANILLA_OFFSET          = EAST_HYRULE_MAP_VANILLA_OFFSET;
exports.EAST_HYRULE_MAP_LENGTH                  = EAST_HYRULE_MAP_LENGTH;

exports.DEATH_MOUNTAIN_LOCATION_MAPPINGS        = DEATH_MOUNTAIN_LOCATION_MAPPINGS;
exports.DEATH_MOUNTAIN_MAP_RANDO_OFFSET         = DEATH_MOUNTAIN_MAP_RANDO_OFFSET;
exports.DEATH_MOUNTAIN_MAP_VANILLA_OFFSET       = DEATH_MOUNTAIN_MAP_VANILLA_OFFSET;
exports.DEATH_MOUNTAIN_MAP_LENGTH               = DEATH_MOUNTAIN_MAP_LENGTH;

exports.MAZE_ISLAND_LOCATION_MAPPINGS           = MAZE_ISLAND_LOCATION_MAPPINGS;
exports.MAZE_ISLAND_MAP_RANDO_OFFSET            = MAZE_ISLAND_MAP_RANDO_OFFSET;
exports.MAZE_ISLAND_MAP_VANILLA_OFFSET          = MAZE_ISLAND_MAP_VANILLA_OFFSET;
exports.MAZE_ISLAND_MAP_LENGTH                  = MAZE_ISLAND_MAP_LENGTH;

exports.TEXT_DATA_OFFSET                        = TEXT_DATA_OFFSET;
exports.TEXT_DATA_LENGTH                        = TEXT_DATA_LENGTH;

exports.toFileAddr = toFileAddr;

// 665C - 6942 - Death Mountain
// 9056 - 936F - East Hyrule
// A65C - A942 - Maze Island