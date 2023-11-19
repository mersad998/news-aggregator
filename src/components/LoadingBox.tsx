import { Typography } from '@mui/material';
import { type FC } from 'react';

const LoadingBox: FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100vh',
        height: '100vh',
        background: 'black',
        opacity: 0.4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>Loading ...</Typography>
    </div>
  );
};

export default LoadingBox;
