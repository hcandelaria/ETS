import React from 'react';
import EmailsTable from '../components/EmailsTable.jsx'
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Card';
import Tab from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import { connect } from 'react-redux';
import { store } from '../modules/store.js';
import { Base64 } from 'js-base64';
import google from  '../modules/google.js'
//  Import Actions

const STYLES = {
  button:{
    margin: '0px 10px',
  },
  flex: {
    flexGrow: 1
  },
  title:{
    color: '#FFFFFF'
  },
  marginTop: {
    marginTop: '20px',
  },
}
// Google credentials
const credentials = {
  apiKey: process.env.API_KEY,
  clientId: process.env.CLIENT_ID,
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
  scope: 'https://mail.google.com/',
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
const updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    store.dispatch({
      type: "UPDATE_GMAIL_SIGNEDIN",
      payload: true,
    })
  } else {
    store.dispatch({
      type: "UPDATE_GMAIL_SIGNEDIN",
      payload: false,
    })
  }
}
/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
const listLabels = () => {
  gapi.client.gmail.users.labels.list({'userId': 'me'}).then(function(response) {
    var labels = response.result.labels;
    if (labels && labels.length > 0) {
      for (let i = 0; i < labels.length; i++) {
        var label = labels[i];
        console.log(label.name)
      }
    } else {
      console.log('No Labels found.');
    }
  });
}

//Connect to redux store
@connect((store) => {
  return{
    applicantsArray: store.applicants.applicantsArray,
    gmailSignedin: store.settings.gmailSignedin,
    rows: store.settings.rows,
    selectedApplicantsRows: store.applicants.selectedApplicantsRows,
  }
})
class ApplicantPage extends React.Component{
  /**
   * Class constructor.
   */
  constructor(props,context) {
    super(props, context);

    //  Bind function to this component
    this.gmailSubmit = this.gmailSubmit.bind(this);
    this.gmailFailed = this.gmailFailed.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.initClient = this.initClient.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleGetEmails = this.handleGetEmails.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleRowSelectClick = this.handleRowSelectClick.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleCreateEmail = this.handleCreateEmail.bind(this);

  }
  isSelected = (id) => this.props.selectedApplicantsRows.indexOf(id) !== -1;

  handleSelectAllClick = (event, id) => {

    let selected = this.props.applicantsArray.map(n => n._id);

    if (this.props.selectedApplicantsRows.length > 0) {
      store.dispatch({
        type: "CLEAR_SELECT_ROWS",
      })
    }else{
      store.dispatch({
        type: "SELECT_ROWS",
        payload: selected,
      })
    }
  };

  handleRowSelectClick = (event, id) => {
    let selectedIndex = this.props.selectedApplicantsRows.indexOf(id)
    if(selectedIndex === -1){
      store.dispatch({
        type: "SELECT_ROW",
        payload: id,
      })
    }else{
      let newApplicantsRows = [];
      newApplicantsRows = newApplicantsRows.concat(
        this.props.selectedApplicantsRows.slice(0, selectedIndex),
        this.props.selectedApplicantsRows.slice(selectedIndex + 1),
      );

      store.dispatch({
        type: "REMOVE_ROW",
        payload: newApplicantsRows,
      })
    }
  };
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    this.onload=function(){};
    this.handleClientLoad();
    this.onload();
  }

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);

  }
  /**
      *  Initializes the API client library and sets up sign-in state
      *  listeners.
      */
  initClient() {
    gapi.client.init(credentials)
      .then(function (res) {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        // signoutButton.onclick = handleSignoutClick;

    })
    .catch(function (error) {
      console.log('gmail problems:', error);
    })
  }
  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event) {
    if(this.props.gmailSignedin){
      gapi.auth2.getAuthInstance().signOut().then(function () {
        gapi.auth2.getAuthInstance().disconnect();
      });
    }else{
      gapi.auth2.getAuthInstance().signIn();
    }

    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  /**
   *  Send email to selected applicant
   */
  handleCreateEmail(event) {
    console.log('testing handleCreateEmail');
    let headers = {
      To: '<bridgewaterexpress@gmail.com>',
      Subject: 'Testing gmail'
    };

    let message = 'HELLO WORLD!';

    google.sendMessage(headers, message);
  };
  /**
   *  Get emails from user
   */
  handleGetEmails(event) {
    google.listMessages(google.getMessage);
  }
  /**
   * Process the gmail form.
   *
   * @param {object} res - the gmail response object
   */
  gmailSubmit(res) {
    console.log(res);
  }
  /**
   * Process the gmail form.
   *
   */
  gmailFailed(res) {
    console.log(res);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Card className="container" style={STYLES.marginTop}>
        <h2 className="card-heading" style={STYLES.title}>Applicants</h2>

        {
          this.props.gmailSignedin ?
          (
            <div>
              <Button
                variant="contained"
                style={STYLES.button}
                onClick={this.handleGetEmails}
                color="primary" >
                <Icon>cloud_download</Icon>
              </Button>
              <Button
                variant="contained"
                style={STYLES.button}
                id="send_email"
                onClick={this.handleCreateEmail}
                color="primary"
                // disabled={(this.props.selectedApplicantsRows.length == 0)}
                >
                <Icon>email</Icon>
              </Button>
              <Button
                variant="contained"
                style={STYLES.button}
                id="signout_button"
                onClick={this.handleAuthClick}
                color="primary" >
                <Icon>exit_to_app</Icon>
              </Button>
            </div>
          ):(

            <Button variant="contained" style={STYLES.button} id="authorize_button" onClick={this.handleAuthClick} color="primary" >
              <Icon>account_circle</Icon>
            </Button>
          )
        }
        <EmailsTable
          applicants={this.props.applicantsArray}
          rows={this.props.rows}
          selectedApplicantsRows={this.props.selectedApplicantsRows}
          onSelectAllClick={this.handleSelectAllClick}
          isSelected={this.isSelected}
          numSelected={this.props.selectedApplicantsRows.length}
          rowCount={this.props.applicantsArray.length}
          rowSelectClick={this.handleRowSelectClick}/>
      </Card>
    );

  }
}

export default ApplicantPage;
