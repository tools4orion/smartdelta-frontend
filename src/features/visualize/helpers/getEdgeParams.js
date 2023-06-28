import { getEdgePosition } from "./getEdgePosition";
import { getNodeIntersection } from "./getNodeIntersection";

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
	const sourceIntersectionPoint = getNodeIntersection(source, target);
	const targetIntersectionPoint = getNodeIntersection(target, source);
  
	const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
	const targetPos = getEdgePosition(target, targetIntersectionPoint);
  
	return {
	  sx: sourceIntersectionPoint.x,
	  sy: sourceIntersectionPoint.y,
	  tx: targetIntersectionPoint.x,
	  ty: targetIntersectionPoint.y,
	  sourcePos,
	  targetPos,
	};
  }
  