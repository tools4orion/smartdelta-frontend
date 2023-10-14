import React from 'react';
import PropTypes from 'prop-types';

import {
  CardContent,
  Stack,
  Tooltip,
  Fade,
  Chip,
} from '@mui/material';
import {
  RotateIcon,
  DetailIcon,
  AnimatedDashedLine,
  CardItem,
  MoreIcon,
} from './CardComponent';

import { VerticalTabs } from './VerticalTabs';
import FadeIn from 'hooks/FadeIn';
import MDTypography from 'components/MDTypography';
import { getExistedVersions } from 'features/analyse/reports/getExistedVersions';

function DetailCardItem({
  label,
  message,
  index,
  hovered,
  expanded,
  borderColor,
  handleHover,
  handleExpandCard,
  navigateToDetail,
  tableData
}) {

  const getMessageProperty = ({target,source}) => label === 'Target' ? target : source;
  const versions = getExistedVersions(tableData);
  
  const displayVersions = () => {
	if (versions.length === 0) {
	  return '';
	}
  
	return ` ${versions.map(version => `v${version}`).join(', ')}`;
  };
  
  return (
    <CardItem
      hovered={hovered[index]}
      isExpanded={expanded}
      onMouseEnter={() => handleHover(index, true)}
      onMouseLeave={() => handleHover(index, false)}
      className={expanded ? ' expanded' : ''}
      key={index}
      borderColor={borderColor}
    >
      <CardContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
		  className='card-item'
        >
          <MDTypography variant="h6">
            { label }: { getMessageProperty(message)}
          </MDTypography>
          <RotateIcon
            hovered={hovered[index]}
            expanded={expanded}
            onClick={() => handleExpandCard(index, getMessageProperty(message))}
          />
		
          <Tooltip title={'Discover'} placement="left" TransitionComponent={Fade}>
            <DetailIcon
              hovered={hovered[index]}
              expanded={expanded}
              onClick={navigateToDetail}
            />
          </Tooltip>
        </div>
        <Stack>
          <MDTypography variant="h6">
            {message.style.strokeWidth * 10} Calls 
			<Chip label={<span style={{color:'#AAB2B9', fontSize:'0.9em'}}>{displayVersions()}</span>} size="small" variant='outline' />
          </MDTypography>
          <AnimatedDashedLine color={message.style.stroke} />
          {expanded && (
            <FadeIn>
              <div>
                <VerticalTabs tableData={tableData} />
              </div>
            </FadeIn>
          )}
        </Stack>
      </CardContent>
    </CardItem>
  );
}

DetailCardItem.propTypes = {
  label: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  hovered: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
  borderColor: PropTypes.string.isRequired,
  handleHover: PropTypes.func.isRequired,
  handleExpandCard: PropTypes.func.isRequired,
  navigateToDetail: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired,	
};

export default DetailCardItem;