import { useContext, type FC } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';

import { ColorModeContext } from '../../App';
import { useStyles } from './HeaderStyles';

import type { HeaderViewProps } from './HeaderTypes';

const HeaderView: FC<HeaderViewProps> = (props) => {
  const { title, onHamburgerButtonClick } = props;

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.menuContainer}>
        <MenuIcon onClick={onHamburgerButtonClick} />
      </div>

      <Typography fontFamily="dyna" sx={{ textDecoration: 'underline' }} variant="h5">
        {title}
      </Typography>

      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
};

export default HeaderView;
