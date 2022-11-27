export default {
    "NORTH_CASTLE": {
         "requirements": [],
         "connections": [
              "MAGIC_CAVE",
              "TROPHY_CAVE",
              "PARAPA_CAVE_S",
              "JUMP_CAVE_N",
              "SHIELD_TOWN",
              "JUMP_TOWN",
              "FOREST_50P",
              "SHIELD_TOWN_BOULDER"
         ],
         "x": 23,
         "y": 52
    },
    "MAGIC_CAVE": {
         "requirements": [],
         "items": [
              "MAGIC"
         ],
         "connections": [],
         "x": 16,
         "y": 60
    },
    "TROPHY_CAVE": {
         "requirements": [],
         "connections": [],
         "x": 29,
         "y": 32
    },
    "PARAPA_CAVE_S": {
         "requirements": [],
         "connections": [
              "PARAPA_CAVE_N"
         ],
         "bottleneck": true,
         "x": 55,
         "y": 46
    },
    "PARAPA_CAVE_N": {
         "connections": [
              "P1",
              "BUBBLE_CLIFF"
         ],
         "bottleneck": true,
         "x": 48,
         "y": 41
    },
    "BUBBLE_CLIFF": {
         "connections": [
              "HEART_CLIFF"
         ],
         "bottleneck": true,
         "x": 61,
         "y": 57
    },
    "HEART_CLIFF": {
         "items": [
              "HEART"
         ],
         "x": 62,
         "y": 64
    },
    "JUMP_CAVE_N": {
         "requirements": [
              "JUMP_FAIRY"
         ],
         "connections": [
              "JUMP_CAVE_S"
         ],
         "bottleneck": true,
         "x": 1,
         "y": 58
    },
    "SHIELD_TOWN": {
         "requirements": [],
         "spells": [
              "SHIELD"
         ],
         "connections": [
              "SHIELD_TOWN_BOULDER"
         ],
         "x": 46,
         "y": 54
    },
    "JUMP_TOWN": {
         "requirements": [
              "TROPHY"
         ],
         "spells": [
              "JUMP"
         ],
         "connections": [],
         "x": 2,
         "y": 36
    },
    "FOREST_50P": {
         "requirements": [],
         "items": "50p",
         "connections": [],
         "x": 37,
         "y": 42
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
         "bottleneck": true,
         "x": 3,
         "y": 62
    },
    "MEDICINE_CAVE_FAIRY": {
         "items": [
              "FAIRY"
         ],
         "x": 7,
         "y": 64
    },
    "BAGUS_CABIN": {
         "items": [
              "BAGU"
         ],
         "x": 21,
         "y": 76
    },
    "EX_LIFE_SWAMP_1": {
         "items": [
              "1UP"
         ],
         "x": 8,
         "y": 71
    },
    "MEDICINE_CAVE": {
         "requirements": [
              "HAMMER"
         ],
         "items": [
              "MEDICINE"
         ],
         "x": 9,
         "y": 69
    },
    "HEART_CAVE": {
         "requirments": [
              "HAMMER"
         ],
         "items": [
              "HEART"
         ],
         "x": 54,
         "y": 62
    },
    "CAVE_200P": {
         "items": [
              "200P"
         ],
         "x": 38,
         "y": 62
    },
    "P2_RED_JAR": {
         "items": [
              "RED_JAR"
         ],
         "x": 37,
         "y": 68
    },
    "RED_JAR_SWAMP": {
         "items": [
              "RED_JAR"
         ],
         "x": 17,
         "y": 67
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
         ],
         "x": 38,
         "y": 102
    },
    "RED_JAR_CEM": {
         "items": [
              "RED_JAR"
         ],
         "x": 48,
         "y": 92
    },
    "RAFT_DOCK_W": {
         "requirements": [
              "RAFT"
         ],
         "connections": [
              "RAFT_DOCK_E"
         ],
         "bottleneck": true,
         "x": 61,
         "y": 77
    },
    "FAIRY_TOWN": {
         "requirements": [
              "MEDICINE"
         ],
         "spells": [
              "FAIRY"
         ],
         "x": 60,
         "y": 75
    },
    "FAIRY_CAVE_HOLE": {
         "requirements": [
              "FAIRY"
         ],
         "connections": [
              "FAIRY_CAVE"
         ],
         "bottleneck": true,
         "x": 50,
         "y": 96
    },
    "FAIRY_CAVE": {
         "connections": [
              "P3"
         ],
         "bottleneck": true,
         "x": 59,
         "y": 102
    },
    "LIFE_TOWN_BRIDGE_NS": {
         "spells": [
              "LIFE"
         ],
         "connections": [
              "LIFE_TOWN_N",
              "LIFE_TOWN_BRIDGE_EW"
         ],
         "bottleneck": true,
         "x": 16,
         "y": 82
    },
    "LIFE_TOWN_N": {
         "requirements": [
              "BAGU_SAUCE"
         ],
         "connections": [
              "LIFE_TOWN_S"
         ],
         "bottleneck": true,
         "x": 8,
         "y": 89
    },
    "LIFE_TOWN_S": {
         "connections": [
              "DM_ENTRANCE"
         ],
         "bottleneck": true,
         "x": 8,
         "y": 91
    },
    "DM_BRIDGE_EXIT_E": {
         "connections": [
              "DM_BRIDGE_EXIT_W"
         ],
         "bottleneck": true,
         "x": 34,
         "y": 97
    },
    "DM_BRIDGE_EXIT_W": {
         "connections": [
              "DM_EXIT"
         ],
         "bottleneck": true,
         "x": 26,
         "y": 97
    },
    "P1": {
         "x": 62,
         "y": 32
    },
    "P2": {
         "requirements": [
              "HANDY_GLOVE"
         ],
         "items": [
              "HANDY_GLOVE"
         ],
         "x": 11,
         "y": 64
    },
    "P3": {
         "requirements": [
              "HANDY_GLOVE",
              "DOWN_STAB"
         ],
         "x": 57,
         "y": 98
    },
    "RAFT_DOCK_E": {
         "x": 70,
         "y": 77,
         "bottleneck": true
    },
    "KINGS_TOMB": {
         "x": 50,
         "y": 88
    },
    "DM_EXIT": {
         "bottleneck": true,
         "x": 21,
         "y": 96
    },
    "DM_ENTRANCE": {
         "bottleneck": true,
         "x": 10,
         "y": 95
    },
    "SHIELD_TOWN_BOULDER": {
         "x": 48,
         "y": 65,
         "bottleneck": true
    },
    "LIFE_TOWN_BRIDGE_EW": {
         "bottleneck": true,
         "x": 26,
         "y": 87
    },
    "LIFE_TOWN_FAIRY": {
         "x": 33,
         "y": 87
    },
    "LOST_WOODS_1": {
         "x": 21,
         "y": 77
    },
    "LOST_WOODS_2": {
         "x": 20,
         "y": 76
    },
    "LOST_WOODS_3": {
         "x": 17,
         "y": 77
    },
    "LOST_WOODS_4": {
         "x": 19,
         "y": 78
    },
    "LOST_WOODS_5": {
         "x": 23,
         "y": 77
    }
}