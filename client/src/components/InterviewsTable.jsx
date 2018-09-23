import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
  Tooltip
} from '@material-ui/core/';


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

const InterviewsTable = ({
  Interviews,
  selectedInterviewsRows,
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
      {Interviews
        // .sort(getSorting(order, orderBy))
        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(interview => {

          let rowId = isSelected(interview._id);

          return (
            <TableRow
              hover
              onClick={event => rowSelectClick(event, interview._id)}
              role="checkbox"
              aria-checked={rowId}
              tabIndex={-1}
              key={interview._id}
              selected={rowId}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={rowId}
                  color='primary'
                />
              </TableCell>
              <TableCell component="th" scope="row" padding="none">
                {`${interview.fName} ${interview.lName}`}
              </TableCell>
              <TableCell>{interview.position}</TableCell>
              <TableCell>{interview.email}</TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  </Table>
);


InterviewsTable.propTypes = {
  Interviews: PropTypes.array.isRequired,
  selectedInterviewsRows: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowSelectClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default InterviewsTable;
