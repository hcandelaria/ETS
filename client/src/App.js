import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Navbar from './components/Navbar.jsx';
import Menu from './components/Menu.jsx';
import PageRouter from './containers/PageRouter.jsx';


const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: { main: '#DB0632'},
    secondary: { main: '#000000'},
  },
});

// remove tap delay, essential for MaterialUI to work properly

export default class App extends Component {

  render() {

    return(
      <MuiThemeProvider theme={theme}>
        <div>
          <Menu />
          <Navbar />
          <PageRouter />
        </div>
      </MuiThemeProvider>
    )
  }
}
