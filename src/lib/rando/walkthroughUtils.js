/**
 * Utility function to generate a walkthrough story by simulating optimal graph traversal
 * 
 * @param {Object} params - Parameters object containing all required data and methods
 * @param {Object} params.graphData - The graph data structure
 * @param {Object} params.locationMetadata - Location metadata for spells, abilities, etc.
 * @param {Array} params.placedItems - Items that have been placed in the randomization
 * @param {Object} params.locationMapping - Mapping of locations
 * @param {Function} params.getLocationDisplayName - Function to get display name for a location
 * @param {Function} params.checkRequirements - Function to check if requirements are met
 * @param {Function} params.getAccessibleNodes - Function to get accessible nodes
 * @param {Function} params.isSpell - Function to check if item is a spell
 * @param {Function} params.isAbility - Function to check if item is an ability
 * @returns {Array} Array of walkthrough step strings
 */
export function generateWalkthroughStory({
    graphData,
    locationMetadata,
    placedItems,
    locationMapping,
    getLocationDisplayName,
    checkRequirements,
    getAccessibleNodes,
    isSpell,
    isAbility
}) {
    console.log("\n🗡️ === LINK'S ADVENTURE WALKTHROUGH ===");
    
    // Find the North Castle node by mappedLocation
    let startingNode = Object.keys(graphData).find(nodeId => {
        let node = graphData[nodeId];
        return node.mappedLocation === "NORTH_CASTLE";
    });
    
    if (!startingNode) {
        console.log("❌ Could not find North Castle starting location");
        return [];
    }
    
    let startingLocationName = getLocationDisplayName(startingNode);
    console.log(`📍 Link begins his journey at ${startingLocationName}...`);
    
    let currentItems = [...placedItems];
    let currentSpells = [];
    let currentAbilities = [];
    let visitedNodes = new Set([startingNode]);
    let blockedPaths = new Map(); // Track what's blocking each path
    let failedPalaces = new Map(); // Track palaces we couldn't complete and their requirements
    let failedLocations = new Map(); // Track locations with multiple reasons to revisit (spells, abilities, etc.)
    let storySteps = [];
    
    // Track container counts and crystals
    let containerCounts = {
        MAGIC: 4,      // Start with 4 magic containers
        HEART: 4,      // Start with 4 heart containers  
        CRYSTALS: 0    // Start with 0 crystals (palaces completed)
    };
    
    // Helper for adding emphasized acquisition logs
    const addAcquisitionStep = (type, name, location, context) => {
        let emoji = type === "spell" ? "✨" : (type === "ability" ? "💪" : "🎁");
        let typeLabel = type === "spell" ? "Spell" : (type === "ability" ? "Ability" : "Item");
        addStoryStep(`${emoji} **${typeLabel}**`, `**${name}**`, null, `acquired at ${location} ${context}`, true);
    };
    
    // Helper function to update container counts
    const updateContainerCount = (containerType) => {
        if (containerType === "MAGIC_CONTAINER" || containerType === "magic_container") {
            containerCounts.MAGIC++;
            console.log(`   🔮 Magic containers: ${containerCounts.MAGIC} total`);
            
            // Add MAGIC level items to inventory for requirements
            let magicLevel = `MAGIC${containerCounts.MAGIC}`;
            if (!currentItems.includes(magicLevel)) {
                currentItems.push(magicLevel);
            }
        } else if (containerType === "HEART_CONTAINER" || containerType === "heart_container") {
            containerCounts.HEART++;
            console.log(`   ❤️ Heart containers: ${containerCounts.HEART} total`);
        }
        // Note: Function is called for all items, but only acts on containers
    };
    
    // Helper function to update crystal count when palace is completed
    const updateCrystalCount = () => {
        containerCounts.CRYSTALS++;
        console.log(`   💎 Crystals: ${containerCounts.CRYSTALS}/6 (palaces completed)`);
        
        // Add CRYSTALS item to inventory when 6 palaces completed
        if (containerCounts.CRYSTALS >= 6 && !currentItems.includes("CRYSTALS")) {
            currentItems.push("CRYSTALS");
            console.log(`   ✨ CRYSTALS item acquired! (6 palaces completed)`);
        }
    };
    
    // Track story progression with mapped location names - only eventful moments
    const addStoryStep = (action, nodeId, item = null, details = "", isEventful = true) => {
        if (!isEventful) {
            // Less frequent logging for non-eventful moments - every 3rd step
            if (storySteps.length % 3 !== 0) {
                return;
            }
        }
        
        let nodeData = graphData[nodeId];
        let locationName = getLocationDisplayName(nodeId);
        
        let formattedStep = "";
        
        if (item) {
            formattedStep = `${action} ${locationName} and found ${item}`;
        } else {
            formattedStep = `${action} ${locationName}`;
        }
        
        if (details) {
            formattedStep += ` ${details}`;
        }
        
        storySteps.push(formattedStep);
        console.log(`Step ${storySteps.length}: ${formattedStep}`);
    };
    
    // Process a location for spells, abilities, and other content
    const processLocationForContent = (nodeId, locationMeta, currentItems, currentSpells, currentAbilities, addStoryStep, updateContainerCount, failedLocations = null, containerCounts = null, addAcquisitionStep = null) => {
        let locationName = getLocationDisplayName(nodeId);
        let hasFailedContent = false;
        let completedActions = [];
        
        // Check for spells
        if (locationMeta.spell) {
            let spellToLearn = locationMeta.spell;
            let spellRequirements = locationMeta.spellRequirements || [];
            
            if (checkRequirements(spellRequirements, currentItems, currentSpells, currentAbilities)) {
                if (!currentSpells.includes(spellToLearn)) {
                    currentSpells.push(spellToLearn);
                    if (spellRequirements.length > 0) {
                        console.log(`   🎁 Link presented ${spellRequirements.join(" and ")} and learned ${spellToLearn}!`);
                        addAcquisitionStep("spell", spellToLearn, locationName, `(presented ${spellRequirements.join(" and ")})`);
                        completedActions.push(`learned the ${spellToLearn} spell by presenting ${spellRequirements.join(" and ")}`);
                    } else {
                        console.log(`   🎓 Link learned ${spellToLearn} from the wise man!`);
                        addAcquisitionStep("spell", spellToLearn, locationName, "(from wise man)");
                        completedActions.push(`learned the ${spellToLearn} spell from the wise man`);
                    }
                }
            } else {
                // Track failed spell attempt
                if (failedLocations) {
                    let locationInfo = failedLocations.get(nodeId) || { name: locationName };
                    locationInfo.failedSpell = { spell: spellToLearn, requirements: spellRequirements };
                    failedLocations.set(nodeId, locationInfo);
                }
                hasFailedContent = true;
                console.log(`   🔒 Cannot learn ${spellToLearn} yet (needs: ${spellRequirements.join(", ")})`);
            }
        }
        
        // Check for abilities
        if (locationMeta.ability) {
            let abilityToLearn = locationMeta.ability;
            let abilityRequirements = locationMeta.abilityRequirements || [];
            
            if (checkRequirements(abilityRequirements, currentItems, currentSpells, currentAbilities)) {
                if (!currentAbilities.includes(abilityToLearn)) {
                    currentAbilities.push(abilityToLearn);
                    if (abilityRequirements.length > 0) {
                        console.log(`   🎁 Link presented ${abilityRequirements.join(" and ")} and learned ${abilityToLearn}!`);
                        addAcquisitionStep("ability", abilityToLearn, locationName, `(presented ${abilityRequirements.join(" and ")})`);
                        completedActions.push(`learned the ${abilityToLearn} ability by presenting ${abilityRequirements.join(" and ")}`);
                    } else {
                        console.log(`   💪 Link learned ${abilityToLearn} from the master!`);
                        addAcquisitionStep("ability", abilityToLearn, locationName, "(from master)");
                        completedActions.push(`learned the ${abilityToLearn} ability from the master`);
                    }
                }
            } else {
                // Track failed ability attempt
                if (failedLocations) {
                    let locationInfo = failedLocations.get(nodeId) || { name: locationName };
                    locationInfo.failedAbility = { ability: abilityToLearn, requirements: abilityRequirements };
                    failedLocations.set(nodeId, locationInfo);
                }
                hasFailedContent = true;
                console.log(`   🔒 Cannot learn ${abilityToLearn} yet (needs: ${abilityRequirements.join(", ")})`);
            }
        }
        
        // Check for THUNDER spell (8 magic containers requirement)
        if (locationMeta.spell === "THUNDER") {
            // Use the container count instead of filtering items array
            let magicContainerCount = containerCounts ? containerCounts.MAGIC : currentItems.filter(item => item === "MAGIC_CONTAINER").length;
            if (magicContainerCount >= 8) {
                if (!currentSpells.includes("THUNDER")) {
                    currentSpells.push("THUNDER");
                    console.log(`   ⚡ Link has enough magic containers (${magicContainerCount}) and learned THUNDER!`);
                    addAcquisitionStep("spell", "THUNDER", locationName, `(with ${magicContainerCount} magic containers)`);
                    completedActions.push(`learned the THUNDER spell with ${magicContainerCount} magic containers`);
                }
            } else {
                console.log(`   ⚡ Cannot learn THUNDER yet (has ${magicContainerCount}/8 magic containers)`);
                hasFailedContent = true;
            }
        }
        
        // Remove from failed locations if all content has been accessed
        if (failedLocations && !hasFailedContent) {
            failedLocations.delete(nodeId);
        }
        
        // Create story step only if there were failed attempts (acquisitions get their own logs)
        if (hasFailedContent) {
            let failedReasons = [];
            if (locationMeta.spell && locationMeta.spellRequirements && locationMeta.spellRequirements.length > 0) {
                failedReasons.push(`${locationMeta.spell} spell (needs: ${locationMeta.spellRequirements.join(", ")})`);
            }
            if (locationMeta.ability && locationMeta.abilityRequirements && locationMeta.abilityRequirements.length > 0) {
                failedReasons.push(`${locationMeta.ability} ability (needs: ${locationMeta.abilityRequirements.join(", ")})`);
            }
            if (locationMeta.spell === "THUNDER") {
                let magicCount = containerCounts ? containerCounts.MAGIC : currentItems.filter(item => item === "MAGIC_CONTAINER").length;
                failedReasons.push(`THUNDER spell (needs: 8 magic containers, has ${magicCount})`);
            }
            
            addStoryStep("🏫 went to", nodeId, null, `but couldn't access: ${failedReasons.join(", ")}`);
        } else if (completedActions.length === 0) {
            // Not eventful if nothing was gained or blocked
            addStoryStep("🏫 revisited", nodeId, null, "but had nothing new to offer", false);
        }
    };

    // Choose the optimal next node for story progression
    const chooseOptimalNextNode = (availableNodes, currentItems, crystalCount) => {
        // Priority 1: Uncompleted palaces we can actually complete
        let completablePalaces = availableNodes.filter(node => {
            let nodeData = graphData[node];
            let locationMeta = nodeData.mappedLocation ? locationMetadata[nodeData.mappedLocation] : null;
            if (locationMeta && locationMeta.type === "PALACE") {
                // Check if we can complete this palace
                let palaceRequirements = locationMeta.completionRequirements || [];
                return checkRequirements(palaceRequirements, currentItems, [], []);
            }
            return false;
        });
        
        if (completablePalaces.length > 0) {
            return completablePalaces[0];
        }
        
        // Priority 2: Spell/ability towns where we can learn new content
        let spellAbilityTowns = availableNodes.filter(node => {
            let nodeData = graphData[node];
            let locationMeta = nodeData.mappedLocation ? locationMetadata[nodeData.mappedLocation] : null;
            if (locationMeta && (locationMeta.spell || locationMeta.ability)) {
                let canLearnSpell = false;
                let canLearnAbility = false;
                
                if (locationMeta.spell) {
                    let spellRequirements = locationMeta.spellRequirements || [];
                    canLearnSpell = checkRequirements(spellRequirements, currentItems, [], []);
                }
                
                if (locationMeta.ability) {
                    let abilityRequirements = locationMeta.abilityRequirements || [];
                    canLearnAbility = checkRequirements(abilityRequirements, currentItems, [], []);
                }
                
                return canLearnSpell || canLearnAbility;
            }
            return false;
        });
        
        if (spellAbilityTowns.length > 0) {
            return spellAbilityTowns[0];
        }
        
        // Priority 3: Locations with useful items we don't have yet
        let itemLocations = availableNodes.filter(node => {
            let nodeData = graphData[node];
            return nodeData.mappedItems && nodeData.mappedItems.length > 0 &&
                   !currentItems.includes(nodeData.mappedItems[0]);
        });
        
        if (itemLocations.length > 0) {
            return itemLocations[0];
        }
        
        // Priority 4: Any available node
        return availableNodes[0];
    };

    // Extract palace number from node data
    const extractPalaceNumber = (nodeId) => {
        let nodeData = graphData[nodeId];
        
        // Check mapped location first (this is where P1, P2, etc. are stored)
        let mappedLocation = nodeData.mappedLocation;
        let locationKey = nodeData.locationKey;
        
        // Look for palace IDs in mapped location first (P1, P2, etc.)
        if (mappedLocation === "P1") return 1;
        if (mappedLocation === "P2") return 2;
        if (mappedLocation === "P3") return 3;
        if (mappedLocation === "P4") return 4;
        if (mappedLocation === "P5") return 5;
        if (mappedLocation === "P6") return 6;
        if (mappedLocation === "GP") return 7;
        
        // Try location key as fallback
        if (locationKey && locationKey.includes("P1")) return 1;
        if (locationKey && locationKey.includes("P2")) return 2;
        if (locationKey && locationKey.includes("P3")) return 3;
        if (locationKey && locationKey.includes("P4")) return 4;
        if (locationKey && locationKey.includes("P5")) return 5;
        if (locationKey && locationKey.includes("P6")) return 6;
        if (locationKey && (locationKey.includes("GP") || locationKey.includes("GREAT_PALACE"))) return 7;
        
        // Check nodeId itself as last resort
        if (nodeId === "P1" || nodeId.includes("P1")) return 1;
        if (nodeId === "P2" || nodeId.includes("P2")) return 2;
        if (nodeId === "P3" || nodeId.includes("P3")) return 3;
        if (nodeId === "P4" || nodeId.includes("P4")) return 4;
        if (nodeId === "P5" || nodeId.includes("P5")) return 5;
        if (nodeId === "P6" || nodeId.includes("P6")) return 6;
        if (nodeId === "GP" || nodeId.includes("GP") || nodeId.includes("GREAT")) return 7;
        
        return null; // No palace number found
    };
    
    console.log(`📊 Initial state - Items: ${currentItems.length}, Mapped locations: ${Object.keys(locationMapping).length}`);
    
    let stepCount = 0;
    while (containerCounts.CRYSTALS < 7) {
        stepCount++;
        
        if (stepCount > 200) { // Safety limit
            console.log(`\n⚠️ Safety limit reached (200 steps) - ending exploration`);
            break;
        }
        
        // Get currently accessible nodes
        let accessibleNodes = getAccessibleNodes("NORTH_CASTLE", currentItems, currentSpells, currentAbilities, new Set());
        
        // Find unvisited accessible nodes
        let unvisitedNodes = accessibleNodes.filter(node => !visitedNodes.has(node));
        
        if (unvisitedNodes.length === 0) {
            console.log(`\n🎯 No new locations accessible. Checking failed locations...`);
            
            // Check failed palaces
            if (failedPalaces.size > 0) {
                console.log(`\n🏰 Revisiting failed palaces...`);
                let palaceRevisited = false;
                
                for (let [nodeId, palaceInfo] of failedPalaces) {
                    let locationMeta = locationMetadata[palaceInfo.location];
                    if (locationMeta && locationMeta.completionRequirements) {
                        if (checkRequirements(locationMeta.completionRequirements, currentItems, currentSpells, currentAbilities)) {
                            // Can now complete this palace!
                            console.log(`   ✅ Can now complete ${palaceInfo.name}!`);
                            
                            // Complete the palace and gain crystal
                            updateCrystalCount();
                            let palaceNumber = extractPalaceNumber(nodeId);
                            if (palaceNumber) {
                                console.log(`   🏆 Palace completed on return! (${containerCounts.CRYSTALS}/7 palaces done)`);
                                addStoryStep("🏰 **Palace**", nodeId, `**Crystal ${palaceNumber}**`, `by completing Palace ${palaceNumber}`, true);
                            } else {
                                addStoryStep("🏰 **Palace**", nodeId, "**Crystal**", "by palace completion", true);
                            }
                            
                            failedPalaces.delete(nodeId);
                            palaceRevisited = true;
                            break;
                        }
                    }
                }
                
                if (palaceRevisited) {
                    continue; // Continue the loop to find new accessible areas
                }
            }
            
            // Check failed locations (spells, abilities, etc.)
            if (failedLocations.size > 0) {
                console.log(`\n🏫 Revisiting failed locations...`);
                let locationRevisited = false;
                
                for (let [nodeId, locationInfo] of failedLocations) {
                    let accessibleForThis = getAccessibleNodes("NORTH_CASTLE", currentItems, currentSpells, currentAbilities, new Set());
                    if (accessibleForThis.includes(nodeId)) {
                        let nodeData = graphData[nodeId];
                        let locationMeta = nodeData.mappedLocation ? locationMetadata[nodeData.mappedLocation] : null;
                        
                        if (locationMeta) {
                            processLocationForContent(nodeId, locationMeta, currentItems, currentSpells, currentAbilities, addStoryStep, updateContainerCount, failedLocations, containerCounts, addAcquisitionStep);
                            locationRevisited = true;
                            break;
                        }
                    }
                }
                
                if (locationRevisited) {
                    continue; // Continue the loop to find new accessible areas
                }
            }
            
            console.log(`\n🏁 No more progress possible. Ending exploration.`);
            break;
        }
        
        // Get new accessible nodes that weren't accessible before
        let newAccessibleNodes = unvisitedNodes;
        let nextNode = chooseOptimalNextNode(newAccessibleNodes, currentItems, containerCounts.CRYSTALS);
        let nodeData = graphData[nextNode];
        
        visitedNodes.add(nextNode);
        console.log(`\n🚶 Step ${stepCount}: Visiting ${nextNode} (${getLocationDisplayName(nextNode)})`);
        
        // Check if this node has a mapped item
        if (nodeData.mappedItems && nodeData.mappedItems.length > 0) {
            nodeData.mappedItems.forEach(item => {
                if (!currentItems.includes(item)) {
                    currentItems.push(item);
                    updateContainerCount(item);
                    addAcquisitionStep("item", item, getLocationDisplayName(nextNode), "(found in location)");
                }
            });
        }
        
        // Check if this location has a mapped location with content
        if (nodeData.mappedLocation) {
            let locationMeta = locationMetadata[nodeData.mappedLocation];
            if (locationMeta) {
                
                // Handle palace completion
                if (locationMeta.type === "PALACE") {
                    let palaceRequirements = locationMeta.completionRequirements || [];
                    
                    if (checkRequirements(palaceRequirements, currentItems, currentSpells, currentAbilities)) {
                        // Successfully complete palace
                        updateCrystalCount();
                        let palaceNumber = extractPalaceNumber(nextNode);
                        if (palaceNumber) {
                            console.log(`   🏆 Palace completed! (${containerCounts.CRYSTALS}/7 palaces done)`);
                            addStoryStep("🏰 **Palace**", nextNode, `**Crystal ${palaceNumber}**`, `by completing Palace ${palaceNumber}`, true);
                        } else {
                            addStoryStep("🏰 **Palace**", nextNode, "**Crystal**", "by palace completion", true);
                        }
                    } else {
                        // Failed to complete palace
                        let locationName = getLocationDisplayName(nextNode);
                        failedPalaces.set(nextNode, { 
                            name: locationName, 
                            location: nodeData.mappedLocation,
                            requirements: palaceRequirements 
                        });
                        console.log(`   ❌ Could not complete palace (needs: ${palaceRequirements.join(", ")})`);
                        addStoryStep("🏰 entered", nextNode, null, `but couldn't complete it (needs: ${palaceRequirements.join(", ")})`, true);
                    }
                } else {
                    // Process location for spells, abilities, and other content
                    processLocationForContent(nextNode, locationMeta, currentItems, currentSpells, currentAbilities, addStoryStep, updateContainerCount, failedLocations, containerCounts, addAcquisitionStep);
                }
            } else {
                // No mapped location metadata - just a regular visit
                addStoryStep("🚶 explored", nextNode, null, "but found nothing special", false);
            }
        } else {
            // No mapped location - just a regular visit
            addStoryStep("🚶 explored", nextNode, null, "and searched around", false);
        }
        
        // Track any newly blocked paths discovered
        let nowAccessible = getAccessibleNodes("NORTH_CASTLE", currentItems, currentSpells, currentAbilities, new Set());
        
        // Find edges that are blocked
        Object.keys(graphData).forEach(fromNode => {
            if (nowAccessible.includes(fromNode)) {
                let nodeData = graphData[fromNode];
                if (nodeData.edges) {
                    nodeData.edges.forEach(edge => {
                        let toNode = edge.to;
                        if (!nowAccessible.includes(toNode) && edge.requirements) {
                            let pathName = `${getLocationDisplayName(fromNode)} → ${getLocationDisplayName(toNode)}`;
                            if (!blockedPaths.has(pathName)) {
                                blockedPaths.set(pathName, edge.requirements);
                                console.log(`   🚧 Found blocked path: ${pathName} (needs: ${edge.requirements.join(", ")})`);
                            }
                        }
                    });
                }
            }
        });
    }
    
    // Check completion status
    if (containerCounts.CRYSTALS >= 7) {
        console.log(`\n🎉 Adventure complete! All 7 palaces completed!`);
    } else {
        console.log(`⚠️ Adventure incomplete - only ${containerCounts.CRYSTALS}/7 palaces completed`);
    }
    
    // Show any remaining failed attempts
    if (failedPalaces.size > 0) {
        console.log(`\n🏰 Palaces still inaccessible:`);
        failedPalaces.forEach((info, nodeId) => {
            console.log(`   ❌ ${info.name} (needs: ${info.requirements.join(", ")})`);
        });
    }
    
    if (failedLocations.size > 0) {
        console.log(`\n🏫 Locations with remaining content:`);
        failedLocations.forEach((info, nodeId) => {
            let reasons = [];
            if (info.failedSpell) {
                reasons.push(`${info.failedSpell.spell} spell (needs: ${info.failedSpell.requirements.join(", ")})`);
            }
            if (info.failedAbility) {
                reasons.push(`${info.failedAbility.ability} ability (needs: ${info.failedAbility.requirements.join(", ")})`);
            }
            console.log(`   🔒 ${info.name}: ${reasons.join(", ")}`);
        });
    }
    
    // Show final stats
    console.log(`\n📊 Final Stats:`);
    console.log(`   🎁 Items collected: ${currentItems.length}`);
    console.log(`   ✨ Spells learned: ${currentSpells.length}`);
    console.log(`   💪 Abilities gained: ${currentAbilities.length}`);
    console.log(`   🏰 Palaces completed: ${containerCounts.CRYSTALS}/7`);
    console.log(`   🔮 Magic containers: ${containerCounts.MAGIC}`);
    console.log(`   ❤️ Heart containers: ${containerCounts.HEART}`);
    console.log(`   💎 Crystals: ${containerCounts.CRYSTALS}/6`);
    console.log(`   📍 Locations visited: ${visitedNodes.size}`);
    console.log(`   🐾 Total steps: ${stepCount}`);
    
    // Return the story steps array for external formatting
    return storySteps;
}