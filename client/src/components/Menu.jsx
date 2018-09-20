//  Import packages
import React, { PropTypes } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

const styles = {
  itemList: {
    width: 250,
    textAlign: 'center',
  },
  fullList: {
    width: 'auto',
    marginTop: 60,
  },
};


//Connect to redux store
@connect((store) => {
  return{
    location: store.router.location.pathname,
    menu: store.settings.menu,
  }
})
export default class Menu extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

  };

  toggleMenu() {
    this.props.dispatch({
      type: 'UPDATE_MENU'
    })
  };
  /**
   * Render the component.
   */
  render() {
    return (
      <Drawer anchor="right" open={this.props.menu} onClose={this.toggleMenu}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleMenu}
          onKeyDown={this.toggleMenu}
        >
          <div style={styles.fullList}>
            <List>
              <ListItem button component="a" href="/dashboard">
                <ListItemIcon>
                  <Icon>dashboard</Icon>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component="a" href="/interviews">
                <ListItemIcon>
                  <Icon>assignment_ind</Icon>
                </ListItemIcon>
                <ListItemText primary="Applications" />
              </ListItem>
              <ListItem button component="a" href="/settings">
                <ListItemIcon>
                  <Icon>settings</Icon>
                </ListItemIcon>
                <ListItemText primary="Setting" />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemIcon>
                   <Icon>inbox</Icon>
                 </ListItemIcon>
                 <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                   <Icon>send</Icon>
                 </ListItemIcon>
                 <ListItemText primary="Sent" />
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    )
  }
}
