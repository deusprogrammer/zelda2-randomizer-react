# Zelda 2 Randomizer React - AI Coding Instructions

## Project Overview

This is a **web-based Zelda 2 ROM randomizer** that uses React and complex algorithms to generate randomized, beatable seeds. The core architecture revolves around **graph-based randomization** where game locations are nodes connected by traversal requirements.

## Key Architecture Components

### Core Randomization Pipeline

The randomization follows a specific 6-phase process (see `NOTES.md` RP1-RP6):

1. **Terrain Generation** (`TerrainGenerator.js`) - Creates random overworld maps or uses vanilla
2. **Template Processing** - Converts terrain into node graphs with isolation zones
3. **North Castle Placement** - Places starting location in accessible area
4. **Isolation Zone Connection** - Links disconnected map areas via cave/bridge systems
5. **Item/Location Placement** - Places items ensuring game remains completable
6. **Remaining Content** - Fills in non-critical locations

### Data Flow Architecture

```
ROM File → Z2Parser → romAtom (Jotai) → Randomizer → ROM.patchRom() → New ROM
```

**Critical Files:**

- `src/lib/rando/Z2Randomizer.js` - Main randomization logic (~1600 lines)
- `src/lib/rando/ROM.js` - ROM patching and memory management
- `src/lib/Z2Parser.js` - ROM data extraction
- `src/lib/zelda2/templates/` - Game data definitions (locations, items, maps)

### State Management (Jotai)

- `romAtom` - Stores parsed ROM data throughout app
- `palacesAtom` - Palace-specific state
- All components consume ROM data reactively via atoms

## Development Patterns

### Template/Metadata System

The game uses a **dual-structure approach**:

```javascript
// Template defines node positions and connections
z2VanillaTemplate = {
  NODE0: {
    locationKey: "NORTH_CASTLE",
    x: 23,
    y: 52,
    continent: 0,
    isolationGroup: 2,
  },
};

// Metadata defines game logic and requirements
z2LocationMeta = {
  NORTH_CASTLE: { type: "CASTLE", items: [], spellRequirements: [] },
};
```

**Pattern:** Templates handle spatial/connectivity data, metadata handles game logic requirements.

### Graph Traversal Algorithm

The randomizer uses **recursive accessibility checking**:

```javascript
getAccessibleNodes(nodeName, items, spells, abilities, visitedNodes);
```

**Key insight:** This ensures all placed items remain reachable given current player capabilities.

### Memory Address Management

ROM modifications use **bank-aware addressing**:

```javascript
toFileAddr(ramAddress, bank); // Converts NES RAM addresses to file offsets
```

**Critical:** All ROM writes must account for NES banking and memory mapping in `Z2MemoryMappings.js`.

## Component Architecture

### Route Structure

- `Home.jsx` - Main randomizer interface and ROM upload
- `Map.jsx` - Individual map/location viewer
- `TerrainGeneratorTest.jsx` - Terrain generation testing
- `CDLViewer.jsx`/`HexViewer.jsx` - ROM debugging tools

### Shared Components

- `MapDisplay.jsx` - Renders overworld maps from ROM data
- `KeyValueTable.jsx` - Editable data tables throughout app
- `Graph.jsx` - Visualizes location connectivity using Sigma.js

## Development Workflows

### Local Development

```bash
npm start                    # React dev server
npm run build               # Production build for Firebase
```

### ROM Testing

1. Load vanilla Zelda 2 ROM file via file input
2. Configure randomization options (overworld: vanilla/randomized, monsters: vanilla/randomized)
3. Generate seed and randomize
4. Download resulting ROM for emulator testing

### Debugging Tools

**Admin mode** (set `localStorage.mode = "ADMIN"`):

- CDL Viewer - Code-data logger analysis
- Hex Viewer - Raw ROM examination
- Map visualization with full spoiler data
- Text data viewer for in-game strings

## Critical Implementation Details

### Isolation Zones

**Concept:** Map areas disconnected by requirements (items/spells needed to traverse).

```javascript
isolationGroup: 2; // Template nodes grouped by traversal barriers
```

**Usage:** Randomizer ensures connections between zones have proper item placement.

### Deterministic Randomization

Uses **seeded PRNG** for reproducible randomization:

```javascript
randomSeed(seed); // Creates deterministic random number generator
```

**Critical:** All randomization must use this generator for seed consistency.

### ROM Patching Strategy

Direct memory modification approach:

```javascript
this.rom[offset] = newValue; // Direct byte manipulation
assembleCode(assembly); // 6502 assembly injection
```

**Important:** Changes require understanding of NES memory layout and 6502 assembly.

## Testing and Validation

### Playability Validation

The randomizer includes **completability checking**:

```javascript
getCompletablePalaces(accessibleNodes); // Ensures all 7 palaces reachable
getCurrentRemedies(accessibleNodes); // Identifies blocking requirements
```

**Key:** Generated seeds must always be completable - this is validated during generation.

### Error Handling

Randomization can fail due to impossible item placement:

```javascript
throw new Error("Unable to place all nodes");
throw new Error("All palaces aren't completeable");
```

**Pattern:** Failed generations should retry with different parameters or seed.

## External Dependencies

- **React + React Router** - SPA framework
- **Jotai** - State management for ROM data
- **Sigma.js + Graphology** - Graph visualization
- **Firebase Hosting** - Deployment platform
- **File-saver** - ROM download functionality

## Common Gotchas

1. **Memory Addressing** - NES banking requires `toFileAddr()` conversion
2. **Isolation Zones** - Empty zones break randomization - always validate zone sizes
3. **Item Requirements** - Circular dependencies in item placement will deadlock generation
4. **ROM Format** - Only works with specific Zelda 2 ROM versions
5. **Seed Determinism** - Must use provided PRNG, not Math.random()

## File Organization

- `src/lib/rando/` - Core randomization algorithms
- `src/lib/zelda2/` - Game-specific data and memory mappings
- `src/lib/memory/` - Low-level ROM manipulation utilities
- `src/components/` - Reusable React components
- `src/routes/` - Page-level components
- `src/atoms/` - Jotai state definitions
