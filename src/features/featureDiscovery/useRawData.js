import { useMemo } from 'react';

export function useEdgeProperties(directions) {
	if(!directions) return [];
	const edgePropertiesSet = new Set();
  
	for (const direction of directions) {
	  for (const edge of direction.edges) {
		for (const property in edge) {
		  edgePropertiesSet.add(property);
		}
		// Exit the loops after processing the first edge
		return Array.from(edgePropertiesSet);
	  }
	}
  
  }


export function useRawData(directions, searchQuery, filterKeywords, sortDirection) {
  const { tableData } = useMemo(() => {
    if (!directions) {
      return { edgeProperties: [], tableData: [] };
    }
	console.log(directions);
    const filteredTableData = [];

    for (const direction of directions) {
      for (const edge of direction.edges) {
        filteredTableData.push({
          id: filteredTableData.length, // Adding an id to use as the React key
          ...edge,
        });

      }
    }


    let filteredData = filteredTableData.filter((row) => {
      const values = Object.values(row);
      return values.some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    for (const column in filterKeywords) {
      const keyword = filterKeywords[column];
      if (keyword !== '') {
        filteredData = filteredData.filter((row) =>
          row[column]
            .toString()
            .toLowerCase()
            .includes(keyword.toLowerCase())
        );
      }
    }

    filteredData.sort((a, b) => {

      const timeStampA = new Date(a.timestamp);
      const timeStampB = new Date(b.timestamp);
      return sortDirection === 'asc' ? timeStampA - timeStampB : timeStampB - timeStampA;
    });

    return { tableData: filteredData };
  }, [directions, searchQuery, filterKeywords, sortDirection]);

  return { tableData };
}
