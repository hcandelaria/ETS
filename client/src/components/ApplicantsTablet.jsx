import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Card';
import Table from '@material-ui/core/Card';
import TableBody from '@material-ui/core/Card';
import TableHeader from '@material-ui/core/Card';
import TableHeaderColumn from '@material-ui/core/Card';
import TableRow from '@material-ui/core/Card';
import TableRowColumn from '@material-ui/core/Card';



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
        <h2 className="card-heading">Applicants</h2>
        <Table>
          <TableHeader
            // displaySelectAll={true}
            // adjustForCheckbox={true}
            // enableSelectAll={true}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Position</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            // stripedRows={true}
            // deselectOnClickaway={false}
            >
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
