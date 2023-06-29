export default {
    "5:0": {
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
    "5:1": {
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
    "5:2": {
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
    "5:3": {
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
    "5:4": {
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
    "5:5": {
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
    "5:6": {
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
    "5:7": {
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
    "5:8": {
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
    "5:9": {
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
    "5:10": {
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
    "5:11": {
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
    "5:12": {
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
    "5:13": {
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
    "5:14": {
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
    "5:15": {
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
    "5:16": {
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
    "5:17": {
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
    "5:18": {
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
    "5:19": {
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
    "5:20": {
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
    "5:21": {
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
    "5:22": {
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
    "5:23": {
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
    "5:24": {
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
    "5:25": {
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
    "5:26": {
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
    "5:27": {
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
    "5:28": {
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
    "5:29": {
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
    "5:30": {
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
    "5:31": {
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
    "5:32": {
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
    "5:33": {
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
    "5:34": {
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
    "5:35": {
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
    "5:36": {
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
    "5:37": {
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
    "5:38": {
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
    "5:39": {
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
    "5:40": {
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
    "5:41": {
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
    "5:42": {
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
    "5:43": {
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
    "5:44": {
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
    "5:45": {
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
    "5:46": {
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
    "5:47": {
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
    "5:49": {
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
    "5:50": {
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
    "5:51": {
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
    "5:52": {
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
    "5:53": {
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
    "5:54": {
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
    "5:55": {
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
    "5:56": {
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
    "5:57": {
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
    "5:58": {
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
    "5:59": {
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
    "5:60": {
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
    "5:61": {
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
    "5:62": {
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
    "6:0": {
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
    "6:1": {
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
    "6:2": {
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
    "6:3": {
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
    "6:4": {
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
    "6:5": {
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
    "6:6": {
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
    "6:7": {
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
    "6:8": {
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
    "6:10": {
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
    "6:12": {
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
    "6:13": {
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
    "6:14": {
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
    "6:15": {
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
    "6:16": {
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
    "6:17": {
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
    "6:18": {
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
    "6:19": {
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
    "6:20": {
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
    "6:21": {
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
    "6:22": {
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
    "6:23": {
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
    "6:24": {
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
    "6:25": {
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
    "6:26": {
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
    "6:27": {
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
    "6:28": {
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
    "6:29": {
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
    "6:30": {
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
    "6:31": {
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
    "6:32": {
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
    "6:33": {
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
    "6:34": {
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
    "6:35": {
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
    "6:36": {
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
    "6:37": {
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
    "6:38": {
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
    "6:39": {
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
    "6:40": {
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
    "6:41": {
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
    "6:42": {
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
    "6:43": {
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
    "6:44": {
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
    "6:45": {
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
    "6:46": {
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
    "6:47": {
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
    "6:48": {
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
    "6:49": {
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
    "6:50": {
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
    "6:51": {
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
    "6:52": {
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
    "6:53": {
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
    "6:54": {
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
    "6:55": {
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
    "6:56": {
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
    "6:57": {
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
    "6:58": {
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
    "6:59": {
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
    "6:60": {
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
    "6:61": {
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
    "6:62": {
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
    },
    "7:0": {
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
    "7:1": {
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
    "7:2": {
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
    "7:3": {
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
    "7:4": {
        "items": [],
        "nodes": [
            "left"
        ],
        "connections": []
    },
    "7:5": {
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
    "7:6": {
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
    "7:7": {
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
    "7:8": {
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
    "7:9": {
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
    "7:10": {
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
    "7:11": {
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
    "7:12": {
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
    "7:13": {
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
    "7:14": {
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
    "7:16": {
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
    "7:17": {
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
    "7:18": {
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
    "7:19": {
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
    "7:20": {
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
    "7:21": {
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
    "7:22": {
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
    "7:23": {
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
    "7:24": {
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
    "7:25": {
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
    "7:26": {
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
    "7:27": {
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
    "7:29": {
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
    "7:30": {
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
    "7:31": {
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
    "7:33": {
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
    "7:34": {
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
    "7:35": {
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
    "7:36": {
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
    "7:37": {
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
    "7:38": {
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
    "7:39": {
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
    "7:40": {
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
    "7:41": {
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
    "7:42": {
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
    "7:43": {
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
    "7:44": {
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
    "7:45": {
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
    "7:46": {
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
    "7:47": {
        "items": [],
        "nodes": [
            "left"
        ],
        "connections": []
    },
    "7:48": {
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
    "7:49": {
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
    "7:50": {
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
    "7:51": {
        "items": [],
        "nodes": [
            "left"
        ],
        "connections": []
    },
    "7:52": {
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
    "7:53": {
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
    "7:54": {
        "items": [],
        "nodes": [
            "left"
        ],
        "connections": []
    },
    "7:55": {
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
    "7:56": {
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
    "7:57": {
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
    "7:58": {
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
    "7:59": {
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
    "7:60": {
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
    "7:61": {
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
    "7:62": {
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
