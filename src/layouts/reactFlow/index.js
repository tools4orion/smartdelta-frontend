import React from "react";
import ReactFlow, { MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import PropTypes from "prop-types";

function FlowChart({ data }) {
  function randomNodePosition() {
    const min = 10;
    const max = 500;
    return min + Math.random() * (max - min);
  }

  const nodes = data?.nodes.map((node) => ({
    // node, index
    // eslint-disable-next-line no-underscore-dangle
    id: node.id,
    type: "default",
    data: { label: node.data?.label },
    position: { x: randomNodePosition(), y: randomNodePosition() }, // x: index* 200, y: 200
  }));

  const edges = data?.directions.map((edge) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: edge._id,
    source: edge.source,
    target: edge.target,
    style: { strokeWidth: (edge.count % 5) + 2 },
    markerEnd: {
      type: MarkerType.Arrow,
    },
  }));

  return (
    <div style={{ height: "500px" }}>
      <ReactFlow defaultNodes={nodes} defaultEdges={edges} />
    </div>
  );
  /* const defaultNodes = [
    {
      id: "A",
      position: { x: 20, y: 20 },
      data: { label: "A" },
    },
    {
      id: "B",
      position: { x: 100, y: 200 },
      data: { label: "B" },
    },
    {
      id: "G",
      position: { x: 20, y: 450 },
      data: { label: "G" },
    },
  ];

  const defaultEdges = [
    {
      id: "A->B",
      source: "A",
      target: "B",
      markerEnd: {
        type: MarkerType.Arrow,
      },
      label: "default arrow",
    },
    {
      id: "B->G",
      source: "B",
      target: "G",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#FF0072",
      },
      label: "marker size and color",
      style: {
        strokeWidth: 2,
        stroke: "#FF0072",
      },
    },
  ]; 
  return <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} />;
  return <ReactFlow elements={[...nodes, ...edges]} />;
  */
}

FlowChart.defaultProps = {
  data: null,
};

FlowChart.propTypes = {
  data: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        data: PropTypes.shape({
          label: PropTypes.string,
        }),
      })
    ),
    directions: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
        count: PropTypes.number,
      })
    ),
  }),
};

export default FlowChart;
