import React, { useState } from "react";
import DataTable from 'react-data-table-component';

// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
    }
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    }
]

const EmployeeGrid = (props) => {
	return (
		<>
			<div> Employee Grid</div>
			<div id="grid">
				<DataTable
					columns={columns}
					data={data}
					expandableRows
          expandableRowsComponent={ExpandedComponent}
					pagination
					selectableRows
					dense
				/>
			</div>
		</>
	)
}

export default EmployeeGrid;