import React from 'react';
import PropTypes from 'prop-types';

import {
  CardContent,
  Stack,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  RotateIcon,
  DetailIcon,
  AnimatedDashedLine,
  CardItem,
} from './CardComponent';

import { VerticalTabs } from './VerticalTabs';
import FadeIn from 'hooks/FadeIn';
import MDTypography from 'components/MDTypography';

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
  RateChips,
  errorRatePercentage,
  usedProtocols,
}) {

  const getMessageProperty = ({target,source}) => label === 'Target' ? target : source;

  return (
    <CardItem
      hovered={hovered[index]}
      isExpanded={expanded}
      onMouseEnter={() => handleHover(index, true)}
      onMouseLeave={() => handleHover(index, false)}
      className={expanded ? 'expanded' : ''}
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
          </MDTypography>
          <AnimatedDashedLine color={message.style.stroke} />
          {expanded && (
            <FadeIn>
              <div>
                <VerticalTabs
                  statusCodePercentages={RateChips}
                  errorRate={errorRatePercentage}
                  usedProtocols={usedProtocols}
                />
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
  RateChips: PropTypes.array.isRequired,
  errorRatePercentage: PropTypes.number.isRequired,
  usedProtocols: PropTypes.array.isRequired,
};

export default DetailCardItem;