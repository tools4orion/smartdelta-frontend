import { Box, FormControl, FormLabel, Grid, Stack, Typography } from "@mui/material";
import CustomNode from "features/visualize/CustomNode";
import FloatingEdge from "features/visualize/FloatingEdge";
import ReactFlow, { Background, ReactFlowProvider } from "reactflow";
const defaultViewport = { x: 200, y: -200, zoom: 0.6 };
const edgeTypes = {
	floating: FloatingEdge,
  };
  
  const nodeTypes = {
	selectorNode: CustomNode,
  };
const ElasticServiceMap = ({mapData}) =>{
	
	return(
		<div style={{ height: '500px' }}>
		<ReactFlow
        minZoom={0.3}
        //defaultNodes={nodes}
        //defaultEdges={edges}
        elementsSelectable={true}
        edgeTypes={edgeTypes}
        defaultViewport={defaultViewport}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        //onNodeMouseMove={handleOnNodeMouseMove}
      >
	    <Background color="#ccc" variant="dots" />
        <Stack sx={{ marginTop: '20px', borderRadius: '8px', p: 2 }}>
		 <Grid container spacing={2} direction="column">
		  <Grid item>
		  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl>
                  <FormLabel component="legend">
                    <Typography variant="subtitle2">Strength
					</Typography>
                  </FormLabel>
                </FormControl>
			</Box>

		  </Grid>
		 </Grid>


		</Stack>

	  </ReactFlow>
	  </div>
	);
}


function ElasticMapReactFlowWrapper(props) {

	return (
	  <ReactFlowProvider>
		<ElasticServiceMap {...props} />
	  </ReactFlowProvider>
	);
  }
  
export default ElasticMapReactFlowWrapper;