export const toFileAddr = (ramAddress, bank) => {
    return (ramAddress - 0x8000) + (bank * 0x4000) + 0x10;
}

export const CONTINENT_EXIT_MAPPINGS = {
    RAFT_DOCK_W: {
        x: 0x538,
        y: 0x53A
    },
    RAFT_DOCK_E: {
        x: 0x539,
        y: 0x53B
    }, 
    MAZE_ISLAND_BRIDGE: {
        x: 0x565,
        y: 0x567
    },
    EAST_HYRULE_BRIDGE: {
        x: 0x564,
        y: 0x566
    }
}

export const PALACE_PALETTE_LOCATIONS = {
    P1: 0x29AD0,
    P2: 0x2BAD0,
    P3: 0x33AD0,
    P4: 0x35AD0,
    P5: 0x37AD0,
    P6: 0x39AD0
};

export const LEVEL_EXIT_MAPPING = [
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

export const LEVEL_EXITS_MAPPING = {
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

export const LEVEL_EXIT_BLOCK = {
    size: 63,
    elements: {
        size: 0x04,
        fields: LEVEL_EXITS_MAPPING
    }
}

// Bytes for enemy data:
// 0 -
// 	....xxxx = X coordinate (in tiles)
// 	xxxx.... = Y coordinate (in tiles)
// 		Y coordinate 0 maps to row 1, otherwise maps to row 2+x
// 1 -
// 	xx...... = Upper bits of X coordinate
// 	..xxxxxx = Enemy number (0-63)

export const ENEMY_HEADER_MAPPING = [
    {
        name: 'sizeOfEnemy',
        relOffset: 0x00,
        mask: 0b11111111
    }
];

export const ENEMY_DATA_MAPPING = [
    {
        name: 'xLower',
        relOffset: 0x00,
        mask: 0b00001111
    },
    {
        name: 'xUpper',
        relOffset: 0x01,
        mask: 0b11000000
    },
    {
        name: 'y',
        relOffset: 0x00,
        mask: 0b11110000
    },
    {
        name: "enemyNumber",
        relOffset: 0x01,
        mask: 0b00111111
    }
];

export const LEVEL_HEADER_MAPPING = [
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

export const LEVEL_OBJECT_3B = [
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


export const LEVEL_OBJECT = [
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

export const LOCATION_MAPPING_FIELDS = [
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

export const OVERWORLD_SPRITE_TYPES = [
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
];

export const OVERWORLD_SPRITE_MAPPING = {
    "TOWN": 0,
    "CAVE": 1,
    "PALACE": 2,
    "START": 2,
    "BRIDGE": 3,
    "DOCK": 3,
    "DESERT": 4,
    "GRASS": 5,
    "FOREST": 6,
    "SWAMP": 7,
    "CEMETARY": 8,
    "PATH": 9,
    "LAVA": 10,
    "MOUNTAIN": 11,
    "WATER": 12,
    "SHALLOWS": 13,
    "ROCK": 14,
    "SPIDER": 15
}

export const BACKMAP_OFFSET         = 0x8000;
export const MAP_POINTER_OFFSET1    = 0x8523;
export const MAP_POINTER_OFFSET2    = 0xA000;
export const ENEMY_POINTER_OFFSET1  = 0x85A1;
export const ENEMY_POINTER_OFFSET2  = 0xA07E;

export const BACKMAP_POINTER_BANK_OFFSETS = [
    toFileAddr(BACKMAP_OFFSET, 1),
    toFileAddr(BACKMAP_OFFSET, 2),
    toFileAddr(BACKMAP_OFFSET, 3),
    toFileAddr(BACKMAP_OFFSET, 4),
    toFileAddr(BACKMAP_OFFSET, 5),
];

export const MAP_POINTER_BANK_OFFSETS1 = [
    toFileAddr(MAP_POINTER_OFFSET1, 1),
    toFileAddr(MAP_POINTER_OFFSET1, 2),
    toFileAddr(MAP_POINTER_OFFSET1, 3),
    toFileAddr(MAP_POINTER_OFFSET1, 4),
    toFileAddr(MAP_POINTER_OFFSET1, 5),
];

export const MAP_POINTER_BANK_OFFSETS2 = [
    toFileAddr(MAP_POINTER_OFFSET2, 1),
    toFileAddr(MAP_POINTER_OFFSET2, 2),
    toFileAddr(MAP_POINTER_OFFSET2, 3),
    toFileAddr(MAP_POINTER_OFFSET2, 4),
    toFileAddr(MAP_POINTER_OFFSET2, 5),
];

export const ENEMY_POINTER_BANK_OFFSETS1 = [
    toFileAddr(ENEMY_POINTER_OFFSET1, 1),
    toFileAddr(ENEMY_POINTER_OFFSET1, 2),
    toFileAddr(ENEMY_POINTER_OFFSET1, 3),
    toFileAddr(ENEMY_POINTER_OFFSET1, 4),
    toFileAddr(ENEMY_POINTER_OFFSET1, 5),
];

export const ENEMY_POINTER_BANK_OFFSETS2 = [
    toFileAddr(ENEMY_POINTER_OFFSET2, 1),
    toFileAddr(ENEMY_POINTER_OFFSET2, 2),
    toFileAddr(ENEMY_POINTER_OFFSET2, 3),
    toFileAddr(ENEMY_POINTER_OFFSET2, 4),
    toFileAddr(ENEMY_POINTER_OFFSET2, 5),
];

export const LEVEL_EXITS_OFFSET1 = 0x871B;
export const LEVEL_EXITS_OFFSET2 = 0xA1F8;

export const LEVEL_EXITS_BANK_OFFSETS1 = [
    toFileAddr(LEVEL_EXITS_OFFSET1, 1),
    toFileAddr(LEVEL_EXITS_OFFSET1, 2),
    toFileAddr(LEVEL_EXITS_OFFSET1, 3),
    toFileAddr(LEVEL_EXITS_OFFSET1, 4),
    toFileAddr(LEVEL_EXITS_OFFSET1, 5),
];

export const LEVEL_EXITS_BANK_OFFSETS2 = [
    toFileAddr(LEVEL_EXITS_OFFSET2, 1),
    toFileAddr(LEVEL_EXITS_OFFSET2, 2),
    toFileAddr(LEVEL_EXITS_OFFSET2, 3),
    toFileAddr(LEVEL_EXITS_OFFSET2, 4),
    toFileAddr(LEVEL_EXITS_OFFSET2, 5),
];

export const WEST_HYRULE_MAP_RANDO_OFFSET      = 0x7480;
export const WEST_HYRULE_MAP_VANILLA_OFFSET    = 0x506C;
export const WEST_HYRULE_MAP_LENGTH            = 0x538C - 0x506C;
export const EXTENDED_MAP_LENGTH               = 0x7f80 - 0x7a00;

export const WEST_HYRULE_OVERWORLD_EXTENDED_SPRITE_MAPPING = {
    size: EXTENDED_MAP_LENGTH,
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

export const WEST_HYRULE_OVERWORLD_SPRITE_MAPPING = {
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

export const WEST_HYRULE_LOCATION_MAPPINGS = {
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
    RAFT_DOCK_W: {
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

export const DEATH_MOUNTAIN_MAP_RANDO_OFFSET = 0x7A00;
export const DEATH_MOUNTAIN_MAP_VANILLA_OFFSET = 0x665C;
export const DEATH_MOUNTAIN_MAP_LENGTH = 0x6942 - 0x665C;

export const DEATH_MOUNTAIN_OVERWORLD_EXTENDED_SPRITE_MAPPING = {
    size: EXTENDED_MAP_LENGTH,
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

export const DEATH_MOUNTAIN_OVERWORLD_SPRITE_MAPPING = {
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

export const DEATH_MOUNTAIN_LOCATION_MAPPINGS = {
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
    ELEVATOR_CAVE_H_S_BL: {
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

export const MAZE_ISLAND_MAP_RANDO_OFFSET = 0xBA00;
export const MAZE_ISLAND_MAP_VANILLA_OFFSET = 0xA65C;
export const MAZE_ISLAND_MAP_LENGTH = 0xA942 - 0xA65C;

export const MAZE_ISLAND_OVERWORLD_EXTENDED_SPRITE_MAPPING = {
    size: EXTENDED_MAP_LENGTH,
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

export const MAZE_ISLAND_OVERWORLD_SPRITE_MAPPING = {
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

export const MAZE_ISLAND_LOCATION_MAPPINGS = {
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
    ELEVATOR_CAVE_H_S_BL: {
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

export const EAST_HYRULE_MAP_RANDO_OFFSET      = 0xB480;
export const EAST_HYRULE_MAP_VANILLA_OFFSET    = 0x9056;
export const EAST_HYRULE_MAP_LENGTH            = 0x936F - 0x9056;

export const EAST_HYRULE_OVERWORLD_EXTENDED_SPRITE_MAPPING = {
    size: EXTENDED_MAP_LENGTH,
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

export const EAST_HYRULE_OVERWORLD_SPRITE_MAPPING = {
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

export const EAST_HYRULE_LOCATION_MAPPINGS = {
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
    FIRE_TOWN_CAVE_ENTRANCE: {
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
    RAFT_DOCK_E: {
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

export const CONTINENT_MAPPINGS = [
    WEST_HYRULE_LOCATION_MAPPINGS,
    DEATH_MOUNTAIN_LOCATION_MAPPINGS,
    EAST_HYRULE_LOCATION_MAPPINGS,
    MAZE_ISLAND_LOCATION_MAPPINGS
];

export const OVERWORLD_SPRITE_MAP_MAPPINGS = [
    WEST_HYRULE_OVERWORLD_SPRITE_MAPPING,
    DEATH_MOUNTAIN_OVERWORLD_SPRITE_MAPPING,
    EAST_HYRULE_OVERWORLD_SPRITE_MAPPING,
    MAZE_ISLAND_OVERWORLD_SPRITE_MAPPING
];

export const VANILLA_MAP_OFFSETS = [
    WEST_HYRULE_MAP_VANILLA_OFFSET,
    DEATH_MOUNTAIN_MAP_VANILLA_OFFSET,
    EAST_HYRULE_MAP_VANILLA_OFFSET,
    MAZE_ISLAND_MAP_VANILLA_OFFSET
];

export const RANDO_MAP_OFFSETS = [
    WEST_HYRULE_MAP_RANDO_OFFSET,
    DEATH_MOUNTAIN_MAP_RANDO_OFFSET,
    EAST_HYRULE_MAP_RANDO_OFFSET,
    MAZE_ISLAND_MAP_RANDO_OFFSET
]

export const TEXT_DATA_OFFSET = 0xE390;
export const TEXT_DATA_LENGTH = 0xEFCC - 0xE390;

export const CREDITS_OFFSET = 0x15384;