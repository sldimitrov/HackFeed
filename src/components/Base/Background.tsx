import { Box } from '@mui/material';
import orangeBG from '../../assets/hackSoftOrange.png';
import grayBG from '../../assets/hackSoftGray.png';

export function Background() {
  return (
    <>
      {/* Orange top-right background */}
      <Box
        component="img"
        src={orangeBG}
        alt="orange background"
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 0,
          width: 'auto',
          height: 'auto',
          maxWidth: '70%',
        }}
      />

      {/* Gray bottom-left background */}
      <Box
        component="img"
        src={grayBG}
        alt="gray background"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 0,
          width: 'auto',
          height: 'auto',
          maxWidth: '70%',
        }}
      />
    </>
  );
}
