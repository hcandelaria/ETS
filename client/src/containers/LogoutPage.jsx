import React from 'react';
import Auth from '../modules/Auth';
import Logout from '../components/Logout.jsx';


class LogoutPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

  render() {
    return (
      <Logout secretData={this.state.secretData} />
      );
  }

}

export default LogoutPage;
