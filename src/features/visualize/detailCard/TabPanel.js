const TabPanel = ({ value, index, children }) => {
	return value === index ? <div>{children}</div> : null;
  };
  
export default TabPanel;
