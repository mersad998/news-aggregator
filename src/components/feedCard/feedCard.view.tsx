import { type FC } from 'react';

import type { FeedCardViewProps } from './feedCard.type';
import { Typography } from '@mui/material';

const FeedCardView: FC<FeedCardViewProps> = (props) => {
  const { article } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 200,
        border: '1px solid gray',
        marginTop: 4,
      }}
    >
      <Typography>{article.title}</Typography>
    </div>
  );
};

export default FeedCardView;
