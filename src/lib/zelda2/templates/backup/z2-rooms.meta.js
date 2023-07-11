export default {
    "5:0": {
        "type": "ENTRANCE",
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
        "items": [],
        "exits": [
            "LEFT"
        ],
        "connections": []
    },
    "7:5": {
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
        "items": [],
        "exits": [
            "LEFT"
        ],
        "connections": []
    },
    "7:48": {
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
        "items": [],
        "exits": [
            "LEFT"
        ],
        "connections": []
    },
    "7:52": {
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
        "items": [],
        "exits": [
            "LEFT"
        ],
        "connections": []
    },
    "7:55": {
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
