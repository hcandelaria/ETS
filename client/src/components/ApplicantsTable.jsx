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
const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },

];
const data = [
  {id: '1', name: 'Hector Candelaria', position:'Sales Associate', email:'hector@test.com'},
  {id: '2', name: 'gabriel Candelaria', position:'Sales Associate', email:'gabriel@test.com'},
  {id: '3', name: 'Jennifer Espinal', position:'Sales Associate', email:'jennifer@test.com'},
  {id: '4', name: 'Jochy Marte', position:'Sales Associate', email:'jochy@test.com'},
  {id: '5', name: 'Jazmine Rodriguez', position:'Sales Associate', email:'Jazmine@test.com'},
]

const ApplicantsTable = ({
  applicantsArray
}) => (
  <Table aria-labelledby="tableTitle">
    <TableHead style={styles.TableHead}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={numSelected === rowCount}
            // onChange={onSelectAllClick}
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
      {data
        // .sort(getSorting(order, orderBy))
        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(n => {
          // const isSelected = this.isSelected(n.id);
          return (
            <TableRow
              hover
              // onClick={event => this.handleClick(event, n.id)}
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
              key={n.id}
              // selected={isSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox />
                {/* <Checkbox checked={isSelected} /> */}
              </TableCell>
              <TableCell component="th" scope="row" padding="none">
                {n.name}
              </TableCell>
              <TableCell>{n.position}</TableCell>
              <TableCell>{n.email}</TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  </Table>
);


ApplicantsTable.propTypes = {
    applicants: PropTypes.array.isRequired
};

export default ApplicantsTable;
