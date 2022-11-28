export default {
    "NORTH_CASTLE": {
        "requirements": [

        ],
        "connections": [
            "MAGIC_CAVE",
            "TROPHY_CAVE",
            "PARAPA_CAVE_S",
            "JUMP_CAVE_N",
            "SHIELD_TOWN",
            "JUMP_TOWN",
            "FOREST_50P"
        ]
    },
    "MAGIC_CAVE": {
        "requirements": [],
        "items": [
            "MAGIC"
        ],
        "connections": []
    },
    "TROPHY_CAVE": {
        "requirements": [],
        "connections": []
    },
    "PARAPA_CAVE_S": {
        "requirements": [],
        "connections": [
            "PARAPA_CAVE_N"
        ],
        "bottleneck": true
    },
    "PARAPA_CAVE_N": {
        "connections": [
            "P1",
            "BUBBLE_CLIFF"
        ],
        "bottleneck": true
    },
    "BUBBLE_CLIFF": {
        "connections": [
            "HEART_CLIFF"
        ],
        "bottleneck": true
    },
    "HEART_CLIFF": {
        "items": [
            "HEART"
        ]
    },
    "JUMP_CAVE_N": {
        "connections": [
            "JUMP_CAVE_S"
        ],
        "linkTo": [
            "JUMP_CAVE_S"
        ],
        "linkRequirements": {
            "JUMP_CAVE_S": ["FAIRY | JUMP"]
        }
    },
    "SHIELD_TOWN": {
        "requirements": [],
        "spells": [
            "SHIELD"
        ],
        "connections": [
            "P2"
        ],
        "connectionRequirements": {
            "P2": ["HAMMER"]
        }
    },
    "JUMP_TOWN": {
        "requirements": [
            "TROPHY"
        ],
        "spells": [
            "JUMP"
        ],
        "connections": []
    },
    "FOREST_50P": {
        "requirements": [],
        "items": "50p",
        "connections": []
    },
    "FOREST_100P": {
        "items": "100p"
    },
    "JUMP_CAVE_S": {
        "connections": [
            "MEDICINE_CAVE_FAIRY",
            "MEDICINE_CAVE",
            "EX_LIFE_SWAMP_1",
            "BAGUS_CABIN",
            "LOST_WOODS_1",
            "LOST_WOODS_2",
            "LOST_WOODS_3",
            "LOST_WOODS_4",
            "LOST_WOODS_5",
            "HEART_CAVE",
            "CAVE_200P",
            "P2",
            "P2_RED_JAR",
            "RED_JAR_SWAMP",
            "FAIRY_TOWN",
            "LIFE_TOWN_BRIDGE_NS",
            "LIFE_TOWN_BRIDGE_EW",
            "LIFE_TOWN_FAIRY"
        ],
        "connectionRequirements": {
            "FAIRY_TOWN": ["HAMMER"]
        }
    },
    "MEDICINE_CAVE_FAIRY": {
        "items": [
            "FAIRY"
        ]
    },
    "BAGUS_CABIN": {
        "items": [
            "BAGU"
        ]
    },
    "EX_LIFE_SWAMP_1": {
        "items": [
            "1UP"
        ]
    },
    "MEDICINE_CAVE": {
        "requirements": [
            "HAMMER"
        ],
        "items": [
            "MEDICINE"
        ]
    },
    "HEART_CAVE": {
        "requirments": [
            "HAMMER"
        ],
        "items": [
            "HEART"
        ]
    },
    "CAVE_200P": {
        "items": [
            "200P"
        ]
    },
    "P2_RED_JAR": {
        "items": [
            "RED_JAR"
        ]
    },
    "RED_JAR_SWAMP": {
        "items": [
            "RED_JAR"
        ]
    },
    "EX_LIFE_BEACH": {
        "items": [
            "1UP"
        ]
    },
    "RED_JAR_CEM": {
        "items": [
            "RED_JAR"
        ]
    },
    "RAFT_DOCK_W": {
        "connections": [
            "RAFT_DOCK_E"
        ],
        "connectionRequirments": {
            "RAFT_DOCK_E": ["RAFT"]
        }
    },
    "FAIRY_TOWN": {
        "requirements": [
            "JUMP",
            "MEDICINE"
        ],
        "spells": [
            "DOWNSTAB",
            "FAIRY"
        ]
    },
    "FAIRY_CAVE_HOLE": {
        "requirements": [
            "FAIRY"
        ],
        "connections": [
            "FAIRY_CAVE"
        ],
        "bottleneck": true
    },
    "FAIRY_CAVE": {
        "connections": [
            "P3"
        ],
        "bottleneck": true
    },
    "LIFE_TOWN_BRIDGE_NS": {
        "spells": [
            "LIFE"
        ],
        "connections": [
            "LIFE_TOWN_N",
            "LIFE_TOWN_BRIDGE_EW",
            "FOREST_100P"
        ],
        "bottleneck": true
    },
    "LIFE_TOWN_N": {
        "connections": [
            "LIFE_TOWN_S"
        ],
        "connectionRequirements": {
            "LIFE_TOWN_S": ["BAGU_SAUCE | FAIRY"]
        }
    },
    "LIFE_TOWN_S": {
        "connections": [
            "DM_ENTRANCE",
            "LIFE_TOWN_N"
        ],
        "connectionsRequirements": {
            "LIFE_TOWN_N": ["BAGU_SAUCE | FAIRY"]
        }
    },
    "DM_BRIDGE_EXIT_E": {
        "connections": [
            "DM_BRIDGE_EXIT_W"
        ],
        "bottleneck": true
    },
    "DM_BRIDGE_EXIT_W": {
        "connections": [
            "DM_EXIT"
        ],
        "bottleneck": true
    },
    "P1": {},
    "P2": {
        "requirements": [
            "HANDY_GLOVE"
        ],
        "items": [
            "HANDY_GLOVE"
        ]
    },
    "P3": {
        "requirements": [
            "HANDY_GLOVE",
            "DOWN_STAB"
        ]
    },
    "KINGS_TOMB": {},
    "DM_EXIT": {
        "connections": [
            "CAVE_K"
        ],
        "bottleneck": true
    },
    "DM_ENTRANCE": {
        "connections": [
            "CAVE_A"
        ],
        "bottleneck": true
    },
    "LIFE_TOWN_BRIDGE_EW": {
        "bottleneck": true
    },
    "LIFE_TOWN_FAIRY": {},
    "LOST_WOODS_1": {},
    "LOST_WOODS_2": {},
    "LOST_WOODS_3": {},
    "LOST_WOODS_4": {},
    "LOST_WOODS_5": {},
    "RAFT_DOCK_E": {
        "connections": [
            "FIRE_TOWN_FOREST_500P_BAG",
            "FIRE_TOWN_FAIRY",
            "FIRE_TOWN",
            "FIRE_TOWN_CAVE_500P_BAG",
            "FIRE_TOWN_CAVE_EXIT",
            "FIRE_TOWN_RED_JAR",
            "P5_HEART",
            "P5_500P_BAG",
            "P5",
            "RAFT_DOCK_W",
            "WILSON_FENCE_1"
        ],
        "area": 1,
        "map": 2,
        "connectionRequirements": {
            "RAFT_DOCK_W": ["RAFT"],
            "WILSON_FENCE_1": ["RECORDER"],
            "P5": ["BOOTS"],
            "P5_HEART": ["BOOTS"],
            "P5_500P_BACK": ["BOOTS | HAMMER"]
        }
    },
    "FIRE_TOWN_CAVE_EXIT": {
        "connections": [
            "FIRE_TOWN_CAVE_ENTRANCE"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "FIRE_TOWN_CAVE_ENTRANCE": {
        "connections": [
            "DAZZLE_LIFE",
            "REFLECT_TOWN_CLIFF_2",
            "MAZE_ISLAND_BRIDGE",
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "WILSON_FENCE_1": {
        "connections": [
            "WILSON_FENCE_2"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "WILSON_FENCE_2": {
        "connections": [
            "WILSON_FENCE_3"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "WILSON_FENCE_3": {
        "connections": [
            "WILSON_FENCE_4",
            "THUNDER_TOWN_SWAMP_LIFE",
            "THUNDER_TOWN_CAVE_500P_BAG",
            "THUNDER_TOWN_N_BRIDGE",
            "THUNDER_TOWN_E_BRIDGE",
            "SPELL_TOWN_CAVE_ENTRANCE",
            "P6_500P_BAG",
            "P6_HEART",
            "P6"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "P6_HEART": {
        "items": [
            "HEART"
        ],
        "area": 1,
        "map": 2
    },
    "P6_500P_BAG": {
        "items": [
            "500P"
        ],
        "area": 1,
        "map": 2
    },
    "SPELL_TOWN_CAVE_ENTRANCE": {
        "connections": [
            "SPELL_TOWN_CAVE_EXIT",
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "SPELL_TOWN_CAVE_EXIT": {
        "connections": [
            "SPELL_TOWN",
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "SPELL_TOWN": {
        "requirements": [
            "HAMMER",
        ],
        "items": [
            "MAGIC_KEY",
            "MAGIC"
        ],
        "spells": [
            "SPELL"
        ],
        "x": 61,
        "y": 81,
        "area": 1,
        "map": 2
    },
    "THUNDER_TOWN_N_BRIDGE": {
        "connections": [
            "P6",
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "THUNDER_TOWN_E_BRIDGE": {
        "connections": [
            "THUNDER_TOWN",
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "THUNDER_TOWN": {
        "requirements": [
            "MAGIC8",
        ],
        "area": 1,
        "map": 2
    },
    "WILSON_FENCE_4": {
        "connections": [
            "DEATH_VALLEY_RED_JAR",
            "DEATH_VALLEY_BATTLE_1"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "DEATH_VALLEY_BATTLE_1": {
        "connections": [
            "DEATH_VALLEY_500P_BAG",
            "DEATH_VALLEY_BATTLE_2"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "DEATH_VALLEY_BATTLE_2": {
        "connections": [
            "DEATH_VALLEY_CAVE_2_ENTRANCE"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "DEATH_VALLEY_CAVE_2_ENTRANCE": {
        "connections": [
            "DEATH_VALLEY_CAVE_2_EXIT"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "DEATH_VALLEY_CAVE_2_EXIT": {
        "connections": [
            "DEATH_VALLEY_BATTLE_3"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "DEATH_VALLEY_BATTLE_3": {
        "connections": [
            "DEATH_VALLEY_CAVE_1_EXIT"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "DEATH_VALLEY_CAVE_1_EXIT": {
        "connections": [
            "DEATH_VALLEY_CAVE_1_ENTRANCE"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "DEATH_VALLEY_CAVE_1_ENTRANCE": {
        "connections": [
            "GP"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "DEATH_VALLEY_RED_JAR": {
        "area": 1,
        "map": 2
    },
    "DEATH_VALLEY_500P_BAG": {
        "items": [
            "500P"
        ],
        "area": 1,
        "map": 2
    },
    "REFLECT_TOWN_CLIFF_2": {
        "connections": [
            "REFLECT_TOWN_CLIFF_1"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "REFLECT_TOWN_CLIFF_1": {
        "connections": [
            "REFLECT_TOWN"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "REFLECT_TOWN": {
        "spells": [
            "UPSTAB",
            "REFLECT"
        ],
        "requirements": [
            "FAIRY",
            "CHILD"
        ],
        "area": 1,
        "map": 2
    },
    "MAZE_ISLAND_BRIDGE": {
        "connections": [
            "EAST_HYRULE_BRIDGE"
        ],
        "area": 1,
        "map": 2,
        "bottleneck": true
    },
    "FIRE_TOWN_CAVE_500P_BAG": {
        "items": [
            "500P"
        ],
        "area": 1,
        "map": 2
    },
    "FIRE_TOWN_RED_JAR": {
        "items": [
            "RED_JAR"
        ],
        "area": 1,
        "map": 2
    },
    "FIRE_TOWN_FOREST_500P_BAG": {
        "items": [
            "RED_JAR"
        ],
        "area": 1,
        "map": 2
    },
    "FIRE_TOWN_FAIRY": {
        "items": [
            "FAIRY"
        ],
        "area": 1,
        "map": 2
    },
    "P5_HEART": {
        "items": [
            "RED_JAR"
        ],
        "area": 1,
        "map": 2
    },
    "P5_500P_BAG": {
        "items": [
            "500P"
        ],
        "area": 1,
        "map": 2
    },
    "P5": {
        "requirements": [
            "BOOTS"
        ],
        "items": [
            "RECORDER"
        ],
        "area": 1,
        "map": 2
    },
    "P6": {
        "requirements": [
            "FAIRY"
        ],
        "items": [
            "CROSS"
        ],
        "x": 45,
        "y": 102,
        "area": 1,
        "map": 2
    },
    "DAZZLE_LIFE": {
        "items": [
            "1UP"
        ],
        "area": 1,
        "map": 2
    },
    "CAVE_A": {
        "connections": [
            "CAVE_B_E",
            "CAVE_C_E",

        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_B_E": {
        "connections": [
            "CAVE_B_W"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_B_W": {
        "connections": [
            "CAVE_D_E"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_D_E": {
        "connections": [
            "CAVE_D_W"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_D_W": {
        "connections": [
            "CAVE_F_W",
            "ELEVATOR_CAVE_G_E_TL"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_F_W": {
        "connections": [
            "CAVE_F_E"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_F_E": {
        "connections": [
            "CAVE_I_S"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_I_S": {
        "connections": [
            "CAVE_I_N"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_I_N": {
        "connections": [
            "CAVE_M_W",
            "ELEVATOR_CAVE_G_E_BL",
            "ELEVATOR_CAVE_H_E_TL"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_M_W": {
        "connections": [
            "CAVE_M_E"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_M_E": {
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "ELEVATOR_CAVE_G_E_BL": {
        "connections": [
            "ELEVATOR_CAVE_G_W_BR",
            "ELEVATOR_CAVE_G_W_TR",
            "ELEVATOR_CAVE_G_E_TL"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "ELEVATOR_CAVE_H_E_TL": {
        "connections": [
            "ELEVATOR_CAVE_H_W_TR",
            "ELEVATOR_CAVE_H_N_BR",
            "ELEVATOR_CAVE_H_D_BL"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "ELEVATOR_CAVE_G_W_BR": {
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "ELEVATOR_CAVE_G_W_TR": {
        "connections": [
            "CAVE_J_E",
            "ELEVATOR_CAVE_G_W_TR"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_C_E": {
        "connections": [
            "CAVE_C_W"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_C_W": {
        "connections": [
            "CAVE_E_N"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_E_N": {
        "connections": [
            "CAVE_E_S"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_E_S": {
        "connections": [
            "ELEVATOR_CAVE_H_D_BL"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "ELEVATOR_CAVE_H_D_BL": {
        "connections": [
            "ELEVATOR_CAVE_H_N_BR",
            "ELEVATOR_CAVE_H_W_TR",
            "ELEVATOR_CAVE_H_E_TL",
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "ELEVATOR_CAVE_H_N_BR": {
        "connections": [
            "CAVE_J_W",
            "CAVE_L_S"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_J_W": {
        "connections": [
            "CAVE_J_E"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_J_E": {
        "connections": [
            "CAVE_J_W"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_L_S": {
        "connections": [
            "CAVE_L_N"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_L_N": {
        "connections": [
            "CAVE_O_S"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_O_S": {
        "connections": [
            "CAVE_O_N"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_O_N": {
        "connections": [
            "CAVE_P_W"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_P_W": {
        "connections": [
            "CAVE_P_E"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_P_E": {
        "connections": [
            "CAVE_Q_E"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_Q_E": {
        "connections": [
            "CAVE_Q_W"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_Q_W": {
        "connections": [
            "CAVE_R_N"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_R_N": {
        "connections": [
            "CAVE_R_S"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_R_S": {
        "connections": [
            "CAVE_N_S",
            "HAMMER_CAVE",
            "DM_MAGIC"
        ],
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "HAMMER_CAVE": {
        "items": [
            "HAMMER"
        ],
        "subArea": 1,
        "map": 1
    },
    "DM_MAGIC": {
        "requirements": [
            "HAMMER"
        ],
        "subArea": 1,
        "map": 1
    },
    "CAVE_K": {
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "EAST_HYRULE_BRIDGE": {
        "connections": [
            "MAZE_ISLAND_CHILD",
            "MAZE_ISLAND_MAGIC",
            "MAZE_ISLAND_FORCED_BATTLE_1",
            "MAZE_ISLAND_FORCED_BATTLE_2",
            "MAZE_ISLAND_FORCED_BATTLE_3"
        ],
        "area": 2,
        "map": 3,
        "bottleneck": true
    },
    "MAZE_ISLAND_MAGIC": {
        "connections": [
            "MAZE_ISLAND_FORCED_BATTLE_3",
            "MAZE_ISLAND_FORCED_BATTLE_4"
        ],
        "area": 2,
        "map": 3
    },
    "MAZE_ISLAND_FORCED_BATTLE_1": {
        "area": 2,
        "map": 3,
        "bottleneck": true
    },
    "MAZE_ISLAND_FORCED_BATTLE_2": {
        "area": 2,
        "map": 3,
        "bottleneck": true
    },
    "MAZE_ISLAND_FORCED_BATTLE_3": {
        "area": 2,
        "map": 3,
        "bottleneck": true
    },
    "MAZE_ISLAND_FORCED_BATTLE_4": {
        "connections": [
            "MAZE_ISLAND_FORCED_BATTLE_5",
            "MAZE_ISLAND_FORCED_BATTLE_6",
            "MAZE_ISLAND_FORCED_BATTLE_7",
            "P4"
        ],
        "area": 2,
        "map": 3,
        "bottleneck": true
    },
    "MAZE_ISLAND_FORCED_BATTLE_5": {
        "area": 2,
        "map": 3,
        "bottleneck": true
    },
    "MAZE_ISLAND_FORCED_BATTLE_6": {
        "area": 2,
        "map": 3,
        "bottleneck": true
    },
    "MAZE_ISLAND_FORCED_BATTLE_7": {
        "area": 2,
        "map": 3,
        "bottleneck": true
    },
    "P4": {
        "items": [
            "BOOTS"
        ],
        "requirements": [
            "REFLECT"
        ],
        "area": 2,
        "map": 3
    },
    "MAZE_ISLAND_CHILD": {
        "items": [
            "CHILD"
        ],
        "area": 2,
        "map": 3
    },
    "GP": {
        "requirements": [
            "7CRYSTALS"
        ],
        "area": 1,
        "map": 2
    },
    "FIRE_TOWN": {
        "area": 1,
        "map": 2
    },
    "THUNDER_TOWN_SWAMP_LIFE": {
        "area": 1,
        "map": 2
    },
    "THUNDER_TOWN_CAVE_500P_BAG": {
        "area": 1,
        "map": 2
    },
    "ELEVATOR_CAVE_G_E_TL": {
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "ELEVATOR_CAVE_H_W_TR": {
        "subArea": 1,
        "map": 1,
        "bottleneck": true
    },
    "CAVE_N_S": {
        "subArea": 1,
        "map": 1,
        "connections": [
            "CAVE_N_N"
        ],
        "bottleneck": true
    },
    "CAVE_N_N": {
        "subArea": 1,
        "map": 1,
        "connections": [
            "CAVE_K"
        ],
        "bottleneck": true
    }
}