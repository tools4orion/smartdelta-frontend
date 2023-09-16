import { useEdgeProperties } from "features/featureDiscovery/useRawData";
import { useRawData } from "features/featureDiscovery/useRawData";

const useLatencyData = (directions, node) => {
	const edgeProperties = useEdgeProperties(directions);
	const getDefaultValue = () => '';
  
	const filterKeywords = Object.fromEntries(
	  edgeProperties.map((key) =>
		key === 'originatingMS'
		  ? [key, node]
		  : key === 'type'
		  ? [key, 'request']
		  : [key, getDefaultValue()]
	  )
	);
	
	const { tableData } = useRawData(directions, '', filterKeywords, 'asc');
  
	return tableData;
  };
  
  export default useLatencyData;