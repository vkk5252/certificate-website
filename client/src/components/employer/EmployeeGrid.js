import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App.js";
import Box from '@mui/material/Box';
import { DataGrid, GridRow, GridColumnHeaders } from '@mui/x-data-grid';
import Status from "./Status.js";
import { v4 as uuidv4 } from "uuid";

const MemoizedRow = React.memo(GridRow);
const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const EmployeeGrid = (props) => {
	const user = useContext(UserContext);
	const [rows, setRows] = useState([]);

	const getRows = async () => {
		try {
			const response = await fetch(`/api/v1/grid-data?userEmail=${user.email}`);
			const body = await response.json();
			const { data } = body;
			console.log(data);
			setRows(data);
		} catch (err) {
			console.error(err);
		}
	}

	const updateRow = async (updatedRow) => {
		console.log("updating row");
		let result;
		try {
			const response = await fetch(`/api/v1/grid-data?userEmail=${user.email}`, {
				method: "POST",
				body: JSON.stringify(updatedRow),
				headers: new Headers({
					"Content-Type": "application/json",
				})
			});
			const body = await response.json();
			result = body.message;
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`;
				const error = new Error(errorMessage);
				throw (error);
			}
		} catch (err) {
			console.error(`Error in fetch: ${err.message}`);
		}
		return result;
	}

	useEffect(() => {
		getRows();
	}, []);

	let data = {
		columns: [
			{ field: 'firstName', headerName: 'First name', width: 150, editable: true },
			{ field: 'lastName', headerName: 'Last name', width: 150, editable: true },
			{ field: "email", headerName: "Email", width: 300, editable: true },
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
		const message = await updateRow(newRow);
		console.log(message);
		return newRow;
	}

	const handleRowUpdateError = (error) => {
		console.error("Row update error:", error);
	}

	const handleAddRow = (event) => {
		setRows([
			...rows,
			{
				userEmail: user.email,
				id: uuidv4(),
				address: "",
				email: "",
				emailSent: "",
				firstName: "",
				lastName: "",
				proof: "",
				status: "Not sent",
				verified: "no"
			}
		]);
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
			<button onClick={handleAddRow}>Add row</button>
		</>
	)
}

export default EmployeeGrid;