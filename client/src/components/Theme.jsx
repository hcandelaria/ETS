import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    type: 'dark',
    primary: {
      main: '#DB0632',
    },
    secondary: {
      main: '#000000',
    },
  },
  status: {
    danger: 'orange',
  },
});

export default theme;
