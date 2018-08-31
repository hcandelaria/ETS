import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { GoogleLogin } from 'react-google-login';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class ApplicantsTablet extends React.Component{
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidUpdate() {
    console.log('componentDidUpdate: ',this.props.applicants.length)
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <Card className="container">
        <CardTitle
          title="Applicants"
        />
        <Table>
          <TableHeader
            displaySelectAll={true}
            adjustForCheckbox={true}
            enableSelectAll={true}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Position</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            stripedRows={true}
            deselectOnClickaway={false}>
            {
              this.props.applicants.map((applicant) =>{
                return(

                  <TableRow key={applicant._id} id ={applicant._id}>
                    <TableRowColumn>{applicant.name}</TableRowColumn>
                    <TableRowColumn>{applicant.position}</TableRowColumn>
                    <TableRowColumn>{applicant.email}</TableRowColumn>
                  </TableRow>
                )

              })
            }
          </TableBody>
        </Table>
      </Card>
    );

  }
}

ApplicantsTablet.propTypes = {
    applicants: PropTypes.array.isRequired
};

export default ApplicantsTablet;
