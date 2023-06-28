import { Position, MarkerType } from 'reactflow';
// returns the position (top,right,bottom or right) passed node compared to the intersection point
export function getEdgePosition(node, intersectionPoint) {
	const n = { ...node.positionAbsolute, ...node };
	const nx = Math.round(n.x);
	const ny = Math.round(n.y);
	const px = Math.round(intersectionPoint.x);
	const py = Math.round(intersectionPoint.y);
  
	if (px <= nx + 1) {
	  return Position.Left;
	}
	if (px >= nx + n.width - 1) {
	  return Position.Right;
	}
	if (py <= ny + 1) {
	  return Position.Top;
	}
	if (py >= n.y + n.height - 1) {
	  return Position.Bottom;
	}
  
	return Position.Top;
  }
