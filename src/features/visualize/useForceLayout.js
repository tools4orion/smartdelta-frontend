import { useEffect } from 'react';
import {
  forceSimulation,
  forceManyBody,
  forceX,
  forceY,
  forceLink,
  forceCollide,
} from 'd3-force';
import { useReactFlow, useStore } from 'reactflow';
import { throttle } from 'lodash';

const elementCountSelector = (state) =>
  state.nodeInternals.size + state.edges.length;
const nodesInitializedSelector = (state) =>
  Array.from(state.nodeInternals.values()).every(
    (node) => node.width && node.height
  ) && state.nodeInternals.size;

function useForceLayout({ strength, distance, simulationFrozen  }) {
  const elementCount = useStore(elementCountSelector);
  const nodesInitialized = useStore(nodesInitializedSelector);
  const { setNodes, getNodes, getEdges } = useReactFlow();

  const throttledSetNodes = throttle((newNodes) => {
    setNodes(newNodes);
  }, 75); // Adjust the throttle rate as needed (100ms here)

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();

    if (!nodes.length) {
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
      .force('charge', forceManyBody().strength(strength))
      .alphaDecay(0.01)
      .velocityDecay(0.2)
      .force(
        'link',
        forceLink(simulationLinks)
          .id((d) => d.id)
          .distance(distance)
      )
      .force('collide', forceCollide().radius(50)) // Adjust the radius value as needed
      .force('x', forceX().x((d) => d.x).strength(0.01))
      .force('y', forceY().y((d) => d.y).strength(0.01))
      .alpha(0.1)
      .restart()
      .on('tick', () => {
		if (simulationFrozen)  return ;
        throttledSetNodes(
          simulationNodes.map((node) => ({
            id: node.id,
            data: node.data,
            position: { x: node.x || 0, y: node.y || 0 },
            className: node.className,
          }))
        );
      });

    return () => {
      simulation.stop();
    };
  }, [elementCount, getNodes, getEdges, strength, distance, throttledSetNodes]);
}

export default useForceLayout;
