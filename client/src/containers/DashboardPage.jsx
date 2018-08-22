import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import ApplicantsTablet from '../components/ApplicantsTablet.jsx'
import { Card } from 'material-ui/Card';
import { Tabs, Tab} from 'material-ui/Tabs';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {}
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
          user: xhr.response.user
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Card className='container'>
        <Tabs className='tab-demo z-depth-1'>
          <Tab title="home"
            label={<span style={{ color: 'black' }}>Home</span>}>
            <Dashboard secretData={this.state.secretData} user={this.state.user} />
          </Tab>
          <Tab title="Applicants"
            label={<span style={{ color: 'black' }}>Applicants</span>}>
            Test 2
          </Tab>
          <Tab title="Test 3"
            label={<span style={{ color: 'black' }}>Test 3</span>}>
            Test 3
          </Tab>
          <Tab title="Test 4"
            label={<span style={{ color: 'black' }}>Test 4</span>}>
            Test 4
          </Tab>
        </Tabs>
      </Card>
    );
  }

}

export default DashboardPage;
