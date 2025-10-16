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

- State:

```
N/A
```

- Notes:

```
connectableAreas is empty. I assume this means that the generated map doesn't have anymore room to connect isolation zones?
```

- Fix:

```
If there is one disconnected area and one connected area, connect them (new if block condition)
```

## ~~3353461179~~

- Overworld: Randomized
- Biome: Islands
- Monsters: Randomized
- Error:

```
Error: Unable to place all nodes
    at Z2Randomizer.placeItemsAndNodes (Z2Randomizer.js:2008:1)
    at Z2Randomizer.randomizeLocationsAndItems (Z2Randomizer.js:2183:1)
    at Home.jsx:90:1
```

- State:

```
**********************************************************************************************************************
Z2Randomizer.js:2074 FINAL REPORT
Z2Randomizer.js:2075 	ITEMS:                RAFT,CHILD,HANDY_GLOVE,TROPHY
Z2Randomizer.js:2076 	SPELLS:               REFLECT,JUMP
Z2Randomizer.js:2077 	ABILITIES:            DOWNSTAB
Z2Randomizer.js:2078 	COMPLETABLE PALACES:  P1,P2,P3,P4,P5
Z2Randomizer.js:2079 	NEEDED REMEDIES:
Z2Randomizer.js:2080 	ACCESSIBLE LOCATIONS (98%):
Z2Randomizer.js:2085 		Node             Node Location                    Mapped Location                  Mapped Items
Z2Randomizer.js:2093 		NODE6            HEART_CLIFF                      NORTH_CASTLE                     []
Z2Randomizer.js:2093 		NODE28           LIFE_TOWN_N                                                       []
Z2Randomizer.js:2093 		NODE44           LOST_WOODS_5                     DM_EXIT                          []
Z2Randomizer.js:2093 		NODE100          CAVE_E_S                         CAVE_K                           []
Z2Randomizer.js:2093 		NODE101          ELEVATOR_CAVE_H_S_BL             CAVE_R_S                         []
Z2Randomizer.js:2093 		NODE96           ELEVATOR_CAVE_G_W_TR             CAVE_R_N                         []
Z2Randomizer.js:2093 		NODE104          CAVE_J_E                         CAVE_N_N                         []
Z2Randomizer.js:2093 		NODE113          CAVE_R_N                         CAVE_N_S                         []
Z2Randomizer.js:2093 		NODE112          CAVE_Q_W                         ELEVATOR_CAVE_H_S_BL             []
Z2Randomizer.js:2093 		NODE114          CAVE_R_S                         ELEVATOR_CAVE_H_N_BR             []
Z2Randomizer.js:2093 		NODE135          CAVE_N_S                         CAVE_F_W                         []
Z2Randomizer.js:2093 		NODE86           CAVE_D_W                         CAVE_F_E                         []
Z2Randomizer.js:2093 		NODE87           CAVE_F_W                         CAVE_I_S                         []
Z2Randomizer.js:2093 		NODE98           CAVE_C_W                         CAVE_I_N                         []
Z2Randomizer.js:2093 		NODE99           CAVE_E_N                         CAVE_M_E                         []
Z2Randomizer.js:2093 		NODE83           CAVE_B_E                         CAVE_M_W                         []
Z2Randomizer.js:2093 		NODE82           CAVE_A                           CAVE_O_N                         []
Z2Randomizer.js:2093 		NODE97           CAVE_C_E                         CAVE_J_W                         []
Z2Randomizer.js:2093 		NODE89           CAVE_I_S                         CAVE_J_E                         []
Z2Randomizer.js:2093 		NODE88           CAVE_F_E                         CAVE_B_E                         []
Z2Randomizer.js:2093 		NODE109          CAVE_P_W                         CAVE_B_W                         []
Z2Randomizer.js:2093 		NODE108          CAVE_O_N                         ELEVATOR_CAVE_G_W_BR             []
Z2Randomizer.js:2093 		NODE116          DM_MAGIC                         ELEVATOR_CAVE_G_E_BL             []
Z2Randomizer.js:2093 		NODE91           CAVE_M_W                         ELEVATOR_CAVE_G_W_TR             []
Z2Randomizer.js:2093 		NODE90           CAVE_I_N                         ELEVATOR_CAVE_G_E_TL             []
Z2Randomizer.js:2093 		NODE93           ELEVATOR_CAVE_G_E_BL             CAVE_E_S                         []
Z2Randomizer.js:2093 		NODE136          CAVE_N_N                         CAVE_E_N                         []
Z2Randomizer.js:2093 		NODE117          CAVE_K                           ELEVATOR_CAVE_H_E_TL             []
Z2Randomizer.js:2093 		NODE85           CAVE_D_E                         ELEVATOR_CAVE_H_W_TR             []
Z2Randomizer.js:2093 		NODE84           CAVE_B_W                         CAVE_D_E                         []
Z2Randomizer.js:2093 		NODE106          CAVE_L_N                         CAVE_D_W                         []
Z2Randomizer.js:2093 		NODE107          CAVE_O_S                         CAVE_P_E                         []
Z2Randomizer.js:2093 		NODE111          CAVE_Q_E                         CAVE_P_W                         []
Z2Randomizer.js:2093 		NODE110          CAVE_P_E                         CAVE_L_N                         []
Z2Randomizer.js:2093 		NODE103          CAVE_J_W                         CAVE_L_S                         []
Z2Randomizer.js:2093 		NODE102          ELEVATOR_CAVE_H_N_BR             CAVE_A                           []
Z2Randomizer.js:2093 		NODE105          CAVE_L_S                                                          []
Z2Randomizer.js:2093 		NODE1            MAGIC_CAVE                       DM_ENTRANCE                      []
Z2Randomizer.js:2093 		NODE94           ELEVATOR_CAVE_H_E_TL             CAVE_C_E                         []
Z2Randomizer.js:2093 		NODE95           ELEVATOR_CAVE_G_W_BR             CAVE_C_W                         []
Z2Randomizer.js:2093 		NODE92           CAVE_M_E                         CAVE_O_S                         []
Z2Randomizer.js:2093 		NODE133          ELEVATOR_CAVE_G_E_TL             CAVE_Q_E                         []
Z2Randomizer.js:2093 		NODE134          ELEVATOR_CAVE_H_W_TR             CAVE_Q_W                         []
Z2Randomizer.js:2093 		NODE115          HAMMER_CAVE                                                       []
Z2Randomizer.js:2093 		NODE33           P2                                                                []
Z2Randomizer.js:2093 		NODE34           P3                                                                []
Z2Randomizer.js:2093 		NODE4            PARAPA_CAVE_N                                                     []
Z2Randomizer.js:2093 		NODE27           LIFE_TOWN_BRIDGE_NS              JUMP_CAVE_S                      []
Z2Randomizer.js:2093 		NODE31           DM_BRIDGE_EXIT_W                 JUMP_CAVE_N                      []
Z2Randomizer.js:2093 		NODE43           LOST_WOODS_4                     DM_BRIDGE_EXIT_W                 []
Z2Randomizer.js:2093 		NODE42           LOST_WOODS_3                     PARAPA_CAVE_N                    []
Z2Randomizer.js:2093 		NODE37           DM_ENTRANCE                      PARAPA_CAVE_S                    []
Z2Randomizer.js:2093 		NODE21           EX_LIFE_BEACH                    FAIRY_CAVE                       []
Z2Randomizer.js:2093 		NODE11           FOREST_100P                      FAIRY_CAVE_HOLE                  []
Z2Randomizer.js:2093 		NODE13           MEDICINE_CAVE_FAIRY              DM_BRIDGE_EXIT_E                 []
Z2Randomizer.js:2093 		NODE8            SHIELD_TOWN                                                       []
Z2Randomizer.js:2093 		NODE10           FOREST_50P                                                        []
Z2Randomizer.js:2093 		NODE2            TROPHY_CAVE                                                       []
Z2Randomizer.js:2093 		NODE24           FAIRY_TOWN                                                        []
Z2Randomizer.js:2093 		NODE7            JUMP_CAVE_N                      P3                               []
Z2Randomizer.js:2093 		NODE18           CAVE_200P                                                         []
Z2Randomizer.js:2093 		NODE23           RAFT_DOCK_W                      JUMP_TOWN                        []
Z2Randomizer.js:2093 		NODE5            BUBBLE_CLIFF                                                      []
Z2Randomizer.js:2093 		NODE19           P2_RED_JAR                                                        []
Z2Randomizer.js:2093 		NODE25           FAIRY_CAVE_HOLE                  EX_LIFE_BEACH                    [HANDY_GLOVE]
Z2Randomizer.js:2093 		NODE17           HEART_CAVE                                                        []
Z2Randomizer.js:2093 		NODE16           MEDICINE_CAVE                    P1                               []
Z2Randomizer.js:2093 		NODE20           RED_JAR_SWAMP                                                     []
Z2Randomizer.js:2093 		NODE41           LOST_WOODS_2                                                      []
Z2Randomizer.js:2093 		NODE12           JUMP_CAVE_S                      RAFT_DOCK_W                      []
Z2Randomizer.js:2093 		NODE47           FIRE_TOWN_CAVE_ENTRANCE          RAFT_DOCK_E                      []
Z2Randomizer.js:2093 		NODE72           MAZE_ISLAND_BRIDGE                                                []
Z2Randomizer.js:2093 		NODE62           DEATH_VALLEY_CAVE_2_ENTRANCE                                      []
Z2Randomizer.js:2093 		NODE59           WILSON_FENCE_4                   MAZE_ISLAND_BRIDGE               []
Z2Randomizer.js:2093 		NODE119          MAZE_ISLAND_MAGIC                EAST_HYRULE_BRIDGE               []
Z2Randomizer.js:2093 		NODE122          MAZE_ISLAND_FORCED_BATTLE_3                                       []
Z2Randomizer.js:2093 		NODE118          EAST_HYRULE_BRIDGE                                                []
Z2Randomizer.js:2093 		NODE128          MAZE_ISLAND_CHILD                                                 []
Z2Randomizer.js:2093 		NODE120          MAZE_ISLAND_FORCED_BATTLE_1                                       []
Z2Randomizer.js:2093 		NODE121          MAZE_ISLAND_FORCED_BATTLE_2                                       []
Z2Randomizer.js:2093 		NODE123          MAZE_ISLAND_FORCED_BATTLE_4                                       []
Z2Randomizer.js:2093 		NODE124          MAZE_ISLAND_FORCED_BATTLE_5      P4                               []
Z2Randomizer.js:2093 		NODE125          MAZE_ISLAND_FORCED_BATTLE_6                                       []
Z2Randomizer.js:2093 		NODE126          MAZE_ISLAND_FORCED_BATTLE_7                                       []
Z2Randomizer.js:2093 		NODE127          P4                                                                []
Z2Randomizer.js:2093 		NODE48           WILSON_FENCE_1                                                    []
Z2Randomizer.js:2093 		NODE68           DEATH_VALLEY_500P_BAG                                             []
Z2Randomizer.js:2093 		NODE58           THUNDER_TOWN                                                      []
Z2Randomizer.js:2093 		NODE70           REFLECT_TOWN_CLIFF_1                                              []
Z2Randomizer.js:2093 		NODE78           P5_500P_BAG                                                       []
Z2Randomizer.js:2093 		NODE56           THUNDER_TOWN_N_BRIDGE                                             []
Z2Randomizer.js:2093 		NODE73           FIRE_TOWN_CAVE_500P_BAG                                           []
Z2Randomizer.js:2093 		NODE57           THUNDER_TOWN_E_BRIDGE                                             []
Z2Randomizer.js:2093 		NODE74           FIRE_TOWN_RED_JAR                                                 []
Z2Randomizer.js:2093 		NODE55           SPELL_TOWN                                                        []
Z2Randomizer.js:2093 		NODE75           FIRE_TOWN_FOREST_500P_BAG                                         []
Z2Randomizer.js:2093 		NODE53           SPELL_TOWN_CAVE_ENTRANCE         FIRE_TOWN_CAVE_500P_BAG          [TROPHY]
Z2Randomizer.js:2093 		NODE131          THUNDER_TOWN_SWAMP_LIFE                                           []
Z2Randomizer.js:2093 		NODE61           DEATH_VALLEY_BATTLE_2            FIRE_TOWN_CAVE_ENTRANCE          []
Z2Randomizer.js:2093 		NODE51           P6_HEART                         FIRE_TOWN_CAVE_EXIT              []
Z2Randomizer.js:2093 		NODE49           WILSON_FENCE_2                   GP                               []
Z2Randomizer.js:2093 		NODE54           SPELL_TOWN_CAVE_EXIT             SPELL_TOWN_CAVE_ENTRANCE         []
Z2Randomizer.js:2093 		NODE79           P5                               SPELL_TOWN_CAVE_EXIT             []
Z2Randomizer.js:2093 		NODE132          THUNDER_TOWN_CAVE_500P_BAG                                        []
Z2Randomizer.js:2093 		NODE46           FIRE_TOWN_CAVE_EXIT                                               []
Z2Randomizer.js:2093 		NODE65           DEATH_VALLEY_CAVE_1_EXIT                                          []
Z2Randomizer.js:2093 		NODE50           WILSON_FENCE_3                   P5                               []
Z2Randomizer.js:2093 		NODE130          FIRE_TOWN                        DEATH_VALLEY_CAVE_1_ENTRANCE     []
Z2Randomizer.js:2093 		NODE63           DEATH_VALLEY_CAVE_2_EXIT         DEATH_VALLEY_CAVE_1_EXIT         []
Z2Randomizer.js:2093 		NODE129          GP                                                                []
Z2Randomizer.js:2093 		NODE77           P5_HEART                         THUNDER_TOWN_SWAMP_LIFE          [CHILD]
Z2Randomizer.js:2093 		NODE81           DAZZLE_LIFE                                                       []
Z2Randomizer.js:2093 		NODE80           P6                               REFLECT_TOWN                     []
Z2Randomizer.js:2093 		NODE45           RAFT_DOCK_E                                                       []
Z2Randomizer.js:2093 		NODE52           P6_500P_BAG                                                       []
Z2Randomizer.js:2093 		NODE60           DEATH_VALLEY_BATTLE_1                                             []
Z2Randomizer.js:2093 		NODE66           DEATH_VALLEY_CAVE_1_ENTRANCE     P6                               []
Z2Randomizer.js:2093 		NODE64           DEATH_VALLEY_BATTLE_3            DEATH_VALLEY_CAVE_2_ENTRANCE     []
Z2Randomizer.js:2093 		NODE76           FIRE_TOWN_FAIRY                  DEATH_VALLEY_CAVE_2_EXIT         []
Z2Randomizer.js:2093 		NODE71           REFLECT_TOWN                                                      []
Z2Randomizer.js:2093 		NODE40           LOST_WOODS_1                                                      []
Z2Randomizer.js:2093 		NODE36           DM_EXIT                                                           []
Z2Randomizer.js:2093 		NODE0            NORTH_CASTLE                                                      []
Z2Randomizer.js:2093 		NODE39           LIFE_TOWN_FAIRY                                                   []
Z2Randomizer.js:2093 		NODE15           EX_LIFE_SWAMP_1                  FAIRY_TOWN                       []
Z2Randomizer.js:2093 		NODE29           LIFE_TOWN_S                                                       []
Z2Randomizer.js:2093 		NODE3            PARAPA_CAVE_S                                                     []
Z2Randomizer.js:2093 		NODE38           LIFE_TOWN_BRIDGE_EW              EX_LIFE_SWAMP_1                  [RAFT]
Z2Randomizer.js:2093 		NODE26           FAIRY_CAVE                                                        []
Z2Randomizer.js:2093 		NODE30           DM_BRIDGE_EXIT_E                                                  []
Z2Randomizer.js:2093 		NODE9            JUMP_TOWN                        LIFE_TOWN_S                      []
Z2Randomizer.js:2093 		NODE14           BAGUS_CABIN                      LIFE_TOWN_N                      []
Z2Randomizer.js:2093 		NODE35           KINGS_TOMB                                                        []
Z2Randomizer.js:2093 		NODE32           P1                               P2                               []
Z2Randomizer.js:2093 		NODE22           RED_JAR_CEM                                                       []
Z2Randomizer.js:2113 	UNACCESSIBLE LOCATIONS:
Z2Randomizer.js:2114 		Node             Node Location                    Mapped Location
Z2Randomizer.js:2124 		NODE67           DEATH_VALLEY_RED_JAR                                              []
Z2Randomizer.js:2124 		NODE69           REFLECT_TOWN_CLIFF_2                                              []
```

- Notes:

```
Seems as if these nodes should be accessible.  Their calculated connections only show them as connected to each other.  Probably a template generation problem.

There are only two isolation zones.

The smaller zone has only two nodes.

Claude added connections for the bridges, despite them not being necessary.
```

- Fix:

```
Claude misunderstood what connections were so I had to properly implement it in the end.
```

## ~~188940664~~

- Overworld: Randomized
- Biome: Islands
- Monsters: Randomized
- Error:

```
Z2Randomizer.js:2027 Can't place anymore items:  TypeError: Cannot read properties of undefined (reading 'id')
    at Z2Randomizer.js:1516:1
    at Array.find (<anonymous>)
    at Z2Randomizer.placeRemedies (Z2Randomizer.js:1516:1)
    at Z2Randomizer.js:2025:1
    at Array.forEach (<anonymous>)
    at Z2Randomizer.placeItemsAndNodes (Z2Randomizer.js:2023:1)
    at Z2Randomizer.randomizeLocationsAndItems (Z2Randomizer.js:2201:1)
    at Home.jsx:90:1

Home.jsx:125 Error: All palaces aren't completeable
    at Z2Randomizer.placeItemsAndNodes (Z2Randomizer.js:2039:1)
    at Z2Randomizer.randomizeLocationsAndItems (Z2Randomizer.js:2186:1)
    at Home.jsx:90:1
```

- State:

```

```

- Notes:

```
The randomizer stops attempting to place items because of the error happening at line 1516

At line 1488 we should filter our choices further to find a continent with unused item bearing nodes.
```

- Fix:

```
Filtered possible placements further to check that the placement area is in a continent that still has item bearings in it.
```
