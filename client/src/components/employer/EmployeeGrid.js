import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App.js";
import Box from '@mui/material/Box';
import { DataGrid, GridRow, GridColumnHeaders } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Status from "./Status.js";

const MemoizedRow = React.memo(GridRow);
const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const EmployeeGrid = (props) => {
	const user = useContext(UserContext);
	const [rows, setRows] = useState([]);
	const getRows = async () => {
		try {
			const response = await fetch(`/api/v1/grid-data?userEmail=${user.email}`);
			const body = await response.json();
			const { rows } = body;
			setRows(rows);
		} catch (err) {
			console.error(err);
		}
	}
	const updateRow = async (updatedRow) => {
		console.log("updating row");
		try {
			const response = await fetch(`/api/v1/grid-data?userEmail=${user.email}`, {
				method: "POST",
				body: JSON.stringify(updatedRow),
				headers: new Headers({
					"Content-Type": "application/json",
				})
			});
			const body = await response.json();
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`;
				const error = new Error(errorMessage);
				throw (error);
			}
			console.log("row updated successfully");
		} catch (err) {
			console.error(`Error in fetch: ${err.message}`);
		}
	}
	useEffect(() => {
		getRows();
	}, []);
	let data = {
		columns: [
			{ field: 'id', headerName: 'ID', width: 150, editable: true },
			{ field: 'firstName', headerName: 'First name', width: 150, editable: true },
			{ field: 'lastName', headerName: 'Last name', width: 150, editable: true },
			{ field: "address", headerName: "Address", width: 300, editable: true },
			{
				field: "status", headerName: "Status", width: 150,
				renderCell: (params) => {
					return (
						<Status type={params.value} />
					);
				}
			}
		],
		rows: rows
	};

	const handleRowUpdate = async (newRow) => {
		console.log("row update:", newRow);
		await updateRow(newRow);
		return newRow;
	}
	const handleRowUpdateError = (error) => {
		console.error("Row update error:", error);
	}

	return (
		<>
			<h4 style={{ marginBottom: "12px" }}>Employee Grid</h4>
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
						processRowUpdate={handleRowUpdate}
						onProcessRowUpdateError={handleRowUpdateError}
					/>
				</Box>
			</div>
		</>
	)
}

export default EmployeeGrid;