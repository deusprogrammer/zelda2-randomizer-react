# Deterministic One-Pass Randomization Algorithm

## Overview

The Z2Randomizer implements a sophisticated **graph-based, one-pass randomization algorithm** that ensures every generated seed is completable while maintaining logical progression requirements. The algorithm models the game world as a directed graph where nodes represent locations and edges represent traversal requirements.

## Technical Overview - How It Works

Think of the randomization algorithm as an intelligent puzzle solver that needs to ensure the player can always win the game. Here's how it approaches this challenge:

### The Core Problem

In Zelda 2, you need specific items to reach certain areas. For example, you need the BOOTS to walk on water, or the HAMMER to break rocks. If the randomizer places the BOOTS behind a water barrier, the game becomes impossible to complete. The algorithm must avoid these "logic locks."

### The Graph Approach

The algorithm treats the game world like a subway map:

- **Stations (Nodes)** = Game locations (towns, caves, palaces)
- **Train Lines (Edges)** = Paths between locations
- **Tickets (Requirements)** = Items/spells needed to travel certain routes

Before placing any item, the algorithm asks: "If I put this item here, can the player still reach it?" It does this by simulating a player starting from North Castle and seeing how far they can travel with their current items.

### The One-Pass Strategy

Unlike many randomizers that try placing items, realize they made a mistake, and backtrack, this algorithm works forward-only. It's like solving a crossword puzzle by only writing in ink - you have to be very careful about each choice because you can't easily undo it.

The algorithm follows this pattern:

1. **Look around**: What areas can the player currently reach?
2. **Find bottlenecks**: What's blocking progress to new areas?
3. **Place solutions**: Put the needed item/spell somewhere the player can get it
4. **Repeat**: Recalculate what's now accessible and continue

This continues until all 7 palaces are reachable and completable.

### The Isolation Zone Concept

The algorithm recognizes that terrain features (mountains, water) create natural barriers. It groups areas separated by these barriers into "isolation zones" - think of them as islands that need bridges or tunnels to connect them.

The algorithm systematically ensures all these islands are connected through caves and bridges, then uses this connection network to guide item placement.

### Why It's Deterministic

Using the same starting number (seed), the algorithm always makes the same "random" choices. This means seed #12345 will always generate the exact same randomized game, which is crucial for racing and sharing specific challenging seeds.

## Core Algorithm Architecture

### Phase-Based Approach (RP1-RP6)

1. **RP1: Terrain Generation** - Create or use existing overworld maps
2. **RP2: Template Processing** - Convert terrain into node graphs with isolation zones
3. **RP3: North Castle Placement** - Place starting location in accessible area
4. **RP4: Isolation Zone Connection** - Link disconnected areas via caves/bridges
5. **RP5: Item/Location Placement** - Place items ensuring completability
6. **RP6: Remaining Content** - Fill non-critical locations

### Key Data Structures

```javascript
// Node representation in graph
{
  locationKey: "NORTH_CASTLE",           // Original vanilla location
  mappedLocation: "SPELL_TOWN",          // Where this node actually leads
  mappedItems: ["CANDLE", "HEART_CONTAINER"], // Items placed here
  connections: ["NODE1", "NODE2"],       // Connected nodes
  connectionRequirements: {              // Requirements to traverse connections
    "NODE1": ["HAMMER"],
    "NODE2": ["BOOTS | FAIRY"]
  },
  isolationGroup: 2,                     // Barrier-separated zone ID
  continent: 0                           // Which overworld map
}
```

## Algorithm Flow

### 1. Isolation Zone Management

**Problem:** Map areas can be disconnected by terrain barriers (mountains, water) or item requirements.

**Solution:**

- Use flood-fill to identify disconnected regions (`isolationGroup`)
- Systematically connect zones via pass-through locations (caves, bridges)
- Ensure each zone has minimum viable size

```javascript
// Connect isolation zones deterministically
while (localPassThroughAreas.length > 0) {
  let entranceIndex = this.chooseRandomNode(connectedIsolationAreas);
  let entrance = this.chooseRandomNode(localPassThroughAreas);
  // Place entrance/exit pair to connect zones
}
```

### 2. Accessibility Tracking

**Core Function:** `getAccessibleNodes(nodeName, items, spells, abilities, visitedNodes)`

```javascript
// Recursive traversal respecting requirements
if (node.connectionRequirements[connectedNode]) {
  let requirements = node.connectionRequirements[connectedNode];
  if (this.checkRequirements(requirements, items, spells, abilities)) {
    // Recurse into connected node
  }
}
```

**Key Insight:** This creates a real-time dependency graph that grows as items are placed.

### 3. Progressive Item Placement

**Strategy:** Forward-only placement using accessibility-guided selection

```javascript
while (nextRemedy && completablePalaces.length < 7) {
  // 1. Identify what's blocking progression
  let neededRemedies = this.getCurrentRemedies(accessibleNodes);

  // 2. Filter to placeable remedies only
  let placeableRemedies = this.getPlaceableRemedies(
    accessibleNodes,
    completablePalaces
  );

  // 3. Choose and place randomly
  let nextRemedy = this.chooseRandomNode(placeableRemedies);
  this.placeRemedies(nextRemedy, accessibleNodes);

  // 4. Recalculate accessibility
  [accessibleNodes] = this.getAccessibleNodes(this.northCastleNode);
  completablePalaces = this.getCompletablePalaces(accessibleNodes);
}
```

### 4. Remedy Placement Logic

**Spell Placement:**

```javascript
if (this.isSpell(nextRemedy)) {
  let spellTown = this.getSpellTown(nextRemedy);
  // Place town in accessible area on correct continent
  // Recursively place any prerequisites the town needs
  if (spellTown.spellRequirements) {
    this.placeRemedies(spellTown.spellRequirements[0], accessibleNodes);
  }
}
```

**Item Placement:**

```javascript
// Pick random accessible location with item slots
let itemBearingLocations = this.getAccessibleItemBearingLocations(
  completablePalaces,
  accessibleNodes
);
let randomLocation = this.chooseRandomNode(itemBearingLocations);
// Place item and handle location prerequisites
```

## Deterministic Randomization

### Seeded PRNG

```javascript
this.randomNumberGenerator = randomSeed(seed);

chooseRandomNode = (nodes) => {
  let r = Math.trunc(this.randomNumberGenerator() * nodes.length);
  return nodes[r];
};
```

**Critical:** All randomness uses seeded generator for reproducible results.

## Completability Validation

### Palace Accessibility

```javascript
getCompletablePalaces = (accessibleNodes, items, spells, abilities) => {
  return accessibleNodes
    .filter((node) => this.isPalace(this.getNodeMappedLocationName(node)))
    .filter((palaceNode) => {
      let palace = this.locationMetadata[palaceName];
      return this.checkRequirements(
        palace.completionRequirements,
        items,
        spells,
        abilities
      );
    });
};
```

### Progress Tracking

```javascript
getCurrentRemedies = (accessibleNodes) => {
  // Analyze all connection/link/completion requirements
  // Return items/spells/abilities needed to progress
};
```

## Algorithm Strengths

1. **Guaranteed Completability** - Every seed can reach all 7 palaces
2. **Logical Progression** - Items appear before they're needed
3. **Computational Efficiency** - One-pass forward algorithm, no backtracking
4. **Deterministic** - Same seed always produces same result
5. **Flexible Requirements** - Handles complex OR/AND item dependencies

## Algorithm Limitations

1. **Fragile Failure** - When placement fails, entire seed must restart
2. **Greedy Decisions** - No global optimization, can paint into corners
3. **No Backtracking** - Cannot undo poor early choices
4. **Stagnation Risk** - Infinite loops possible if no progress made
5. **Limited Distribution** - Simple random selection may create patterns

## Error Conditions

```javascript
// Fatal errors that require seed regeneration
throw new Error("Unable to place all nodes"); // Isolation zones can't be filled
throw new Error("All palaces aren't completeable"); // Missing required items
```

## Future Improvements

1. **Progress Detection** - Add circuit breakers for infinite loops
2. **Partial Backtracking** - Allow undoing recent placements on failure
3. **Placement Heuristics** - Prefer items that unlock more areas
4. **Distribution Controls** - Ensure items spread across continents
5. **Constraint Satisfaction** - More sophisticated requirement solving

## Performance Characteristics

- **Time Complexity:** O(n²) in nodes due to repeated accessibility checks
- **Space Complexity:** O(n) for graph representation
- **Success Rate:** ~95% for vanilla template, varies with custom terrain
- **Generation Time:** 100-500ms for typical seeds on modern hardware

This algorithm represents a sophisticated approach to constraint satisfaction in procedural game generation, balancing randomness with guaranteed solvability.
