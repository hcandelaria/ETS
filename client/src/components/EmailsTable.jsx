import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';

const styles = {
  flex: {
    flexGrow: 1
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
  },
}

const EmailsTable = ({
  applicants,
  selectedApplicantsRows,
  rows,
  onSelectAllClick,
  rowSelectClick,
  isSelected,
  numSelected,
  rowCount,
}) => (
  <Table aria-labelledby="tableTitle">
    <TableHead style={styles.TableHead}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount && numSelected != 0}
            onClick={onSelectAllClick}
            color='primary'
          />
        </TableCell>
        {rows.map(row => {
          return (
            <TableCell
              key={row.id}
              numeric={row.numeric}
              padding={row.disablePadding ? 'none' : 'default'}
              // sortDirection={orderBy === row.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  // active={orderBy === row.id}
                  // direction={order}
                  // onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>

    <TableBody>
      {applicants
        // .sort(getSorting(order, orderBy))
        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(applicant => {

          let rowId = isSelected(applicant._id);

          return (
            <TableRow
              hover
              onClick={event => rowSelectClick(event, applicant._id)}
              role="checkbox"
              aria-checked={rowId}
              tabIndex={-1}
              key={applicant._id}
              selected={rowId}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={rowId}
                  color='primary'
                />
              </TableCell>
              <TableCell component="th" scope="row" padding="none">
                {`${applicant.firstName} ${applicant.lastName}`}
              </TableCell>
              <TableCell>{applicant.position}</TableCell>
              <TableCell>{applicant.email}</TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  </Table>
);


EmailsTable.propTypes = {
  applicants: PropTypes.array.isRequired,
  selectedApplicantsRows: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowSelectClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EmailsTable;
