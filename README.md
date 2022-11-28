# Zelda 2 Randomizer React

## Notes

### Templates

Show predefined node layouts with positions and no set connections and randomization attributes.  Connections are set randomly.

### Location Meta

Shows location data like map number, map set, number of item slots, spell slots, and hard connections known as "links" (i.e. like between caves, bridges, Life Town N and S...)

### Data Structures

#### Location Meta Examples

##### Cave with links

    {
        "id": "JUMP_CAVE_N",
        "type": "CAVE",
        "continent": 0,
        "mapSet": 0,
        "mapNumber": 9,
        "passThrough": false,
        "items": [],
        "spells": [],
        "linkRequirements": {
            "JUMP_CAVE_S" : "FAIRY | JUMP"
        },
        "links": [
            "JUMP_CAVE_S"
        ]
    }

##### Towns

    {
        "id": "FAIRY_TOWN",
        "type": "TOWN",
        "continent": 0,
        "mapSet": 1,
        "mapNumber": 11,
        "passThrough": false,
        "items": [],
        "ability": "DOWNSTAB",
        "spellRequirements": ["MEDICINE"],
        "abilityRequirements": ["JUMP"]
    }

    {
        "id": "SPELL_TOWN",
        "type": "TOWN",
        "continent": 2,
        "mapSet": 2,
        "mapNumber": 18,
        "passThrough": false,
        "items": [
            "BIG_ITEM",
            "BIG_ITEM"
        ],
        "spellRequirements": [],
        "itemRequirements": [
            "SPELL",
            "MAGIC7"
        ],
        "revealRequirements": [
            "HAMMER"
        ]
    }

##### Palaces

    {
        "id": "P2",
        "type": "PALACE",
        "continent": 0,
        "mapSet": 3,
        "mapNumber": 14,
        "passThrough": false,
        "items": [
            "BIG_ITEM"
        ],
        "completionRequirements": [
            "HANDY_GLOVE"
        ]
    }

    {
        "id": "GP",
        "type": "PALACE",
        "continent": 2,
        "mapSet": 5,
        "mapNumber": 0,
        "passThrough": false,
        "items": [
            "BIG_ITEM"
        ],
        "spells": [],
        "entryRequirements": [
            "CRYSTALS"
        ],
        "completionRequirements": [
            "THUNDER",
            "DOWNSTAB",
            "HANDY_GLOVE"
        ]
    }