export default {
     "NODE0": {
          "id": "NORTH_CASTLE",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 0,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE1",
               "NODE2",
               "NODE3",
               "NODE7",
               "NODE8",
               "NODE9",
               "NODE10"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE1": {
          "id": "MAGIC_CAVE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 45,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE2": {
          "id": "TROPHY_CAVE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 33,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE3": {
          "id": "PARAPA_CAVE_S",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 7,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE4"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE4": {
          "id": "PARAPA_CAVE_N",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 7,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE3"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE32",
               "NODE5"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE5": {
          "id": "BUBBLE_CLIFF",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 6,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE6"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE6": {
          "id": "HEART_CLIFF",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 38,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE7": {
          "id": "JUMP_CAVE_N",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 9,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE12"
          ],
          "linkRequirements": {
               "NODE12": [
                    "FAIRY | JUMP"
               ]
          },
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE8": {
          "id": "SHIELD_TOWN",
          "type": "TOWN",
          "continent": 0,
          "mapSet": 1,
          "mapNumber": 2,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE33"
          ],
          "connectionRequirements": {
               "NODE33": [
                    "HAMMER"
               ]
          },
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE9": {
          "id": "JUMP_TOWN",
          "type": "TOWN",
          "continent": 0,
          "mapSet": 1,
          "mapNumber": 5,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [
               "TROPHY"
          ],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE10": {
          "id": "FOREST_50P",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 43,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE11": {
          "id": "FOREST_100P",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 46,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE12": {
          "id": "JUMP_CAVE_S",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 11,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE7"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE13",
               "NODE16",
               "NODE15",
               "NODE14",
               "NODE40",
               "NODE41",
               "NODE42",
               "NODE43",
               "NODE44",
               "NODE17",
               "NODE18",
               "NODE33",
               "NODE19",
               "NODE20",
               "NODE24",
               "NODE27",
               "NODE38",
               "NODE39"
          ],
          "connectionRequirements": {
               "NODE24": [
                    "HAMMER"
               ]
          },
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE13": {
          "id": "MEDICINE_CAVE_FAIRY",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 20,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE14": {
          "id": "BAGUS_CABIN",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 1,
          "mapNumber": 24,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE15": {
          "id": "EX_LIFE_SWAMP_1",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 51,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE16": {
          "id": "MEDICINE_CAVE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 14,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE17": {
          "id": "HEART_CAVE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 16,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE18": {
          "id": "CAVE_200P",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 12,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE19": {
          "id": "P2_RED_JAR",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 57,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE20": {
          "id": "RED_JAR_SWAMP",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 51,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE21": {
          "id": "EX_LIFE_BEACH",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 57,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE22": {
          "id": "RED_JAR_CEM",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 56,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE23": {
          "id": "RAFT_DOCK_W",
          "type": "DOCK",
          "continent": 2,
          "mapSet": 0,
          "mapNumber": 41,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE45"
          ],
          "linkRequirements": {
               "NODE45": [
                    "RAFT"
               ]
          },
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE24": {
          "id": "FAIRY_TOWN",
          "type": "TOWN",
          "continent": 0,
          "mapSet": 1,
          "mapNumber": 11,
          "passThrough": false,
          "ability": "DOWNSTAB",
          "abilityRequirements": [
               "JUMP"
          ],
          "spellRequirements": [
               "MEDICINE"
          ],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE23",
               "NODE35",
               "NODE22",
               "NODE25",
               "NODE21",
               "NODE30"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE25": {
          "id": "FAIRY_CAVE_HOLE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 18,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE26"
          ],
          "linkRequirements": {
               "NODE26": [
                    "FAIRY"
               ]
          },
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE26": {
          "id": "FAIRY_CAVE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 19,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE25"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE34"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE27": {
          "id": "LIFE_TOWN_BRIDGE_NS",
          "type": "BRIDGE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 1,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE28",
               "NODE38",
               "NODE11"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE28": {
          "id": "LIFE_TOWN_N",
          "type": "TOWN",
          "continent": 0,
          "mapSet": 1,
          "mapNumber": 8,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE29"
          ],
          "linkRequirements": {
               "NODE29": [
                    "FAIRY | JUMP"
               ]
          },
          "connections": [],
          "connectionRequirements": {
               "NODE29": [
                    "BAGU_SAUCE | FAIRY"
               ]
          },
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE29": {
          "id": "LIFE_TOWN_S",
          "type": "TOWN",
          "continent": 0,
          "mapSet": 1,
          "mapNumber": 6,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE28"
          ],
          "linkRequirements": {
               "NODE28": [
                    "FAIRY | JUMP"
               ]
          },
          "connections": [
               "NODE37"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE30": {
          "id": "DM_BRIDGE_EXIT_E",
          "type": "BRIDGE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 5,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE31"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE31": {
          "id": "DM_BRIDGE_EXIT_W",
          "type": "BRIDGE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 4,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE30"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE36"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE32": {
          "id": "P1",
          "type": "PALACE",
          "continent": 0,
          "mapSet": 3,
          "mapNumber": 0,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE33": {
          "id": "P2",
          "type": "PALACE",
          "continent": 0,
          "mapSet": 3,
          "mapNumber": 14,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [
               "HANDY_GLOVE"
          ],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE34": {
          "id": "P3",
          "type": "PALACE",
          "continent": 0,
          "mapSet": 4,
          "mapNumber": 0,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE35": {
          "id": "KINGS_TOMB",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 1,
          "mapNumber": 60,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE36": {
          "id": "DM_EXIT",
          "type": "OTHER",
          "continent": 1,
          "mapSet": 0,
          "mapNumber": 43,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE117"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE37": {
          "id": "DM_ENTRANCE",
          "type": "OTHER",
          "continent": 1,
          "mapSet": 0,
          "mapNumber": 42,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE82"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE38": {
          "id": "LIFE_TOWN_BRIDGE_EW",
          "type": "BRIDGE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 2,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE39": {
          "id": "LIFE_TOWN_FAIRY",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 20,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE40": {
          "id": "LOST_WOODS_1",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 44,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE41": {
          "id": "LOST_WOODS_2",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 21,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE42": {
          "id": "LOST_WOODS_3",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 22,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE43": {
          "id": "LOST_WOODS_4",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 23,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE44": {
          "id": "LOST_WOODS_5",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 23,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 0,
               "area": 0,
               "subArea": 0
          }
     },
     "NODE45": {
          "id": "RAFT_DOCK_E",
          "type": "DOCK",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 41,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE23"
          ],
          "linkRequirements": {
               "NODE23": [
                    "RAFT"
               ]
          },
          "connections": [
               "NODE75",
               "NODE76",
               "NODE130",
               "NODE73",
               "NODE46",
               "NODE74",
               "NODE77",
               "NODE78",
               "NODE79",
               "NODE48"
          ],
          "connectionRequirements": {
               "NODE23": [
                    "RAFT"
               ],
               "NODE48": [
                    "RECORDER"
               ],
               "NODE79": [
                    "BOOTS"
               ],
               "NODE77": [
                    "BOOTS"
               ],
               "undefined": [
                    "BOOTS | HAMMER"
               ]
          },
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE46": {
          "id": "FIRE_TOWN_CAVE_EXIT",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 8,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE47"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE47": {
          "id": "FIRE_TOWN_CAVE_ENTRANCE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 8,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE46"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE81",
               "NODE69",
               "NODE72"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE48": {
          "id": "WILSON_FENCE_1",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 2,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE49"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE49": {
          "id": "WILSON_FENCE_2",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 3,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE50"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE50": {
          "id": "WILSON_FENCE_3",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 4,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE59",
               "NODE131",
               "NODE132",
               "NODE56",
               "NODE57",
               "NODE53",
               "NODE52",
               "NODE51",
               "NODE80"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE51": {
          "id": "P6_HEART",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 46,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE52": {
          "id": "P6_500P_BAG",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 44,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE53": {
          "id": "SPELL_TOWN_CAVE_ENTRANCE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 13,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE54"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE54": {
          "id": "SPELL_TOWN_CAVE_EXIT",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 14,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE53"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE55"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE55": {
          "id": "SPELL_TOWN",
          "type": "TOWN",
          "continent": 2,
          "mapSet": 2,
          "mapNumber": 18,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM",
               "BIG_ITEM"
          ],
          "itemRequirements": [
               "SPELL",
               "MAGIC7"
          ],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE56": {
          "id": "THUNDER_TOWN_N_BRIDGE",
          "type": "BRIDGE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 0,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE80"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE57": {
          "id": "THUNDER_TOWN_E_BRIDGE",
          "type": "BRIDGE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 1,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE58"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE58": {
          "id": "THUNDER_TOWN",
          "type": "TOWN",
          "continent": 2,
          "mapSet": 2,
          "mapNumber": 23,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [
               "MAGIC8"
          ],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE59": {
          "id": "WILSON_FENCE_4",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 5,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE67",
               "NODE60"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE60": {
          "id": "DEATH_VALLEY_BATTLE_1",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 26,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE68",
               "NODE61"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE61": {
          "id": "DEATH_VALLEY_BATTLE_2",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 24,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE62"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE62": {
          "id": "DEATH_VALLEY_CAVE_2_ENTRANCE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 20,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE63"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE63": {
          "id": "DEATH_VALLEY_CAVE_2_EXIT",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 19,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE62"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE64"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE64": {
          "id": "DEATH_VALLEY_BATTLE_3",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 25,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE65"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE65": {
          "id": "DEATH_VALLEY_CAVE_1_EXIT",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 16,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE66"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE66": {
          "id": "DEATH_VALLEY_CAVE_1_ENTRANCE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 16,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE65"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE129"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE67": {
          "id": "DEATH_VALLEY_RED_JAR",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 62,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE68": {
          "id": "DEATH_VALLEY_500P_BAG",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 62,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE69": {
          "id": "REFLECT_TOWN_CLIFF_2",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 23,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE70"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE70": {
          "id": "REFLECT_TOWN_CLIFF_1",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 6,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE71"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE71": {
          "id": "REFLECT_TOWN",
          "type": "TOWN",
          "continent": 2,
          "mapSet": 2,
          "mapNumber": 17,
          "passThrough": false,
          "ability": "UPSTAB",
          "abilityRequirements": [
               "FAIRY"
          ],
          "spellRequirements": [
               "CHILD"
          ],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE72": {
          "id": "MAZE_ISLAND_BRIDGE",
          "type": "BRIDGE",
          "continent": 1,
          "mapSet": 0,
          "mapNumber": 40,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE118"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE73": {
          "id": "FIRE_TOWN_CAVE_500P_BAG",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 9,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE74": {
          "id": "FIRE_TOWN_RED_JAR",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 57,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE75": {
          "id": "FIRE_TOWN_FOREST_500P_BAG",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 38,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE76": {
          "id": "FIRE_TOWN_FAIRY",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 45,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE77": {
          "id": "P5_HEART",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 7,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE78": {
          "id": "P5_500P_BAG",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 33,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE79": {
          "id": "P5",
          "type": "PALACE",
          "continent": 2,
          "mapSet": 3,
          "mapNumber": 35,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE80": {
          "id": "P6",
          "type": "PALACE",
          "continent": 2,
          "mapSet": 4,
          "mapNumber": 36,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE81": {
          "id": "DAZZLE_LIFE",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 57,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE82": {
          "id": "CAVE_A",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 42,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE37"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE83",
               "NODE97"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE83": {
          "id": "CAVE_B_E",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 1,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE84"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE84": {
          "id": "CAVE_B_W",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 1,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE83"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE85"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE85": {
          "id": "CAVE_D_E",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 4,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE86"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE86": {
          "id": "CAVE_D_W",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 4,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE85"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE87",
               "NODE133"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE87": {
          "id": "CAVE_F_W",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 5,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE88"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE88": {
          "id": "CAVE_F_E",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 5,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE87"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE89"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE89": {
          "id": "CAVE_I_S",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 7,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE90"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE90": {
          "id": "CAVE_I_N",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 7,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE89"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE91",
               "NODE93",
               "NODE94"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE91": {
          "id": "CAVE_M_W",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 10,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE92"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE92": {
          "id": "CAVE_M_E",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 10,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE91"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE93": {
          "id": "ELEVATOR_CAVE_G_E_BL",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 22,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE95",
               "NODE96",
               "NODE133"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE94": {
          "id": "ELEVATOR_CAVE_H_E_TL",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 24,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE134",
               "NODE102",
               "NODE101"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE95": {
          "id": "ELEVATOR_CAVE_G_W_BR",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 22,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE93"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE96": {
          "id": "ELEVATOR_CAVE_G_W_TR",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 23,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE93"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE104",
               "NODE96"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE97": {
          "id": "CAVE_C_E",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 2,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE98"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE98": {
          "id": "CAVE_C_W",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 2,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE97"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE99"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE99": {
          "id": "CAVE_E_N",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 3,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE100"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE100": {
          "id": "CAVE_E_S",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 3,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE99"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE101"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE101": {
          "id": "ELEVATOR_CAVE_H_D_BL",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 25,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE102",
               "NODE134",
               "NODE94"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE102": {
          "id": "ELEVATOR_CAVE_H_N_BR",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 25,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE101",
               "NODE94"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE103",
               "NODE105"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE103": {
          "id": "CAVE_J_W",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 6,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE104"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE104": {
          "id": "CAVE_J_E",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 6,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE103"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE105": {
          "id": "CAVE_L_S",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 8,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE106"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE106": {
          "id": "CAVE_L_N",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 8,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE105"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE107"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE107": {
          "id": "CAVE_O_S",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 9,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE108"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE108": {
          "id": "CAVE_O_N",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 9,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE107"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE109"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE109": {
          "id": "CAVE_P_W",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 11,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE110"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE110": {
          "id": "CAVE_P_E",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 11,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE109"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE111"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE111": {
          "id": "CAVE_Q_E",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 12,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE112"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE112": {
          "id": "CAVE_Q_W",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 12,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE111"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE113"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE113": {
          "id": "CAVE_R_N",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 13,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE114"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE114": {
          "id": "CAVE_R_S",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 13,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE113"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE135",
               "NODE115",
               "NODE116"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE115": {
          "id": "HAMMER_CAVE",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 15,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE116": {
          "id": "DM_MAGIC",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 26,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE117": {
          "id": "CAVE_K",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 43,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE36"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE118": {
          "id": "EAST_HYRULE_BRIDGE",
          "type": "BRIDGE",
          "continent": 2,
          "mapSet": 0,
          "mapNumber": 40,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE72"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE128",
               "NODE119",
               "NODE120",
               "NODE121",
               "NODE122"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE119": {
          "id": "MAZE_ISLAND_MAGIC",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 36,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE122",
               "NODE123"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE120": {
          "id": "MAZE_ISLAND_FORCED_BATTLE_1",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 35,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE121": {
          "id": "MAZE_ISLAND_FORCED_BATTLE_2",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 34,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE122": {
          "id": "MAZE_ISLAND_FORCED_BATTLE_3",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 47,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE123": {
          "id": "MAZE_ISLAND_FORCED_BATTLE_4",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 49,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [
               "NODE124",
               "NODE125",
               "NODE126",
               "NODE127"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE124": {
          "id": "MAZE_ISLAND_FORCED_BATTLE_5",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 50,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE125": {
          "id": "MAZE_ISLAND_FORCED_BATTLE_6",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 51,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE126": {
          "id": "MAZE_ISLAND_FORCED_BATTLE_7",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 48,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE127": {
          "id": "P4",
          "type": "PALACE",
          "continent": 1,
          "mapSet": 4,
          "mapNumber": 15,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE128": {
          "id": "MAZE_ISLAND_CHILD",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 37,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "SMALL_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 3,
               "area": 2,
               "subArea": 0
          }
     },
     "NODE129": {
          "id": "GP",
          "type": "PALACE",
          "continent": 2,
          "mapSet": 5,
          "mapNumber": 0,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [
               "BIG_ITEM"
          ],
          "itemRequirements": [],
          "entryRequirements": [
               "CRYSTALS"
          ],
          "completionRequirements": [
               "THUNDER",
               "DOWNSTAB",
               "HANDY_GLOVE"
          ],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE130": {
          "id": "FIRE_TOWN",
          "type": "TOWN",
          "continent": 2,
          "mapSet": 2,
          "mapNumber": 14,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE131": {
          "id": "THUNDER_TOWN_SWAMP_LIFE",
          "type": "OTHER",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 51,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE132": {
          "id": "THUNDER_TOWN_CAVE_500P_BAG",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 11,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 2,
               "area": 1,
               "subArea": 0
          }
     },
     "NODE133": {
          "id": "ELEVATOR_CAVE_G_E_TL",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 23,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE93"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE134": {
          "id": "ELEVATOR_CAVE_H_W_TR",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 24,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE101",
               "NODE94"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE135": {
          "id": "CAVE_N_S",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 14,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE136"
          ],
          "linkRequirements": {},
          "connections": [],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     },
     "NODE136": {
          "id": "CAVE_N_N",
          "type": "CAVE",
          "continent": 0,
          "mapSet": 0,
          "mapNumber": 14,
          "passThrough": false,
          "ability": "",
          "abilityRequirements": [],
          "spellRequirements": [],
          "items": [],
          "itemRequirements": [],
          "entryRequirements": [],
          "completionRequirements": [],
          "links": [
               "NODE135"
          ],
          "linkRequirements": {},
          "connections": [
               "NODE117"
          ],
          "connectionRequirements": {},
          "renderData": {
               "map": 1,
               "area": 0,
               "subArea": 1
          }
     }
}
