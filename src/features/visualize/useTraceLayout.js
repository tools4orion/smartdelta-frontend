import { useEffect } from "react";
import {
  forceSimulation,
  forceManyBody,
  forceX,
  forceY,
  forceLink,
  forceCollide,
} from "d3-force";
import { useReactFlow, useStore } from "reactflow";
import { throttle } from "lodash";

const useForceLayout = ({ strength, distance, simulationFrozen }) => {
  const elementCount = useStore(
    (store) => store.nodeInternals.size + store.edges.length
  );
  const nodesInitialized = useStore((store) =>
    Array.from(store.nodeInternals.values()).every(
      (node) => node.width && node.height
    )
  );
  const { setNodes, getNodes, getEdges } = useReactFlow();

  const throttledSetNodes = throttle((newNodes) => {
    setNodes(newNodes);
  }, 75);

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();

    if (!nodes.length || simulationFrozen) {
      return;
    }

    const simulationNodes = nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));

    const simulationLinks = edges.map((edge) => ({
      ...edge,
      source: simulationNodes.find((node) => node.id === edge.source),
      target: simulationNodes.find((node) => node.id === edge.target),
    }));

    const simulation = forceSimulation()
      .nodes(simulationNodes)
      .force("charge", forceManyBody().strength(strength))
      .alphaDecay(0.01)
      .velocityDecay(0.2)
      .force(
        "link",
        forceLink(simulationLinks)
          .id((d) => d.id)
          .distance(distance)
      )
      .force("collide", forceCollide().radius(50))
      .force(
        "x",
        forceX()
          .x((d) => d.x)
          .strength(0.01)
      )
      .force(
        "y",
        forceY()
          .y((d) => d.y)
          .strength(0.01)
      )
      .alpha(0.1)
      .restart()
      .on("tick", () => {
        throttledSetNodes(
          simulationNodes.map((node) => ({
            id: node.id,
            data: node.data,
            position: { x: node.x || 0, y: node.y || 0 },
          }))
        );
      });

    return () => {
      simulation.stop();
    };
  }, [
    elementCount,
    getNodes,
    getEdges,
    strength,
    distance,
    throttledSetNodes,
    simulationFrozen,
  ]);
};

export default useForceLayout;
