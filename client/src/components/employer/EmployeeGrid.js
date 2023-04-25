import * as React from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridRow, GridColumnHeaders } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const MemoizedRow = React.memo(GridRow);
const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const EmployeeGrid = (props) => {
	let data = {
		columns: [
			{ field: 'firstName', headerName: 'First name', width: 150, editable: true },
			{ field: 'lastName', headerName: 'Last name', width: 150 },
			{ field: "address", headerName: "Address", width: 300 },
			{
				field: "status", headerName: "Status", width: 100,
				renderCell: (params) => {
					return (
						<>
							{params.value}
							<div className="status-icon">
								<CheckCircleOutlineIcon />
							</div>
						</>
					);
				}
			}
		],
		rows: [
			{ id: 1, firstName: 'Jon', lastName: 'Snow', address: "56 Abc Street, City, State 00000", status: "Sent" },
		]
	}

	console.log(data);

	return (
		<>
			<div> Employee Grid</div>
			<div id="grid">
				<Box sx={{ height: 520, width: '100%' }}>
					<DataGrid
						{...data}
						loading={data.rows.length === 0}
						rowHeight={38}
						checkboxSelection
						disableRowSelectionOnClick
						components={{
							Row: MemoizedRow,
							ColumnHeaders: MemoizedColumnHeaders,
						}}
					/>
				</Box>
			</div>
		</>
	)
}

export default EmployeeGrid;