import React from 'react';
import ApplicantsTable from '../components/ApplicantsTable.jsx'
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Card';
import Tab from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { store } from '../modules/store.js';
import { Base64 } from 'js-base64';

//  Import Actions
import { updateApplicant } from '../actions/applicantsActions';
// import { GoogleLogin } from 'react-google-login';

const styles = {
  button:{
    margin: '0px 10px',
  },
  flex: {
    flexGrow: 1
  }
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
/**
 * Gets all the emails id in the user's account.
 * Creates a second call to get the emails detail.
 *
 */
const listMessages = () => {

  gapi.client.gmail.users.messages.list({
    userId: 'me',
    includeSpamTrash: false,
    q: 'indeedemail.com',
  }).then(function(res, err) {
    if (err)  return console.log('The API returned an error: ' + err);
    const emails = res.result.messages;
    if(emails.length){
      // console.log(emails)
      console.log('Got emails')
      // getMessage(auth, emails[0].id);
      emails.forEach((email) =>{
        getMessage(email.id);
      })
    }else{
      console.log('No emails found.');
    }
  });
}

/**
 * Send Message.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} email RFC 5322 formatted String.
 * @param  {Function} callback Function to call when the request is complete.
 */
const sendMessage = (headers_obj, message) => {
  // var base64EncodedEmail = Base64.encodeURI(email);
  // console.log(base64EncodedEmail)
  var email = '';

  for(var header in headers_obj)
    email += header += ": "+headers_obj[header]+"\r\n";

    email += "\r\n" + message;
  var request = gapi.client.gmail.users.messages.send({
    userId: 'me',
    'resource': {
      'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
    }
  });
  request.execute();
}
/*
  gapi.client.gmail.users.messages.list({
    userId: 'me',
    // includeSpamTrash: false,
    // q: 'indeedemail.com',
  }).then(function(res, err) {
    if (err)
      return console.log('The API returned an error: ' + err);

      let tempId = res.result.messages[0].id;
      console.log(tempId)
      gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: tempId,
        format: 'full'
      }).then((message, err) => {
        if (err)
          return console.log('The API returned an error: ' + err);

        console.log(message);
      });
  })
}*/

/**
 * Get Message with given ID.
 * then return an array with all of them.
 * @param  {String} messageId ID of Message to get.
 * @return {object} applicant
 */
const getMessage = (messageId) => {

  let applicant = {
    _id: messageId,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    location: '0555',
    step: '1',
    date: '09/05/2018'
  };

  gapi.client.gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'full'
  }).then((res, err) => {
    if (err) return console.log('The API returned an error: ' + err);

    // console.log(res);
    let headers = res.result.payload.headers;
    let mimeParts = res.result.payload.parts;

    headers.forEach((head) => {
      switch (head.name) {
        case 'From':
          applicant.email = formatEmail(head.value);
          break;
        case 'Subject':
          applicant = getNamePosition(applicant, head.value);
          break;
        default:
      };
    });

    mimeParts.forEach( (part) => {
      // console.log(part.mimeType);
      if(part.mimeType == 'multipart/alternative' || part.mimeType == 'multipart/mixed'){

        // console.log(part.parts);
      }
    });
    // console.log(mimeParts);
    // console.log(applicant);
    store.dispatch(updateApplicant(applicant));
  });

}
/**
 * Returns the email.
 *
 * @param  {String} str string cotainig email
 */
const formatEmail = (str) => {
  let matches = str.match(/\<(.*?)\>/);

  if (matches) {
    return matches[1];
  }
  else{
    return 'getEmail - ERROR NO EMAIL!';
  }
}

/**
 * Get first name last name and position from the given string.
 *
 * @param {object.applicant} applicant object to be updated and return.
 * @param  {String} str whole string with the details.
 */
const getNamePosition = (applicant, str) => {
  let matches = str.split(" - ");
  let name = matches[1].split(' ');

  applicant.position = matches[0].replace('candidate', '').trim();
  applicant.firstName = name[0];
  applicant.lastName = name[1];
  return applicant;
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
      Subject: 'Testing Something'
    };

    let message = 'I love you princess!'

    sendMessage(headers, message);
  };
  /**
   *  Get emails from user
   */
  handleGetEmails(event) {
    listMessages();
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
      <div>
        <Paper className="container">
          <Typography variant="display1" id="tableTitle" color="inherit">
            Applicants
          </Typography>
          {
            this.props.gmailSignedin ?
            (
              <div>
                <Button
                  variant="contained"
                  style={styles.button}
                  onClick={this.handleGetEmails}
                  color="primary" >
                  <Icon>cloud_download</Icon>
                </Button>
                <Button
                  variant="contained"
                  style={styles.button}
                  id="send_email"
                  onClick={this.handleCreateEmail}
                  color="primary"
                  // disabled={(this.props.selectedApplicantsRows.length == 0)}
                  >
                  <Icon>email</Icon>
                </Button>
                <Button
                  variant="contained"
                  style={styles.button}
                  id="signout_button"
                  onClick={this.handleAuthClick}
                  color="primary" >
                  <Icon>exit_to_app</Icon>
                </Button>
              </div>
            ):(

              <Button variant="contained" style={styles.button} id="authorize_button" onClick={this.handleAuthClick} color="primary" >
                <Icon>account_circle</Icon>
              </Button>
            )
          }
          <ApplicantsTable
            applicants={this.props.applicantsArray}
            rows={this.props.rows}
            selectedApplicantsRows={this.props.selectedApplicantsRows}
            onSelectAllClick={this.handleSelectAllClick}
            isSelected={this.isSelected}
            numSelected={this.props.selectedApplicantsRows.length}
            rowCount={this.props.applicantsArray.length}
            rowSelectClick={this.handleRowSelectClick}/>
        </Paper>
      </div>
    );

  }
}

export default ApplicantPage;
