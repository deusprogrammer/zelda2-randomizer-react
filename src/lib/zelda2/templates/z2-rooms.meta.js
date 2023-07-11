export default {
     "5:0": {
          "type": "ENTRANCE",
          "mapSet": 5,
          "mapNumber": 0,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "5:1": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 1,
          "palace": 1,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "DOWN",
                    "to": "KEY",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:2": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 2,
          "palace": 1,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:3": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 3,
          "palace": 1,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:4": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 4,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "5:5": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 5,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:6": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 6,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "5:7": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 7,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:8": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 8,
          "palace": 1,
          "items": [
               "CANDLE"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "CANDLE",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:9": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 9,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:10": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 10,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:11": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 11,
          "palace": 1,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "5:12": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 12,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:13": {
          "type": "BOSS",
          "mapSet": 5,
          "mapNumber": 13,
          "palace": 1,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY",
                         "BOSS"
                    ]
               }
          ]
     },
     "5:14": {
          "type": "ENTRANCE",
          "mapSet": 5,
          "mapNumber": 14,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "5:15": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 15,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:16": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 16,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:17": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 17,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:18": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 18,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:19": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 19,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:20": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 20,
          "palace": 2,
          "items": [
               "GLOVE"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "GLOVE",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:21": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 21,
          "palace": 2,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "JUMP"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "JUMP"
                    ]
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:22": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 22,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:23": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 23,
          "palace": 2,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:24": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 24,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:25": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 25,
          "palace": 2,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "5:26": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 26,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "5:27": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 27,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "5:28": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 28,
          "palace": 2,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:29": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 29,
          "palace": 2,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "5:30": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 30,
          "palace": 2,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:31": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 31,
          "palace": 2,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "5:32": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 32,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:33": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 33,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:34": {
          "type": "BOSS",
          "mapSet": 5,
          "mapNumber": 34,
          "palace": 2,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY",
                         "BOSS"
                    ]
               }
          ]
     },
     "5:35": {
          "type": "ENTRANCE",
          "mapSet": 5,
          "mapNumber": 35,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "5:36": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 36,
          "palace": 5,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "5:37": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 37,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "FAIRY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "FAIRY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:38": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 38,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:39": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 39,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:40": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 40,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               },
               {
                    "from": "DOWN",
                    "to": "KEY",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:41": {
          "type": "BOSS",
          "mapSet": 5,
          "mapNumber": 41,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY",
                         "BOSS"
                    ]
               }
          ]
     },
     "5:42": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 42,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               },
               {
                    "from": "DOWN",
                    "to": "KEY",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:43": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 43,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "JUMP"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "JUMP"
                    ]
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:44": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 44,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "5:45": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 45,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:46": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 46,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "JUMP"
                    ]
               }
          ]
     },
     "5:47": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 47,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:49": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 49,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:50": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 50,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:51": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 51,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:52": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 52,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:53": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 53,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:54": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 54,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "5:55": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 55,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:56": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 56,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "5:57": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 57,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:58": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 58,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:59": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 59,
          "palace": 5,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "5:60": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 60,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:61": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 61,
          "palace": 5,
          "items": [
               "RECORDER"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "RECORDER",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "5:62": {
          "type": "ROOM",
          "mapSet": 5,
          "mapNumber": 62,
          "palace": 5,
          "items": [],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:0": {
          "type": "ENTRANCE",
          "mapSet": 6,
          "mapNumber": 0,
          "palace": 3,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:1": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 1,
          "palace": 3,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:2": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 2,
          "palace": 3,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "DOWNSTAB",
                         "GLOVE"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "DOWNSTAB",
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:3": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 3,
          "palace": 3,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:4": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 4,
          "palace": 3,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "DOWNSTAB",
                         "GLOVE"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "DOWNSTAB",
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:5": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 5,
          "palace": 3,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:6": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 6,
          "palace": 3,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:7": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 7,
          "palace": 3,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:8": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 8,
          "palace": 3,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "UPSTAB",
                         "GLOVE"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "KEY",
                         "UPSTAB",
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:10": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 10,
          "palace": 3,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY",
                         "GLOVE"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "KEY",
                         "GLOVE"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "KEY",
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:12": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 12,
          "palace": 3,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:13": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 13,
          "palace": 3,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "GLOVE",
                         "DOWNSTAB",
                         "UPSTAB"
                    ]
               }
          ]
     },
     "6:14": {
          "type": "BOSS",
          "mapSet": 6,
          "mapNumber": 14,
          "palace": 3,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY",
                         "BOSS"
                    ]
               }
          ]
     },
     "6:15": {
          "type": "ENTRANCE",
          "mapSet": 6,
          "mapNumber": 15,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:16": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 16,
          "palace": 4,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:17": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 17,
          "palace": 4,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "UPSTAB",
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "UPSTAB"
                    ]
               }
          ]
     },
     "6:18": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 18,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:19": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 19,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:20": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 20,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:21": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 21,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:22": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 22,
          "palace": 4,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:23": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 23,
          "palace": 4,
          "items": [],
          "exits": [
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:24": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 24,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "LEFT",
                    "requirements": [
                         "FAIRY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:25": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 25,
          "palace": 4,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:26": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 26,
          "palace": 4,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:27": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 27,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:28": {
          "type": "BOSS",
          "mapSet": 6,
          "mapNumber": 28,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY",
                         "BOSS"
                    ]
               }
          ]
     },
     "6:29": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 29,
          "palace": 4,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:30": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 30,
          "palace": 4,
          "items": [],
          "exits": [
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:31": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 31,
          "palace": 4,
          "items": [
               "BOOTS"
          ],
          "exits": [
               "LEFT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "BOOTS",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:32": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 32,
          "palace": 4,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:33": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 33,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:34": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 34,
          "palace": 4,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:35": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 35,
          "palace": 4,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:36": {
          "type": "ENTRANCE",
          "mapSet": 6,
          "mapNumber": 36,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:37": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 37,
          "palace": 6,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:38": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 38,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:39": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 39,
          "palace": 6,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:40": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 40,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:41": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 41,
          "palace": 6,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": []
               }
          ]
     },
     "6:42": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 42,
          "palace": 6,
          "items": [],
          "exits": [
               "UP",
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               }
          ]
     },
     "6:43": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 43,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:44": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 44,
          "palace": 6,
          "items": [
               "CROSS"
          ],
          "exits": [
               "LEFT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "CROSS",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:45": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 45,
          "palace": 6,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:46": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 46,
          "palace": 6,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:47": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 47,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:48": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 48,
          "palace": 6,
          "items": [],
          "exits": [
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:49": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 49,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:50": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 50,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:51": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 51,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "FAIRY"
                    ]
               }
          ]
     },
     "6:52": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 52,
          "palace": 6,
          "items": [
               "KEY"
          ],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "UPSTAB",
                         "GLOVE",
                         "JUMP"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "KEY",
                    "requirements": [
                         "KEY",
                         "UPSTAB",
                         "GLOVE",
                         "JUMP"
                    ]
               }
          ]
     },
     "6:53": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 53,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "6:54": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 54,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:55": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 55,
          "palace": 6,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:56": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 56,
          "palace": 6,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:57": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 57,
          "palace": 6,
          "items": [],
          "exits": [
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": [
                         "FAIRY"
                    ]
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "6:58": {
          "type": "BOSS",
          "mapSet": 6,
          "mapNumber": 58,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "BOSS",
                         "KEY"
                    ]
               }
          ]
     },
     "6:59": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 59,
          "palace": 6,
          "items": [
               "KEY"
          ],
          "exits": [
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "KEY",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "6:60": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 60,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "KEY"
                    ]
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "KEY"
                    ]
               }
          ]
     },
     "6:61": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 61,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               }
          ]
     },
     "6:62": {
          "type": "ROOM",
          "mapSet": 6,
          "mapNumber": 62,
          "palace": 6,
          "items": [],
          "exits": [
               "LEFT",
               "UP"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               }
          ]
     },
     "7:0": {
          "type": "ENTRANCE",
          "mapSet": 7,
          "mapNumber": 0,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:1": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 1,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:2": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 2,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:3": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 3,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:4": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 4,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT"
          ],
          "connections": []
     },
     "7:5": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 5,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:6": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 6,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:7": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 7,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:8": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 8,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:9": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 9,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "7:10": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 10,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:11": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 11,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "7:12": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 12,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:13": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 13,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": [
                         "GLOVE"
                    ]
               },
               {
                    "from": "DOWN",
                    "to": "LEFT",
                    "requirements": [
                         "GLOVE",
                         "UPSTAB",
                         "JUMP"
                    ]
               }
          ]
     },
     "7:14": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 14,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:16": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 16,
          "palace": 7,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:17": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 17,
          "palace": 7,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:18": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 18,
          "palace": 7,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:19": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 19,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:20": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 20,
          "palace": 7,
          "items": [],
          "exits": [
               "UP",
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:21": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 21,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:22": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 22,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:23": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 23,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:24": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 24,
          "palace": 7,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:25": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 25,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "7:26": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 26,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:27": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 27,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "7:29": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 29,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:30": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 30,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:31": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 31,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:33": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 33,
          "palace": 7,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:34": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 34,
          "palace": 7,
          "items": [],
          "exits": [
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:35": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 35,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "7:36": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 36,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:37": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 37,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:38": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 38,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:39": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 39,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:40": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 40,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:41": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 41,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:42": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 42,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:43": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 43,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": [
                         "GLOVE"
                    ]
               }
          ]
     },
     "7:44": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 44,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "FAIRY"
                    ]
               }
          ]
     },
     "7:45": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 45,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": [
                         "GLOVE",
                         "DOWNSTAB"
                    ]
               }
          ]
     },
     "7:46": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 46,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               }
          ]
     },
     "7:47": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 47,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT"
          ],
          "connections": []
     },
     "7:48": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 48,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:49": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 49,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "LEFT",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:50": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 50,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:51": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 51,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT"
          ],
          "connections": []
     },
     "7:52": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 52,
          "palace": 7,
          "items": [],
          "exits": [
               "RIGHT",
               "UP"
          ],
          "connections": [
               {
                    "from": "UP",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     },
     "7:53": {
          "type": "BOSS",
          "mapSet": 7,
          "mapNumber": 53,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": [
                         "BOSS",
                         "KEY"
                    ]
               }
          ]
     },
     "7:54": {
          "type": "DARK_LINK",
          "mapSet": 7,
          "mapNumber": 54,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT"
          ],
          "connections": []
     },
     "7:55": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 55,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:56": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 56,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:57": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 57,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:58": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 58,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:59": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 59,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:60": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 60,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:61": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 61,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT",
               "UP",
               "DOWN"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               },
               {
                    "from": "UP",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "LEFT",
                    "to": "DOWN",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "UP",
                    "requirements": []
               },
               {
                    "from": "RIGHT",
                    "to": "DOWN",
                    "requirements": []
               }
          ]
     },
     "7:62": {
          "type": "ROOM",
          "mapSet": 7,
          "mapNumber": 62,
          "palace": 7,
          "items": [],
          "exits": [
               "LEFT",
               "RIGHT"
          ],
          "connections": [
               {
                    "from": "LEFT",
                    "to": "RIGHT",
                    "requirements": []
               }
          ]
     }
}
