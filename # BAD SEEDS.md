# BAD SEEDS

## ~~249615081~~

- Overworld: Randomized
- Biome: Islands
- Monsters: Randomized
- Error:

```
Home.jsx:125 TypeError: Cannot read properties of undefined (reading 'filter')
    at Z2Randomizer.js:1172:1
    at Array.forEach (<anonymous>)
    at Z2Randomizer.placeConnectionsPalacesAndExits (Z2Randomizer.js:1148:1)
    at Z2Randomizer.randomizeLocationsAndItems (Z2Randomizer.js:2152:1)
    at Home.jsx:90:1
```

- Notes: connectableAreas is empty. I assume this means that the generated map doesn't have anymore room to connect isolation zones?
- Fix: If there is one disconnected area and one connected area, connect them (new if block condition)
