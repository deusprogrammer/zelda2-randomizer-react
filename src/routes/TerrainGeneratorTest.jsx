import { useState } from "react";
import MapDisplay from "../components/MapDisplay";

import { TerrainGenerator, compressMap } from "../lib/rando/TerrainGenerator";
import IsolationZoneMap from "../components/IsolationZoneMap";
import MountainRangeMap from "../components/MountainRangeMap";
import Graph from "../components/Graph";

const TYPE_MAP = {
  12: "MOUNTAIN",
  13: "WATER",
};

const TerrainGeneratorTest = () => {
  const [westHyrule, setWestHyrule] = useState({});
  const [eastHyrule, setEastHyrule] = useState({});
  const [template, setTemplate] = useState({});
  const [biomeType, setBiomeType] = useState("cellular");
  const [seed, setSeed] = useState(12345);

  const generateTerrain = () => {
    let terrainGenerator = new TerrainGenerator(seed);
    let { continents, maps, template } =
      terrainGenerator.generateContinents(biomeType);

    continents[0].compressedMap = compressMap(maps[0]);
    continents[2].compressedMap = compressMap(maps[2]);

    setWestHyrule(continents[0]);
    setEastHyrule(continents[2]);
    setTemplate(template);
  };

  const generateRandomSeed = () => {
    setSeed(Math.trunc(Math.random() * (Math.pow(2, 32) - 1)));
  };

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <h2>Random Terrain Test</h2>

      <div
        style={{
          margin: "20px 0",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <label>Biome Type: </label>
          <select
            value={biomeType}
            onChange={({ target: { value } }) => setBiomeType(value)}
          >
            <option value="cellular">Legacy Cellular</option>
            <option value="islands">Islands</option>
          </select>
        </div>

        <div>
          <label>Seed: </label>
          <input
            type="number"
            value={seed}
            onChange={({ target: { value } }) => setSeed(parseInt(value) || 0)}
            style={{ width: "120px" }}
          />
          <button onClick={generateRandomSeed} style={{ marginLeft: "5px" }}>
            Random
          </button>
        </div>

        <button onClick={generateTerrain}>Generate Terrain</button>
      </div>

      {westHyrule.terrain && eastHyrule.terrain ? (
        <>
          <h3>West Hyrule ({biomeType})</h3>
          <h4>Terrain Map</h4>
          <MapDisplay
            overworld={{
              spriteMap: westHyrule.compressedMap,
              locations: Object.values(template).filter(
                (location) => location.continent === 0
              ),
              worldNumber: 0,
            }}
            maps={[]}
            terrainCells={westHyrule.terrain}
            mountainBorders={westHyrule.mountainBorders}
          />
          {westHyrule.textDump && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "5px",
                }}
              >
                <h4 style={{ margin: 0 }}>
                  Text Dump (Lowercase=no node, Uppercase=has node: g/G=Grass,
                  w/W=Water, m/M=Mountain, f/F=Forest, d/D=Desert, s/S=Swamp,
                  c/C=Cemetery, b/B=Bridge)
                </h4>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(westHyrule.textDump)
                  }
                  style={{
                    padding: "5px 10px",
                    fontSize: "12px",
                    backgroundColor: "#007ACC",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Copy Text Dump
                </button>
              </div>
              <pre
                style={{
                  textAlign: "left",
                  fontSize: "8px",
                  lineHeight: "8px",
                  maxHeight: "300px",
                  overflow: "auto",
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {westHyrule.textDump}
              </pre>
            </>
          )}
          <h4>Isolation Zone Map</h4>
          <IsolationZoneMap terrainCells={westHyrule.terrain} />
          {westHyrule.mountainRanges && (
            <>
              <h4>Mountain Range Map</h4>
              <MountainRangeMap
                mountainRanges={westHyrule.mountainRanges}
                terrain={westHyrule.terrain}
              />
            </>
          )}
          <h4>Connections ({westHyrule.connections.length} total)</h4>
          <div
            style={{
              textAlign: "left",
              maxHeight: "200px",
              overflow: "auto",
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            {westHyrule.connections.map(({ to, from, blockers }, index) => (
              <div key={index}>
                {from} =&gt; {to} [
                {blockers.map((blocker) => TYPE_MAP[blocker]).join(", ")}]
              </div>
            ))}
          </div>

          <h3>East Hyrule ({biomeType})</h3>
          <h4>Terrain Map</h4>
          <MapDisplay
            overworld={{
              spriteMap: eastHyrule.compressedMap,
              locations: Object.values(template).filter(
                (location) => location.continent === 2
              ),
              worldNumber: 2,
            }}
            maps={[]}
            terrainCells={eastHyrule.terrain}
            mountainBorders={eastHyrule.mountainBorders}
          />
          {eastHyrule.textDump && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "5px",
                }}
              >
                <h4 style={{ margin: 0 }}>
                  Text Dump (Lowercase=no node, Uppercase=has node: g/G=Grass,
                  w/W=Water, m/M=Mountain, f/F=Forest, d/D=Desert, s/S=Swamp,
                  c/C=Cemetery, b/B=Bridge)
                </h4>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(eastHyrule.textDump)
                  }
                  style={{
                    padding: "5px 10px",
                    fontSize: "12px",
                    backgroundColor: "#007ACC",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Copy Text Dump
                </button>
              </div>
              <pre
                style={{
                  textAlign: "left",
                  fontSize: "8px",
                  lineHeight: "8px",
                  maxHeight: "300px",
                  overflow: "auto",
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {eastHyrule.textDump}
              </pre>
            </>
          )}
          <h4>Isolation Zone Map</h4>
          <IsolationZoneMap terrainCells={eastHyrule.terrain} />
          {eastHyrule.mountainRanges && (
            <>
              <h4>Mountain Range Map</h4>
              <MountainRangeMap
                mountainRanges={eastHyrule.mountainRanges}
                terrain={eastHyrule.terrain}
              />
            </>
          )}
          <h4>Connections ({eastHyrule.connections.length} total)</h4>
          <div
            style={{
              textAlign: "left",
              maxHeight: "200px",
              overflow: "auto",
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            {eastHyrule.connections.map(({ to, from, blockers }, index) => (
              <div key={index}>
                {from} =&gt; {to} [
                {blockers.map((blocker) => TYPE_MAP[blocker]).join(", ")}]
              </div>
            ))}
          </div>

          <h3>Isolation Zone Statistics</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              margin: "20px 0",
            }}
          >
            <div>
              <h4>West Hyrule Zones</h4>
              <div style={{ textAlign: "left", fontSize: "14px" }}>
                <div>
                  <strong>Total Zones:</strong>{" "}
                  {westHyrule.isolationZones.length}
                </div>
                {westHyrule.isolationZones.map((zone, index) => (
                  <div key={index}>
                    Zone {index}: {zone.length} cells
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4>East Hyrule Zones</h4>
              <div style={{ textAlign: "left", fontSize: "14px" }}>
                <div>
                  <strong>Total Zones:</strong>{" "}
                  {eastHyrule.isolationZones.length}
                </div>
                {eastHyrule.isolationZones.map((zone, index) => (
                  <div key={index}>
                    Zone {index}: {zone.length} cells
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3>Graph</h3>
          <Graph template={template} />
          <h3>Template</h3>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(template, null, 5)}
          </pre>
        </>
      ) : null}
    </div>
  );
};

export default TerrainGeneratorTest;
