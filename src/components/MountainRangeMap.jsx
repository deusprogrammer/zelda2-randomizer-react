import React from "react";

const MountainRangeMap = ({ mountainRanges, terrain }) => {
  if (!mountainRanges || !terrain) {
    return <div>No mountain range data available</div>;
  }

  // Create a color palette for mountain ranges
  const rangeColors = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Blue
    "#96CEB4", // Green
    "#FFEAA7", // Yellow
    "#DDA0DD", // Plum
    "#98D8C8", // Mint
    "#F7DC6F", // Light Yellow
    "#BB8FCE", // Light Purple
    "#85C1E9", // Light Blue
    "#F8C471", // Orange
    "#82E0AA", // Light Green
  ];

  // Create a map to track which range each border belongs to
  const borderToRange = new Map();
  mountainRanges.forEach((range, rangeIndex) => {
    range.forEach((border) => {
      borderToRange.set(`${border.x},${border.y}`, rangeIndex);
    });
  });

  const renderCell = (x, y) => {
    let backgroundColor = "#E8E8E8"; // Default light gray for non-mountain
    let content = "";
    let textColor = "#000";

    if (terrain[y] && terrain[y][x]) {
      const terrainType = terrain[y][x].getType();

      // Check if this position is a mountain border in any range
      const borderKey = `${x},${y + 30}`; // Adjust for coordinate offset
      if (borderToRange.has(borderKey)) {
        const rangeIndex = borderToRange.get(borderKey);
        backgroundColor = rangeColors[rangeIndex % rangeColors.length];
        content = String.fromCharCode(65 + (rangeIndex % 26)); // A, B, C, etc.
        textColor = "#000";
      } else if (terrainType === 12) {
        // MOUNTAIN constant
        backgroundColor = "#8B4513"; // Brown for mountains not on borders
        content = "M";
        textColor = "#FFF";
      } else if (terrainType === 13) {
        // WATER constant
        backgroundColor = "#4A90E2"; // Blue for water
      }
    }

    return (
      <div
        key={`${x}-${y}`}
        style={{
          width: "8px",
          height: "8px",
          backgroundColor,
          color: textColor,
          fontSize: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          lineHeight: "1",
        }}
      >
        {content}
      </div>
    );
  };

  const mapHeight = terrain.length;
  const mapWidth = terrain[0]?.length || 64;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${mapWidth}, 8px)`,
          gridTemplateRows: `repeat(${mapHeight}, 8px)`,
          gap: "0px",
          border: "1px solid #ccc",
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {Array.from({ length: mapHeight }, (_, y) =>
          Array.from({ length: mapWidth }, (_, x) => renderCell(x, y))
        )}
      </div>

      <div style={{ marginTop: "10px", fontSize: "12px" }}>
        <div>
          <strong>Mountain Range Legend:</strong>
        </div>
        {mountainRanges.map((range, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: rangeColors[index % rangeColors.length],
                marginRight: "8px",
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              {String.fromCharCode(65 + (index % 26))}
            </div>
            <span>
              Range {String.fromCharCode(65 + (index % 26))}: {range.length}{" "}
              border positions
            </span>
          </div>
        ))}
        <div style={{ marginTop: "8px", fontSize: "11px", color: "#666" }}>
          <div>• Colored letters = Mountain borders (cave-able positions)</div>
          <div>• Brown M = Mountains not on borders</div>
          <div>• Blue = Water</div>
          <div>• Gray = Other terrain</div>
        </div>
      </div>
    </div>
  );
};

export default MountainRangeMap;
