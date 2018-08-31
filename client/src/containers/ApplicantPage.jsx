import React from 'react';
import Dashboard from '../components/Dashboard.jsx';
import ApplicantsTablet from '../components/ApplicantsTablet.jsx'

import { Card } from 'material-ui/Card';
import { Tabs, Tab} from 'material-ui/Tabs';
import { GoogleLogin } from 'react-google-login';

import axios from 'axios';


// Google credentials
const credentials = {
  apiKey: process.env.API_KEY,
  clientId: process.env.CLIENT_ID,
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
  scope: 'https://www.googleapis.com/auth/gmail.readonly',
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
const updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    // authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';
  } else {
    // authorizeButton.style.display = 'block';
    // signoutButton.style.display = 'none';
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
  let applicants = [];

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
        let applicant = getMessage(email.id);
        applicants.push(getMessage(email.id));
      })
    }else{
      console.log('No emails found.');
    }
  });
  return(applicants);
}
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
    // handleApplicantsArray(applicant);
    // console.log(applicant);
  });
  return applicant;
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

class ApplicantPage extends React.Component{
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      applicants: [],
    };

    this.gmailSubmit = this.gmailSubmit.bind(this);
    this.gmailFailed = this.gmailFailed.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.initClient = this.initClient.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleApplicantsArray = this.handleApplicantsArray.bind(this);
    this.handleGetEmails = this.handleGetEmails.bind(this);

  }
  /**
   *  This function will update the applicants array
   */
  handleApplicantsArray(previousState,applicants) {
    console.log('wowowo')
    // this.setState({ applicants: this.state.applicants.concat(applicants) })
    this.setState(previousState => ({
        applicants: [...previousState.applicants, applicants]
    }));
  }

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
      console.log('got problems:', error);
    })
  }
  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
    listMessages();

  }
  /**
   *  Get emails from user
   */
  handleGetEmails(event) {
    let tempApplicant = listMessages();
    console.log('TEMP');
    console.log(tempApplicant);
    tempApplicant.forEach(applicant => {
      this.handleApplicantsArray(this.state ,applicant);
    })
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
        <button id="authorize_button" onClick={this.handleAuthClick}>Authorize</button>
        <button  onClick={this.handleGetEmails}>refresh</button>
        <button id="signout_button" onClick={this.handleAuthClick}>Sign Out</button>
        <ApplicantsTablet applicants={this.state.applicants}/>
      </div>
    );

  }
}

export default ApplicantPage;
