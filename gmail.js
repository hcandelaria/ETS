const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const mime = require('mime');

mime.getType('txt');                    // ⇨ 'text/plain'
mime.getExtension('text/plain');        // ⇨ 'txt'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';


// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listMessages)
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials, callback) => {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
const getNewToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const listLabels = (auth) => {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}


/**
 * Gets all the emails id in the user's account.
 * Creates a second call to get the emails detail.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const listMessages = (auth) => {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.list({
    userId: 'me',
    includeSpamTrash: false,
    q: 'indeedemail.com',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const emails = res.data.messages;
    if(emails.length){
      // console.log(emails)
      console.log('Got emails')
      // getMessage(auth, emails[0].id);
      emails.forEach((email) =>{
        getMessage(auth, email.id);
      })
    }else{
      console.log('No emails found.');
    }
  });
}

/**
 * Get Message with given ID.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param  {String} messageId ID of Message to get.
 */
const getMessage = (auth, messageId) => {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.get({
    userId: 'me',
    id: messageId,
      format: 'full'
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);

    let applicant = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      location: '0555',
      step: '1',
    };

    let headers = res.data.payload.headers;
    let mimeParts = res.data.payload.parts;


    headers.forEach((head) => {
      switch (head.name) {
        case 'From':
          applicant.email = getEmail(head.value);
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
    console.log(applicant);

  });
}
/**
 * Returns the email.
 *
 * @param  {String} str string cotainig email
 */
const getEmail = (str) => {
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
