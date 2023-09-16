import { classifyOutliers } from 'features/analyse/reports/latency/topologyTrends/TopologyLatency';
import { getOutliers } from 'features/analyse/reports/latency/topologyTrends/TopologyLatency';
import { useEdgeProperties } from 'features/featureDiscovery/useRawData';
import { useRawData } from 'features/featureDiscovery/useRawData';

function isEmptyObject(obj) {
	return Object.keys(obj).length === 0;
  }

const useOutliers = (directions) => {
  const edgeProperties = useEdgeProperties(directions);
  const filterKeywords = Object.fromEntries(
    edgeProperties.map((key) =>
      key === 'type'
        ? [key, 'request']
        : [key, '']
    )
  );

  const { tableData } = useRawData(directions, '', filterKeywords, 'asc');

  if(isEmptyObject(filterKeywords)) return null ;
  const outliers = getOutliers(tableData);
  console.log(outliers);
  const classifiedOutliers = classifyOutliers(outliers);
  console.log(classifiedOutliers);
  return classifiedOutliers ;
}

export default useOutliers;