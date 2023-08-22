import MDTypography from 'components/MDTypography';
import HttpIcon from '@mui/icons-material/Http';
import websocket from 'assets/svgs/websockets.svg';
import amqp from 'assets/svgs/rabbitmq.svg';
import HelpIcon from '@mui/icons-material/Help';
import webrtc from 'assets/svgs/webrtc.svg';

export const protocolComponents = {
  WebRTC: () => (
    <>
      <img width="18" height="18" src={webrtc} alt="webrtc" />
      <MDTypography sx={{ fontSize: '0.65em' }}>WebRTC</MDTypography>
    </>
  ),
  WebSocket: () => <img width="54" height="54" src={websocket} alt="websocket" />,
  AMQP: () => (
    <>
      <img width="18" height="18" src={amqp} alt="amqp" />
      <MDTypography sx={{ fontSize: '0.65em' }}>AMQP</MDTypography>
    </>
  ),
  "HTTP-POST": () => (
    <>
      <HttpIcon color="info" fontSize="large" />
      <MDTypography sx={{ fontSize: '0.65em' }}>-POST</MDTypography>
    </>
  ),
  "HTTP-GET": () => (
    <>
      <HttpIcon color="info" fontSize="large" />
      <MDTypography sx={{ fontSize: '0.65em' }}>-GET</MDTypography>
    </>
  ),
  Default: (protocol) => (
    <>
      <HelpIcon color="info" fontSize="large" />
      <MDTypography sx={{ fontSize: '0.65em' }}>
        {protocol} Protocol
      </MDTypography>
    </>
  ),
};
