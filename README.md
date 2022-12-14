# Zelda 2 Randomizer React

## What is Zelda 2 Randomizer React

This app is an attempt at a web based randomizer with a different approach to ROM generation.  This isn't an effor to replace the amazing work of Digshake, but a learning experience for me as a developer and hopefully a source of inspiration and data for improving the existing randomizer.

## Current State

Starting work on the randomization portion.  ROM interrogation is almost complete with the exception of enemy data.  The design for the data structure for creation of randomized overworld maps and playability testing is complete.

[Check it out!](https://z2r-react.web.app/)

It's a work in progress.  Be kind.  I'm also willing to collaborate if anyone is interested.

## Notes

### Templates

Show predefined node layouts with positions and no set connections and randomization attributes.  Connections are set randomly.

### Graph

Randomization and testing playability is performed through the use of a graph.  Nodes are randomly placed, and then connections are randomly placed.  Then items are placed randomly, but in such a way that the seed is completeable.  The graph is then used to generate the map.

![Graph Image](https://github.com/deusprogrammer/zelda2-randomizer-react/raw/main/Vanilla_Graph.png)

### Location Meta

Shows location data like map number, map set, number of item slots, spell slots, and hard connections known as "links" (i.e. like between caves, bridges, Life Town N and S...)

### Data Structures

#### Location Meta Examples
    
[Location Metadata File](https://github.com/deusprogrammer/zelda2-randomizer-react/blob/main/src/lib/zelda2/templates/z2-location.v2.meta.js)
    
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

#### ROM Generation

A randomized ROM will be generated by combining a [template](https://github.com/deusprogrammer/zelda2-randomizer-react/blob/main/src/lib/zelda2/templates/z2-vanilla.v2.template.js) together with location meta data and processing by the randomizer.  This produces a [graph](https://github.com/deusprogrammer/zelda2-randomizer-react/blob/main/src/lib/zelda2/templates/z2-vanilla.v2.graph.js) that is then used to write the data back to the vanilla ROM.

![ROM Generation Diagram](https://github.com/deusprogrammer/zelda2-randomizer-react/raw/main/ROM_Generation.png)

### ROM Hacking Notes

If these are helpful to anyone, I have my [notes](https://github.com/deusprogrammer/zelda2-randomizer-react/blob/main/NOTES.md) in this repo.
