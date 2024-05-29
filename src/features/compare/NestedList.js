import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { useFileController } from 'contexts/FileContext';
import MDTypography from 'components/MDTypography';
import TripOriginIcon from '@mui/icons-material/TripOrigin';

const NestedList = ({ fileNo }) => {
  const [open, setOpen] = React.useState(true);
  const { state } = useFileController();
  const { selectedFilesToCompare, comparisonResult } = state;

  const handleClick = () => {
    setOpen(!open);
  };

  const getColor = (index) => {
	const colors = ['#008FFB', '#00E396', '#FEB019'];// Blue, Green, Yellow
    return colors[index % colors.length];
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {selectedFilesToCompare[fileNo - 1]?.fileName}
        </ListSubheader>
      }
    >
      {comparisonResult && comparisonResult?.result[`file${fileNo}`].clusters[0].message_instances.map((instance, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <BubbleChartIcon sx={{ color: getColor(index) }} />
            </ListItemIcon>
            <MDTypography variant="button" fontWeight="medium">{`Occurrence: ${instance.occurrence_percentage.toFixed(2)}%`}</MDTypography>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {instance.fields.map((field, fieldIndex) => (
                <ListItemButton key={fieldIndex} sx={{ pl: 4 }}>
                  <ListItemIcon>
                   <TripOriginIcon sx={{ color: getColor(index) }} />
                  </ListItemIcon>
              			
				<ListItemText  sx={{fontSize:'0.12rem',color:'#CCCCFF', p:2,fontFamily:`Roboto,Helvetica,Arial,sans-serif` }} primary={`${Object.keys(field)[0]}: ${Object.values(field)[0]}`} />
			  </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}

export default NestedList;
