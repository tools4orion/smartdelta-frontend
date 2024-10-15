import React from "react";
import { getBezierPath } from "reactflow";

const FloatingEdgeForTrace = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
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

    return (
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "green",
          strokeWidth: 4,
          fill: "none",
        }}
      />
    );
  } catch (e) {
    console.error("Error generating edge path:", e);
    return null;
  }
};

export default FloatingEdgeForTrace;
