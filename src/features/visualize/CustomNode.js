import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data }) => {
  return (
    <>
      {data}
      <Handle type="source" position={Position.Top} id="s1" />
      <Handle type="source" position={Position.Right} id="s2" />
      <Handle type="target" position={Position.Bottom} id="t1" />
      <Handle type="target" position={Position.Left} id="t2" />
    </>
  );
});
