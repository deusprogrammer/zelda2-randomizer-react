export default {
    "5": {
         "0": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "1": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "down",
                        "to": "KEY",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "2": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "3": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "4": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "5": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "6": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "7": {
              "items": [],
              "nodes": [
                   "left",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "8": {
              "items": [
                   "CANDLE"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "CANDLE",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "9": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "10": {
              "items": [],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "11": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "12": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "13": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY",
                             "BOSS"
                        ]
                   }
              ]
         },
         "14": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "15": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "16": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "17": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "18": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "19": {
              "items": [],
              "nodes": [
                   "left",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "20": {
              "items": [
                   "GLOVE"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "GLOVE",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "21": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": [
                             "JUMP"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "JUMP"
                        ]
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "22": {
              "items": [],
              "nodes": [
                   "left",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "23": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "24": {
              "items": [],
              "nodes": [
                   "left",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "25": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "26": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "27": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "28": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "29": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "30": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "31": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "32": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "33": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "34": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY",
                             "BOSS"
                        ]
                   }
              ]
         },
         "35": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "36": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "37": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "FAIRY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": [
                             "FAIRY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "38": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "39": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "40": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   },
                   {
                        "from": "down",
                        "to": "KEY",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "41": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY",
                             "BOSS"
                        ]
                   }
              ]
         },
         "42": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   },
                   {
                        "from": "down",
                        "to": "KEY",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "43": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": [
                             "JUMP"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "JUMP"
                        ]
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "44": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "45": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "46": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "JUMP"
                        ]
                   }
              ]
         },
         "47": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "49": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "50": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "51": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "52": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "53": {
              "items": [],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "54": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "55": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "56": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "57": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "58": {
              "items": [],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "59": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "60": {
              "items": [],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "61": {
              "items": [
                   "RECORDER"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "RECORDER",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "62": {
              "items": [],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         }
    },
    "6": {
         "0": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "1": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "2": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "DOWNSTAB",
                             "GLOVE"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": [
                             "DOWNSTAB",
                             "GLOVE"
                        ]
                   }
              ]
         },
         "3": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "4": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "DOWNSTAB",
                             "GLOVE"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": [
                             "DOWNSTAB",
                             "GLOVE"
                        ]
                   }
              ]
         },
         "5": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "down",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "6": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "7": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "8": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "UPSTAB",
                             "GLOVE"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": [
                             "KEY",
                             "UPSTAB",
                             "GLOVE"
                        ]
                   }
              ]
         },
         "10": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY",
                             "GLOVE"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": [
                             "KEY",
                             "GLOVE"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "key",
                        "requirements": [
                             "KEY",
                             "GLOVE"
                        ]
                   }
              ]
         },
         "12": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "13": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "GLOVE",
                             "DOWNSTAB",
                             "UPSTAB"
                        ]
                   }
              ]
         },
         "14": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY",
                             "BOSS"
                        ]
                   }
              ]
         },
         "15": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "16": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "17": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "UPSTAB",
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": [
                             "UPSTAB"
                        ]
                   }
              ]
         },
         "18": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "19": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "20": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "21": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "22": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "23": {
              "items": [],
              "nodes": [
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "24": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "down",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "left",
                        "requirements": [
                             "FAIRY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "25": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "26": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "27": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "28": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY",
                             "BOSS"
                        ]
                   }
              ]
         },
         "29": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "30": {
              "items": [],
              "nodes": [
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "31": {
              "items": [
                   "BOOTS"
              ],
              "nodes": [
                   "left"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "BOOTS",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "32": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "33": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "34": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "35": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "36": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "37": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "38": {
              "items": [],
              "nodes": [
                   "left",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "39": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "40": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "41": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "KEY",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": []
                   }
              ]
         },
         "42": {
              "items": [],
              "nodes": [
                   "up",
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   }
              ]
         },
         "43": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "44": {
              "items": [
                   "CROSS"
              ],
              "nodes": [
                   "left"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "CROSS",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "45": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "46": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "47": {
              "items": [],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "48": {
              "items": [],
              "nodes": [
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "49": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "50": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "51": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "FAIRY"
                        ]
                   }
              ]
         },
         "52": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "UPSTAB",
                             "GLOVE",
                             "JUMP"
                        ]
                   },
                   {
                        "from": "left",
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
         "53": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "54": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "55": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "56": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "57": {
              "items": [],
              "nodes": [
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": [
                             "FAIRY"
                        ]
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "58": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "BOSS",
                             "KEY"
                        ]
                   }
              ]
         },
         "59": {
              "items": [
                   "KEY"
              ],
              "nodes": [
                   "right"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "KEY",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "60": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "KEY"
                        ]
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "KEY"
                        ]
                   }
              ]
         },
         "61": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   }
              ]
         },
         "62": {
              "items": [],
              "nodes": [
                   "left",
                   "up"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   }
              ]
         }
    },
    "7": {
         "0": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "1": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "2": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "3": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "4": {
              "items": [],
              "nodes": [
                   "left"
              ],
              "connections": []
         },
         "5": {
              "items": [],
              "nodes": [
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "6": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "7": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "8": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "9": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "10": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "11": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "12": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "13": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": [
                             "GLOVE"
                        ]
                   },
                   {
                        "from": "down",
                        "to": "left",
                        "requirements": [
                             "GLOVE",
                             "UPSTAB",
                             "JUMP"
                        ]
                   }
              ]
         },
         "14": {
              "items": [],
              "nodes": [
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "16": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "17": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "18": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "19": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "20": {
              "items": [],
              "nodes": [
                   "up",
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "21": {
              "items": [],
              "nodes": [
                   "right",
                   "down"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "22": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "23": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "24": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "25": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "26": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "27": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "29": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "30": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "31": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "33": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "34": {
              "items": [],
              "nodes": [
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "35": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "36": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "37": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "38": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "39": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "40": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "41": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "42": {
              "items": [],
              "nodes": [
                   "left",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "43": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": [
                             "GLOVE"
                        ]
                   }
              ]
         },
         "44": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "FAIRY"
                        ]
                   }
              ]
         },
         "45": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": [
                             "GLOVE",
                             "DOWNSTAB"
                        ]
                   }
              ]
         },
         "46": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   }
              ]
         },
         "47": {
              "items": [],
              "nodes": [
                   "left"
              ],
              "connections": []
         },
         "48": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "49": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "left",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "50": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "51": {
              "items": [],
              "nodes": [
                   "left"
              ],
              "connections": []
         },
         "52": {
              "items": [],
              "nodes": [
                   "right",
                   "up"
              ],
              "connections": [
                   {
                        "from": "up",
                        "to": "right",
                        "requirements": []
                   }
              ]
         },
         "53": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": [
                             "BOSS",
                             "KEY"
                        ]
                   }
              ]
         },
         "54": {
              "items": [],
              "nodes": [
                   "left"
              ],
              "connections": []
         },
         "55": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "56": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "57": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "58": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "59": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "60": {
              "items": [],
              "nodes": [
                   "left",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "61": {
              "items": [],
              "nodes": [
                   "left",
                   "right",
                   "up",
                   "down"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   },
                   {
                        "from": "up",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "left",
                        "to": "down",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "up",
                        "requirements": []
                   },
                   {
                        "from": "right",
                        "to": "down",
                        "requirements": []
                   }
              ]
         },
         "62": {
              "items": [],
              "nodes": [
                   "left",
                   "right"
              ],
              "connections": [
                   {
                        "from": "left",
                        "to": "right",
                        "requirements": []
                   }
              ]
         }
    }
}