export default {
     "NORTH_CASTLE": {
          "requirements": [],
          "connections": [
               "MAGIC_CAVE",
               "TROPHY_CAVE",
               "PARAPA_CAVE_S",
               "JUMP_CAVE_N",
               "SHIELD_TOWN",
               "JUMP_TOWN",
               "FOREST_50P",
               "SHIELD_TOWN_BOULDER_1"
          ],
          "linkedTo": []
     },
     "MAGIC_CAVE": {
          "requirements": [],
          "items": [
               "MAGIC"
          ],
          "connections": [
               "NORTH_CASTLE"
          ],
          "linkedTo": []
     },
     "TROPHY_CAVE": {
          "requirements": [],
          "connections": [
               "NORTH_CASTLE"
          ],
          "linkedTo": []
     },
     "PARAPA_CAVE_S": {
          "requirements": [],
          "connections": [
               "PARAPA_CAVE_N",
               "NORTH_CASTLE"
          ],
          "linkedTo": [
               "PARAPA_CAVE_N"
          ]
     },
     "PARAPA_CAVE_N": {
          "connections": [
               "P1",
               "BUBBLE_CLIFF_1",
               "PARAPA_CAVE_S"
          ],
          "linkedTo": [
               "PARAPA_CAVE_S"
          ]
     },
     "HEART_CLIFF": {
          "items": [
               "HEART"
          ],
          "connections": [
               "BUBBLE_CLIFF_2"
          ],
          "linkedTo": []
     },
     "JUMP_CAVE_N": {
          "requirements": [
               "JUMP_FAIRY"
          ],
          "connections": [
               "JUMP_CAVE_S",
               "NORTH_CASTLE"
          ],
          "linkedTo": [
               "JUMP_CAVE_S"
          ]
     },
     "SHIELD_TOWN": {
          "requirements": [],
          "spells": [
               "SHIELD"
          ],
          "connections": [
               "SHIELD_TOWN_BOULDER_1",
               "NORTH_CASTLE"
          ],
          "linkedTo": []
     },
     "JUMP_TOWN": {
          "requirements": [
               "TROPHY"
          ],
          "spells": [
               "JUMP"
          ],
          "connections": [
               "NORTH_CASTLE"
          ],
          "linkedTo": []
     },
     "FOREST_50P": {
          "requirements": [],
          "items": "50p",
          "connections": [
               "NORTH_CASTLE"
          ],
          "linkedTo": []
     },
     "FOREST_100P": {
          "items": "100p",
          "connections": [
               "LIFE_TOWN_BRIDGE_NS_2"
          ],
          "linkedTo": []
     },
     "JUMP_CAVE_S": {
          "connections": [
               "MEDICINE_CAVE_FAIRY",
               "MEDICINE_CAVE",
               "EX_LIFE_SWAMP_1",
               "BAGUS_CABIN",
               "LOST_WOODS_1",
               "LOST_WOODS_2",
               "LOST_WOODS_3",
               "LOST_WOODS_4",
               "LOST_WOODS_5",
               "HEART_CAVE",
               "CAVE_200P",
               "P2",
               "P2_RED_JAR",
               "RED_JAR_SWAMP",
               "FAIRY_TOWN_BOULDER_1",
               "LIFE_TOWN_BRIDGE_NS_1",
               "LIFE_TOWN_BRIDGE_EW_1",
               "LIFE_TOWN_FAIRY",
               "SHIELD_TOWN_BOULDER_2",
               "JUMP_CAVE_N"
          ],
          "linkedTo": [
               "JUMP_CAVE_N"
          ]
     },
     "MEDICINE_CAVE_FAIRY": {
          "items": [
               "FAIRY"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "BAGUS_CABIN": {
          "items": [
               "BAGU"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "EX_LIFE_SWAMP_1": {
          "items": [
               "1UP"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "MEDICINE_CAVE": {
          "requirements": [
               "HAMMER"
          ],
          "items": [
               "MEDICINE"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "HEART_CAVE": {
          "requirments": [
               "HAMMER"
          ],
          "items": [
               "HEART"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "CAVE_200P": {
          "items": [
               "200P"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "P2_RED_JAR": {
          "items": [
               "RED_JAR"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "RED_JAR_SWAMP": {
          "items": [
               "RED_JAR"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "EX_LIFE_BEACH": {
          "items": [
               "1UP"
          ],
          "connections": [
               "FAIRY_TOWN_BOULDER_2"
          ],
          "linkedTo": []
     },
     "RED_JAR_CEM": {
          "items": [
               "RED_JAR"
          ],
          "connections": [
               "FAIRY_TOWN_BOULDER_2"
          ],
          "linkedTo": []
     },
     "RAFT_DOCK_W": {
          "requirements": [
               "RAFT"
          ],
          "connections": [
               "RAFT_DOCK_E",
               "FAIRY_TOWN_BOULDER_2"
          ],
          "linkedTo": [
               "RAFT_DOCK_E"
          ]
     },
     "FAIRY_TOWN": {
          "requirements": [
               "JUMP",
               "MEDICINE"
          ],
          "spells": [
               "DOWNSTAB",
               "FAIRY"
          ],
          "connections": [
               "FAIRY_TOWN_BOULDER_2"
          ],
          "linkedTo": []
     },
     "FAIRY_CAVE_HOLE": {
          "requirements": [
               "FAIRY"
          ],
          "connections": [
               "FAIRY_CAVE",
               "FAIRY_TOWN_BOULDER_2"
          ],
          "linkedTo": []
     },
     "FAIRY_CAVE": {
          "connections": [
               "P3",
               "FAIRY_CAVE_HOLE"
          ],
          "linkedTo": []
     },
     "LIFE_TOWN_N": {
          "requirements": [
               "BAGU_SAUCE"
          ],
          "connections": [
               "LIFE_TOWN_S",
               "LIFE_TOWN_BRIDGE_NS_2"
          ],
          "linkedTo": [
               "LIFE_TOWN_S"
          ]
     },
     "LIFE_TOWN_S": {
          "connections": [
               "DM_ENTRANCE",
               "LIFE_TOWN_N"
          ],
          "linkedTo": [
               "LIFE_TOWN_N"
          ]
     },
     "P1": {
          "connections": [
               "PARAPA_CAVE_N"
          ],
          "linkedTo": []
     },
     "P2": {
          "requirements": [
               "HANDY_GLOVE"
          ],
          "items": [
               "HANDY_GLOVE"
          ],
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "P3": {
          "requirements": [
               "HANDY_GLOVE",
               "DOWN_STAB"
          ],
          "connections": [
               "FAIRY_CAVE"
          ],
          "linkedTo": []
     },
     "KINGS_TOMB": {
          "connections": [
               "FAIRY_TOWN_BOULDER_2"
          ],
          "linkedTo": []
     },
     "DM_EXIT": {
          "connections": [
               "CAVE_K",
               "DM_BRIDGE_EXIT_W_2"
          ],
          "linkedTo": []
     },
     "DM_ENTRANCE": {
          "connections": [
               "CAVE_A",
               "LIFE_TOWN_S"
          ],
          "linkedTo": []
     },
     "LIFE_TOWN_FAIRY": {
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "LOST_WOODS_1": {
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "LOST_WOODS_2": {
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "LOST_WOODS_3": {
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "LOST_WOODS_4": {
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "LOST_WOODS_5": {
          "connections": [
               "JUMP_CAVE_S"
          ],
          "linkedTo": []
     },
     "RAFT_DOCK_E": {
          "connections": [
               "FIRE_TOWN_FOREST_500P_BAG",
               "FIRE_TOWN_FAIRY",
               "FIRE_TOWN",
               "FIRE_TOWN_CAVE_500P_BAG",
               "FIRE_TOWN_CAVE_EXIT",
               "FIRE_TOWN_RED_JAR",
               "P5_HEART",
               "P5_500P_BAG",
               "P5",
               "RIVER_DEMON_1",
               "RAFT_DOCK_W"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "RAFT_DOCK_W"
          ]
     },
     "FIRE_TOWN_CAVE_EXIT": {
          "connections": [
               "FIRE_TOWN_CAVE_ENTRANCE",
               "RAFT_DOCK_E"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "FIRE_TOWN_CAVE_ENTRANCE"
          ]
     },
     "FIRE_TOWN_CAVE_ENTRANCE": {
          "connections": [
               "DAZZLE_LIFE",
               "REFLECT_TOWN_CLIFF_2_1",
               "MAZE_ISLAND_BRIDGE_1",
               "FIRE_TOWN_CAVE_EXIT"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "FIRE_TOWN_CAVE_EXIT"
          ]
     },
     "P6_HEART": {
          "items": [
               "HEART"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "WILSON_FENCE_3_2"
          ],
          "linkedTo": []
     },
     "P6_500P_BAG": {
          "items": [
               "500P"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "WILSON_FENCE_3_2"
          ],
          "linkedTo": []
     },
     "SPELL_TOWN_CAVE_ENTRANCE": {
          "connections": [
               "SPELL_TOWN_CAVE_EXIT",
               "WILSON_FENCE_3_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "SPELL_TOWN_CAVE_EXIT"
          ]
     },
     "SPELL_TOWN_CAVE_EXIT": {
          "connections": [
               "SPELL_TOWN",
               "SPELL_TOWN_CAVE_ENTRANCE"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "SPELL_TOWN_CAVE_ENTRANCE"
          ]
     },
     "SPELL_TOWN": {
          "requirements": [
               "HAMMER"
          ],
          "items": [
               "MAGIC_KEY",
               "MAGIC"
          ],
          "spells": [
               "SPELL"
          ],
          "x": 61,
          "y": 81,
          "area": 1,
          "map": 2,
          "connections": [
               "SPELL_TOWN_CAVE_EXIT"
          ],
          "linkedTo": []
     },
     "THUNDER_TOWN": {
          "requirements": [
               "MAGIC8"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "THUNDER_TOWN_E_BRIDGE_2"
          ],
          "linkedTo": []
     },
     "DEATH_VALLEY_CAVE_2_ENTRANCE": {
          "connections": [
               "DEATH_VALLEY_CAVE_2_EXIT",
               "DEATH_VALLEY_BATTLE_2_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_CAVE_2_EXIT"
          ]
     },
     "DEATH_VALLEY_CAVE_2_EXIT": {
          "connections": [
               "DEATH_VALLEY_BATTLE_3_1",
               "DEATH_VALLEY_CAVE_2_ENTRANCE"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_CAVE_2_ENTRANCE"
          ]
     },
     "DEATH_VALLEY_CAVE_1_EXIT": {
          "connections": [
               "DEATH_VALLEY_CAVE_1_ENTRANCE",
               "DEATH_VALLEY_BATTLE_3_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_CAVE_1_ENTRANCE"
          ]
     },
     "DEATH_VALLEY_CAVE_1_ENTRANCE": {
          "connections": [
               "GP",
               "DEATH_VALLEY_CAVE_1_EXIT"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_CAVE_1_EXIT"
          ]
     },
     "DEATH_VALLEY_RED_JAR": {
          "area": 1,
          "map": 2,
          "connections": [
               "WILSON_FENCE_4_2"
          ],
          "linkedTo": []
     },
     "DEATH_VALLEY_500P_BAG": {
          "items": [
               "500P"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "DEATH_VALLEY_BATTLE_1_2"
          ],
          "linkedTo": []
     },
     "REFLECT_TOWN": {
          "spells": [
               "UPSTAB",
               "REFLECT"
          ],
          "requirements": [
               "FAIRY",
               "CHILD"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "REFLECT_TOWN_CLIFF_1_2"
          ],
          "linkedTo": []
     },
     "FIRE_TOWN_CAVE_500P_BAG": {
          "items": [
               "500P"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "RAFT_DOCK_E"
          ],
          "linkedTo": []
     },
     "FIRE_TOWN_RED_JAR": {
          "items": [
               "RED_JAR"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "RAFT_DOCK_E"
          ],
          "linkedTo": []
     },
     "FIRE_TOWN_FOREST_500P_BAG": {
          "items": [
               "RED_JAR"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "RAFT_DOCK_E"
          ],
          "linkedTo": []
     },
     "FIRE_TOWN_FAIRY": {
          "items": [
               "FAIRY"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "RAFT_DOCK_E"
          ],
          "linkedTo": []
     },
     "P5_HEART": {
          "items": [
               "RED_JAR"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "RAFT_DOCK_E"
          ],
          "linkedTo": []
     },
     "P5_500P_BAG": {
          "items": [
               "500P"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "RAFT_DOCK_E"
          ],
          "linkedTo": []
     },
     "P5": {
          "requirements": [
               "BOOTS"
          ],
          "items": [
               "RECORDER"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "RAFT_DOCK_E"
          ],
          "linkedTo": []
     },
     "P6": {
          "requirements": [
               "FAIRY"
          ],
          "items": [
               "CROSS"
          ],
          "x": 45,
          "y": 102,
          "area": 1,
          "map": 2,
          "connections": [
               "WILSON_FENCE_3_2",
               "THUNDER_TOWN_N_BRIDGE_2"
          ],
          "linkedTo": []
     },
     "DAZZLE_LIFE": {
          "items": [
               "1UP"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "FIRE_TOWN_CAVE_ENTRANCE"
          ],
          "linkedTo": []
     },
     "CAVE_A": {
          "connections": [
               "CAVE_B_E",
               "CAVE_C_E",
               "DM_ENTRANCE"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": []
     },
     "CAVE_B_E": {
          "connections": [
               "CAVE_B_W",
               "CAVE_A"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_B_W"
          ]
     },
     "CAVE_B_W": {
          "connections": [
               "CAVE_D_E",
               "CAVE_B_E"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_B_E"
          ]
     },
     "CAVE_D_E": {
          "connections": [
               "CAVE_D_W",
               "CAVE_B_W"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_D_W"
          ]
     },
     "CAVE_D_W": {
          "connections": [
               "CAVE_F_W",
               "ELEVATOR_CAVE_G_E_TL",
               "CAVE_D_E"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_D_E"
          ]
     },
     "CAVE_F_W": {
          "connections": [
               "CAVE_F_E",
               "CAVE_D_W"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_F_E"
          ]
     },
     "CAVE_F_E": {
          "connections": [
               "CAVE_I_S",
               "CAVE_F_W"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_F_W"
          ]
     },
     "CAVE_I_S": {
          "connections": [
               "CAVE_I_N",
               "CAVE_F_E"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_I_N"
          ]
     },
     "CAVE_I_N": {
          "connections": [
               "CAVE_M_W",
               "ELEVATOR_CAVE_G_E_BL",
               "ELEVATOR_CAVE_H_E_TL",
               "CAVE_I_S"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_I_S"
          ]
     },
     "CAVE_M_W": {
          "connections": [
               "CAVE_M_E",
               "CAVE_I_N"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_M_E"
          ]
     },
     "CAVE_M_E": {
          "subArea": 1,
          "map": 1,
          "connections": [
               "CAVE_M_W"
          ],
          "linkedTo": [
               "CAVE_M_W"
          ]
     },
     "ELEVATOR_CAVE_G_E_BL": {
          "connections": [
               "ELEVATOR_CAVE_G_W_BR",
               "ELEVATOR_CAVE_G_W_TR",
               "ELEVATOR_CAVE_G_E_TL",
               "CAVE_I_N"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "ELEVATOR_CAVE_G_W_BR",
               "ELEVATOR_CAVE_G_W_TR",
               "ELEVATOR_CAVE_G_E_TL"
          ]
     },
     "ELEVATOR_CAVE_H_E_TL": {
          "connections": [
               "ELEVATOR_CAVE_H_W_TR",
               "ELEVATOR_CAVE_H_N_BR",
               "ELEVATOR_CAVE_H_D_BL",
               "CAVE_I_N"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "ELEVATOR_CAVE_H_W_TR",
               "ELEVATOR_CAVE_H_N_BR",
               "ELEVATOR_CAVE_H_D_BL"
          ]
     },
     "ELEVATOR_CAVE_G_W_BR": {
          "subArea": 1,
          "map": 1,
          "connections": [
               "ELEVATOR_CAVE_G_E_BL"
          ],
          "linkedTo": [
               "ELEVATOR_CAVE_G_E_BL"
          ]
     },
     "ELEVATOR_CAVE_G_W_TR": {
          "connections": [
               "CAVE_J_E",
               "ELEVATOR_CAVE_G_W_TR",
               "ELEVATOR_CAVE_G_E_BL"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "ELEVATOR_CAVE_G_W_TR",
               "ELEVATOR_CAVE_G_E_BL"
          ]
     },
     "CAVE_C_E": {
          "connections": [
               "CAVE_C_W",
               "CAVE_A"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_C_W"
          ]
     },
     "CAVE_C_W": {
          "connections": [
               "CAVE_E_N",
               "CAVE_C_E"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_C_E"
          ]
     },
     "CAVE_E_N": {
          "connections": [
               "CAVE_E_S",
               "CAVE_C_W"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_E_S"
          ]
     },
     "CAVE_E_S": {
          "connections": [
               "ELEVATOR_CAVE_H_D_BL",
               "CAVE_E_N"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_E_N"
          ]
     },
     "ELEVATOR_CAVE_H_D_BL": {
          "connections": [
               "ELEVATOR_CAVE_H_N_BR",
               "ELEVATOR_CAVE_H_W_TR",
               "ELEVATOR_CAVE_H_E_TL",
               "CAVE_E_S"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "ELEVATOR_CAVE_H_N_BR",
               "ELEVATOR_CAVE_H_W_TR",
               "ELEVATOR_CAVE_H_E_TL"
          ]
     },
     "ELEVATOR_CAVE_H_N_BR": {
          "connections": [
               "CAVE_J_W",
               "CAVE_L_S",
               "ELEVATOR_CAVE_H_E_TL",
               "ELEVATOR_CAVE_H_D_BL"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "ELEVATOR_CAVE_H_E_TL",
               "ELEVATOR_CAVE_H_D_BL"
          ]
     },
     "CAVE_J_W": {
          "connections": [
               "CAVE_J_E",
               "ELEVATOR_CAVE_H_N_BR"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_J_E"
          ]
     },
     "CAVE_J_E": {
          "connections": [
               "CAVE_J_W",
               "ELEVATOR_CAVE_G_W_TR"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_J_W"
          ]
     },
     "CAVE_L_S": {
          "connections": [
               "CAVE_L_N",
               "ELEVATOR_CAVE_H_N_BR"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_L_N"
          ]
     },
     "CAVE_L_N": {
          "connections": [
               "CAVE_O_S",
               "CAVE_L_S"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_L_S"
          ]
     },
     "CAVE_O_S": {
          "connections": [
               "CAVE_O_N",
               "CAVE_L_N"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_O_N"
          ]
     },
     "CAVE_O_N": {
          "connections": [
               "CAVE_P_W",
               "CAVE_O_S"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_O_S"
          ]
     },
     "CAVE_P_W": {
          "connections": [
               "CAVE_P_E",
               "CAVE_O_N"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_P_E"
          ]
     },
     "CAVE_P_E": {
          "connections": [
               "CAVE_Q_E",
               "CAVE_P_W"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_P_W"
          ]
     },
     "CAVE_Q_E": {
          "connections": [
               "CAVE_Q_W",
               "CAVE_P_E"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_Q_W"
          ]
     },
     "CAVE_Q_W": {
          "connections": [
               "CAVE_R_N",
               "CAVE_Q_E"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_Q_E"
          ]
     },
     "CAVE_R_N": {
          "connections": [
               "CAVE_R_S",
               "CAVE_Q_W"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_R_S"
          ]
     },
     "CAVE_R_S": {
          "connections": [
               "CAVE_N_S",
               "HAMMER_CAVE",
               "DM_MAGIC",
               "CAVE_R_N"
          ],
          "subArea": 1,
          "map": 1,
          "linkedTo": [
               "CAVE_R_N"
          ]
     },
     "HAMMER_CAVE": {
          "items": [
               "HAMMER"
          ],
          "subArea": 1,
          "map": 1,
          "connections": [
               "CAVE_R_S"
          ],
          "linkedTo": []
     },
     "DM_MAGIC": {
          "requirements": [
               "HAMMER"
          ],
          "subArea": 1,
          "map": 1,
          "connections": [
               "CAVE_R_S"
          ],
          "linkedTo": []
     },
     "CAVE_K": {
          "subArea": 1,
          "map": 1,
          "connections": [
               "DM_EXIT",
               "CAVE_N_N"
          ],
          "linkedTo": []
     },
     "MAZE_ISLAND_MAGIC": {
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_3_1",
               "MAZE_ISLAND_FORCED_BATTLE_4_1",
               "EAST_HYRULE_BRIDGE_2"
          ],
          "area": 2,
          "map": 3,
          "linkedTo": []
     },
     "P4": {
          "items": [
               "BOOTS"
          ],
          "requirements": [
               "REFLECT"
          ],
          "area": 2,
          "map": 3,
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_4_2"
          ],
          "linkedTo": []
     },
     "MAZE_ISLAND_CHILD": {
          "items": [
               "CHILD"
          ],
          "area": 2,
          "map": 3,
          "connections": [
               "EAST_HYRULE_BRIDGE_2"
          ],
          "linkedTo": []
     },
     "GP": {
          "requirements": [
               "7CRYSTALS"
          ],
          "area": 1,
          "map": 2,
          "connections": [
               "DEATH_VALLEY_CAVE_1_ENTRANCE"
          ],
          "linkedTo": []
     },
     "FIRE_TOWN": {
          "area": 1,
          "map": 2,
          "connections": [
               "RAFT_DOCK_E"
          ],
          "linkedTo": []
     },
     "THUNDER_TOWN_SWAMP_LIFE": {
          "area": 1,
          "map": 2,
          "connections": [
               "WILSON_FENCE_3_2"
          ],
          "linkedTo": []
     },
     "THUNDER_TOWN_CAVE_500P_BAG": {
          "area": 1,
          "map": 2,
          "connections": [
               "WILSON_FENCE_3_2"
          ],
          "linkedTo": []
     },
     "ELEVATOR_CAVE_G_E_TL": {
          "subArea": 1,
          "map": 1,
          "connections": [
               "CAVE_D_W",
               "ELEVATOR_CAVE_G_E_BL"
          ],
          "linkedTo": [
               "ELEVATOR_CAVE_G_E_BL"
          ]
     },
     "ELEVATOR_CAVE_H_W_TR": {
          "subArea": 1,
          "map": 1,
          "connections": [
               "ELEVATOR_CAVE_H_E_TL",
               "ELEVATOR_CAVE_H_D_BL"
          ],
          "linkedTo": [
               "ELEVATOR_CAVE_H_E_TL",
               "ELEVATOR_CAVE_H_D_BL"
          ]
     },
     "CAVE_N_S": {
          "subArea": 1,
          "map": 1,
          "connections": [
               "CAVE_N_N",
               "CAVE_R_S"
          ],
          "linkedTo": [
               "CAVE_N_N"
          ]
     },
     "CAVE_N_N": {
          "subArea": 1,
          "map": 1,
          "connections": [
               "CAVE_K",
               "CAVE_N_S"
          ],
          "linkedTo": [
               "CAVE_N_S"
          ]
     },
     "BUBBLE_CLIFF_1": {
          "connections": [
               "BUBBLE_CLIFF_2",
               "PARAPA_CAVE_N"
          ],
          "linkedTo": [
               "BUBBLE_CLIFF_2"
          ]
     },
     "BUBBLE_CLIFF_2": {
          "connections": [
               "HEART_CLIFF",
               "BUBBLE_CLIFF_1"
          ],
          "linkedTo": [
               "BUBBLE_CLIFF_1"
          ]
     },
     "FAIRY_TOWN_BOULDER_1": {
          "connections": [
               "FAIRY_TOWN_BOULDER_2",
               "JUMP_CAVE_S"
          ],
          "x": 46,
          "y": 77,
          "linkedTo": [
               "FAIRY_TOWN_BOULDER_2"
          ]
     },
     "FAIRY_TOWN_BOULDER_2": {
          "connections": [
               "FAIRY_TOWN",
               "RAFT_DOCK_W",
               "KINGS_TOMB",
               "RED_JAR_CEM",
               "FAIRY_CAVE_HOLE",
               "EX_LIFE_BEACH",
               "DM_BRIDGE_EXIT_E_1",
               "FAIRY_TOWN_BOULDER_1"
          ],
          "x": 46,
          "y": 77,
          "linkedTo": [
               "FAIRY_TOWN_BOULDER_1"
          ]
     },
     "LIFE_TOWN_BRIDGE_NS_1": {
          "spells": [
               "LIFE"
          ],
          "connections": [
               "LIFE_TOWN_BRIDGE_NS_2",
               "JUMP_CAVE_S"
          ],
          "linkedTo": [
               "LIFE_TOWN_BRIDGE_NS_2"
          ]
     },
     "LIFE_TOWN_BRIDGE_NS_2": {
          "spells": [
               "LIFE"
          ],
          "connections": [
               "LIFE_TOWN_N",
               "LIFE_TOWN_BRIDGE_EW_1",
               "FOREST_100P",
               "LIFE_TOWN_BRIDGE_NS_1"
          ],
          "linkedTo": [
               "LIFE_TOWN_BRIDGE_NS_1"
          ]
     },
     "DM_BRIDGE_EXIT_E_1": {
          "connections": [
               "DM_BRIDGE_EXIT_E_2",
               "FAIRY_TOWN_BOULDER_2"
          ],
          "linkedTo": [
               "DM_BRIDGE_EXIT_E_2"
          ]
     },
     "DM_BRIDGE_EXIT_E_2": {
          "connections": [
               "DM_BRIDGE_EXIT_W_1",
               "DM_BRIDGE_EXIT_E_1"
          ],
          "linkedTo": [
               "DM_BRIDGE_EXIT_E_1"
          ]
     },
     "DM_BRIDGE_EXIT_W_1": {
          "connections": [
               "DM_BRIDGE_EXIT_W_2",
               "DM_BRIDGE_EXIT_E_2"
          ],
          "linkedTo": [
               "DM_BRIDGE_EXIT_W_2"
          ]
     },
     "DM_BRIDGE_EXIT_W_2": {
          "connections": [
               "DM_EXIT",
               "DM_BRIDGE_EXIT_W_1"
          ],
          "linkedTo": [
               "DM_BRIDGE_EXIT_W_1"
          ]
     },
     "SHIELD_TOWN_BOULDER_1": {
          "connections": [
               "SHIELD_TOWN_BOULDER_2",
               "NORTH_CASTLE",
               "SHIELD_TOWN",
               "JUMP_CAVE_S"
          ],
          "x": 47,
          "y": 57,
          "linkedTo": [
               "SHIELD_TOWN_BOULDER_2"
          ]
     },
     "SHIELD_TOWN_BOULDER_2": {
          "connections": [
               "SHIELD_TOWN_BOULDER_1"
          ],
          "x": 47,
          "y": 57,
          "linkedTo": [
               "SHIELD_TOWN_BOULDER_1"
          ]
     },
     "LIFE_TOWN_BRIDGE_EW_1": {
          "linkedTo": [
               "LIFE_TOWN_BRIDGE_EW_2"
          ],
          "connections": [
               "LIFE_TOWN_BRIDGE_EW_2",
               "JUMP_CAVE_S",
               "LIFE_TOWN_BRIDGE_NS_2"
          ]
     },
     "LIFE_TOWN_BRIDGE_EW_2": {
          "linkedTo": [
               "LIFE_TOWN_BRIDGE_EW_1"
          ],
          "connections": [
               "LIFE_TOWN_BRIDGE_EW_1"
          ]
     },
     "RIVER_DEMON_1": {
          "connections": [
               "RIVER_DEMON_2",
               "RAFT_DOCK_E"
          ],
          "requirements": [
               "RECORDER"
          ],
          "x": 19,
          "y": 74,
          "area": 1,
          "map": 2,
          "linkedTo": [
               "RIVER_DEMON_2"
          ]
     },
     "RIVER_DEMON_2": {
          "connections": [
               "WILSON_FENCE_1_1",
               "RIVER_DEMON_1"
          ],
          "requirements": [
               "RECORDER"
          ],
          "x": 19,
          "y": 74,
          "area": 1,
          "map": 2,
          "linkedTo": [
               "RIVER_DEMON_1"
          ]
     },
     "WILSON_FENCE_1_1": {
          "connections": [
               "WILSON_FENCE_1_2",
               "RIVER_DEMON_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "WILSON_FENCE_1_2"
          ]
     },
     "WILSON_FENCE_1_2": {
          "connections": [
               "WILSON_FENCE_2_1",
               "WILSON_FENCE_1_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "WILSON_FENCE_1_1"
          ]
     },
     "WILSON_FENCE_2_1": {
          "connections": [
               "WILSON_FENCE_2_2",
               "WILSON_FENCE_1_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "WILSON_FENCE_2_2"
          ]
     },
     "WILSON_FENCE_2_2": {
          "connections": [
               "WILSON_FENCE_3_1",
               "WILSON_FENCE_2_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "WILSON_FENCE_2_1"
          ]
     },
     "WILSON_FENCE_3_1": {
          "connections": [
               "WILSON_FENCE_3_2",
               "WILSON_FENCE_2_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "WILSON_FENCE_3_2"
          ]
     },
     "WILSON_FENCE_3_2": {
          "connections": [
               "WILSON_FENCE_4_1",
               "THUNDER_TOWN_SWAMP_LIFE",
               "THUNDER_TOWN_CAVE_500P_BAG",
               "THUNDER_TOWN_N_BRIDGE_1",
               "THUNDER_TOWN_E_BRIDGE_1",
               "SPELL_TOWN_CAVE_ENTRANCE",
               "P6_500P_BAG",
               "P6_HEART",
               "P6",
               "WILSON_FENCE_3_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "WILSON_FENCE_3_1"
          ]
     },
     "THUNDER_TOWN_N_BRIDGE_1": {
          "connections": [
               "THUNDER_TOWN_N_BRIDGE_2",
               "WILSON_FENCE_3_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "THUNDER_TOWN_N_BRIDGE_2"
          ]
     },
     "THUNDER_TOWN_N_BRIDGE_2": {
          "connections": [
               "P6",
               "THUNDER_TOWN_N_BRIDGE_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "THUNDER_TOWN_N_BRIDGE_1"
          ]
     },
     "THUNDER_TOWN_E_BRIDGE_1": {
          "connections": [
               "THUNDER_TOWN_E_BRIDGE_2",
               "WILSON_FENCE_3_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "THUNDER_TOWN_E_BRIDGE_2"
          ]
     },
     "THUNDER_TOWN_E_BRIDGE_2": {
          "connections": [
               "THUNDER_TOWN",
               "THUNDER_TOWN_E_BRIDGE_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "THUNDER_TOWN_E_BRIDGE_1"
          ]
     },
     "WILSON_FENCE_4_1": {
          "connections": [
               "WILSON_FENCE_4_2",
               "WILSON_FENCE_3_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "WILSON_FENCE_4_2"
          ]
     },
     "WILSON_FENCE_4_2": {
          "connections": [
               "DEATH_VALLEY_RED_JAR",
               "DEATH_VALLEY_BATTLE_1_1",
               "WILSON_FENCE_4_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "WILSON_FENCE_4_1"
          ]
     },
     "DEATH_VALLEY_BATTLE_1_1": {
          "connections": [
               "DEATH_VALLEY_BATTLE_1_2",
               "WILSON_FENCE_4_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_BATTLE_1_2"
          ]
     },
     "DEATH_VALLEY_BATTLE_1_2": {
          "connections": [
               "DEATH_VALLEY_500P_BAG",
               "DEATH_VALLEY_BATTLE_2_1",
               "DEATH_VALLEY_BATTLE_1_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_BATTLE_1_1"
          ]
     },
     "DEATH_VALLEY_BATTLE_2_1": {
          "connections": [
               "DEATH_VALLEY_BATTLE_2_2",
               "DEATH_VALLEY_BATTLE_1_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_BATTLE_2_2"
          ]
     },
     "DEATH_VALLEY_BATTLE_2_2": {
          "connections": [
               "DEATH_VALLEY_CAVE_2_ENTRANCE",
               "DEATH_VALLEY_BATTLE_2_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_BATTLE_2_1"
          ]
     },
     "DEATH_VALLEY_BATTLE_3_1": {
          "connections": [
               "DEATH_VALLEY_BATTLE_3_2",
               "DEATH_VALLEY_CAVE_2_EXIT"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_BATTLE_3_2"
          ]
     },
     "DEATH_VALLEY_BATTLE_3_2": {
          "connections": [
               "DEATH_VALLEY_CAVE_1_EXIT",
               "DEATH_VALLEY_BATTLE_3_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "DEATH_VALLEY_BATTLE_3_1"
          ]
     },
     "REFLECT_TOWN_CLIFF_2_1": {
          "connections": [
               "REFLECT_TOWN_CLIFF_2_2",
               "FIRE_TOWN_CAVE_ENTRANCE"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "REFLECT_TOWN_CLIFF_2_2"
          ]
     },
     "REFLECT_TOWN_CLIFF_2_2": {
          "connections": [
               "REFLECT_TOWN_CLIFF_1_1",
               "REFLECT_TOWN_CLIFF_2_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "REFLECT_TOWN_CLIFF_2_1"
          ]
     },
     "REFLECT_TOWN_CLIFF_1_1": {
          "connections": [
               "REFLECT_TOWN_CLIFF_1_2",
               "REFLECT_TOWN_CLIFF_2_2"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "REFLECT_TOWN_CLIFF_1_2"
          ]
     },
     "REFLECT_TOWN_CLIFF_1_2": {
          "connections": [
               "REFLECT_TOWN",
               "REFLECT_TOWN_CLIFF_1_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "REFLECT_TOWN_CLIFF_1_1"
          ]
     },
     "MAZE_ISLAND_BRIDGE_1": {
          "connections": [
               "MAZE_ISLAND_BRIDGE_2",
               "FIRE_TOWN_CAVE_ENTRANCE"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "MAZE_ISLAND_BRIDGE_2"
          ]
     },
     "MAZE_ISLAND_BRIDGE_2": {
          "connections": [
               "EAST_HYRULE_BRIDGE_1",
               "MAZE_ISLAND_BRIDGE_1"
          ],
          "area": 1,
          "map": 2,
          "linkedTo": [
               "MAZE_ISLAND_BRIDGE_1"
          ]
     },
     "EAST_HYRULE_BRIDGE_1": {
          "connections": [
               "EAST_HYRULE_BRIDGE_2",
               "MAZE_ISLAND_BRIDGE_2"
          ],
          "area": 2,
          "map": 3,
          "linkedTo": [
               "EAST_HYRULE_BRIDGE_2"
          ]
     },
     "EAST_HYRULE_BRIDGE_2": {
          "connections": [
               "MAZE_ISLAND_CHILD",
               "MAZE_ISLAND_MAGIC",
               "MAZE_ISLAND_FORCED_BATTLE_1_1",
               "MAZE_ISLAND_FORCED_BATTLE_2_1",
               "MAZE_ISLAND_FORCED_BATTLE_3_1",
               "EAST_HYRULE_BRIDGE_1"
          ],
          "area": 2,
          "map": 3,
          "linkedTo": [
               "EAST_HYRULE_BRIDGE_1"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_1_1": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_1_2"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_1_2",
               "EAST_HYRULE_BRIDGE_2"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_1_2": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_1_1"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_1_1"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_2_1": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_2_2"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_2_2",
               "EAST_HYRULE_BRIDGE_2"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_2_2": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_2_1"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_2_1"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_3_1": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_3_2"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_3_2",
               "MAZE_ISLAND_MAGIC",
               "EAST_HYRULE_BRIDGE_2"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_3_2": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_3_1"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_3_1"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_4_1": {
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_4_2",
               "MAZE_ISLAND_MAGIC"
          ],
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_4_2"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_4_2": {
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_5_1",
               "MAZE_ISLAND_FORCED_BATTLE_6_1",
               "MAZE_ISLAND_FORCED_BATTLE_7_1",
               "P4",
               "MAZE_ISLAND_FORCED_BATTLE_4_1"
          ],
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_4_1"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_5_1": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_5_2"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_5_2",
               "MAZE_ISLAND_FORCED_BATTLE_4_2"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_5_2": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_5_1"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_5_1"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_6_1": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_6_2"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_6_2",
               "MAZE_ISLAND_FORCED_BATTLE_4_2"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_6_2": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_6_1"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_6_1"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_7_1": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_7_2"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_7_2",
               "MAZE_ISLAND_FORCED_BATTLE_4_2"
          ]
     },
     "MAZE_ISLAND_FORCED_BATTLE_7_2": {
          "area": 2,
          "map": 3,
          "linkedTo": [
               "MAZE_ISLAND_FORCED_BATTLE_7_1"
          ],
          "connections": [
               "MAZE_ISLAND_FORCED_BATTLE_7_1"
          ]
     }
}
