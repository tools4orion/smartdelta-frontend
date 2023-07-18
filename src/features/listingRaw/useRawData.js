import { useMemo } from 'react';

export function useRawData(directions, searchQuery, filterKeywords, sortDirection) {
  const { edgeProperties, tableData } = useMemo(() => {
    if (!directions) {
      return { edgeProperties: [], tableData: [] };
    }

    const edgePropertiesSet = new Set();
    const filteredTableData = [];

    for (const direction of directions) {
      for (const edge of direction.edges) {
        filteredTableData.push({
          id: filteredTableData.length, // Adding an id to use as the React key
          ...edge,
        });

        for (const property in edge) {
          edgePropertiesSet.add(property);
        }
      }
    }

    const edgeProperties = Array.from(edgePropertiesSet);
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

    return { edgeProperties, tableData: filteredData };
  }, [directions, searchQuery, filterKeywords, sortDirection]);

  return { edgeProperties, tableData };
}
