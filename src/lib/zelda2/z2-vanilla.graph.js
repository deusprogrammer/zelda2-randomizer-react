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
            "FOREST_50P",
            "SHIELD_TOWN_BOULDER"
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
        "requirements": [
            "JUMP_FAIRY"
        ],
        "connections": [
            "JUMP_CAVE_S"
        ],
        "bottleneck": true
    },
    "SHIELD_TOWN": {
        "requirements": [],
        "spells": [
            "SHIELD"
        ],
        "connections": [
            "SHIELD_TOWN_BOULDER"
        ]
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
            "FAIRY_TOWN_BOULDER",
            "SHIELD_TOWN_BOULDER",
            "LIFE_TOWN_BRIDGE_NS",
            "LIFE_TOWN_BRIDGE_EW",
            "LIFE_TOWN_FAIRY"
        ],
        "bottleneck": true
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
    "FAIRY_TOWN_BOULDER": {
        "connections": [
            "FAIRY_TOWN",
            "RAFT_DOCK_W",
            "KINGS_TOMB",
            "RED_JAR_CEM",
            "FAIRY_CAVE_HOLE",
            "EX_LIFE_BEACH",
            "DM_BRIDGE_EXIT_E"
        ],
        "x": 50,
        "y": 75,
        "bottleneck": true
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
        "requirements": [
            "RAFT"
        ],
        "connections": [
            "RAFT_DOCK_E"
        ],
        "bottleneck": true
    },
    "FAIRY_TOWN": {
        "requirements": [
            "MEDICINE"
        ],
        "spells": [
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
            "LIFE_TOWN_BRIDGE_EW"
        ],
        "bottleneck": true
    },
    "LIFE_TOWN_N": {
        "requirements": [
            "BAGU_SAUCE"
        ],
        "connections": [
            "LIFE_TOWN_S"
        ],
        "bottleneck": true
    },
    "LIFE_TOWN_S": {
        "connections": [
            "DM_ENTRANCE"
        ],
        "bottleneck": true
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
    "RAFT_DOCK_E": {
        "x": 70,
        "y": 77,
        "bottleneck": true
    },
    "KINGS_TOMB": {},
    "DM_EXIT": {
        "bottleneck": true
    },
    "DM_ENTRANCE": {
        "bottleneck": true
    },
    "SHIELD_TOWN_BOULDER": {
        "x": 48,
        "y": 65,
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
}