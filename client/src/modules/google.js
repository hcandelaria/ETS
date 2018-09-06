import { store } from '../modules/store.js';
import { updateApplicant } from '../actions/applicantsActions';

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
};

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
};

const google = {

  /**
   * Gets all the emails id in the user's account.
   * Calls callback function forEach email with the query.
   * @param {function} callback fires forEach email found
   */
  listMessages : (callback) => {
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
          callback(email.id);
        })
      }else{
        console.log('No emails found.');
      }
    });
  },

  /**
   * Get Message with given ID.
   * then return an array with all of them.
   * @param  {String} messageId ID of Message to get.
   * @return {object} applicant
   */
  getMessage : (messageId) => {

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
      // console.log(applicant);
      store.dispatch(updateApplicant(applicant));
    });

  },

  /**
   * Send Message.
   *
   * @param  {object} headers_obj
   * @param  {string} message message to be send.
   */
  sendMessage : (headers_obj, message) => {
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
  },
}

export default google;
