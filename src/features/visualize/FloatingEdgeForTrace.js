import React from "react";
import { getBezierPath, EdgeText } from "reactflow";

const FloatingEdgeForTrace = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  label,
}) => {
  try {
    const [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition: "bottom",
      targetPosition: "top",
    });

    const statusCode = parseInt(label.split(" ")[1], 10);
    const strokeColor = statusCode >= 200 && statusCode < 300 ? "green" : "red";

    return (
      <>
        <path
          id={id}
          className="react-flow__edge-path"
          d={edgePath}
          markerEnd={markerEnd}
          style={{
            stroke: strokeColor,
            strokeWidth: 4,
            fill: "none",
          }}
        />
        <EdgeText
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2}
          label={label}
          labelStyle={{
            fontSize: 14,
            fontWeight: "bold",
            fill: "#333",
          }}
          labelBgStyle={{
            fill: "#ffffff",
            fillOpacity: 0.9,
            stroke: "#333",
            strokeWidth: 0.5,
          }}
          labelBgPadding={[15, 9]}
          labelBgBorderRadius={8}
        />
      </>
    );
  } catch (e) {
    console.error("Error generating edge path:", e);
    return null;
  }
};

export default FloatingEdgeForTrace;
