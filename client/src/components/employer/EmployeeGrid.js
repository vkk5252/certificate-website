import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App.js";
import Box from '@mui/material/Box';
import { DataGrid, GridRow, GridColumnHeaders, useGridApiRef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Status from "./Status.js";
import { v4 as uuidv4 } from "uuid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Popup from "../layout/Popup.js";

const MemoizedRow = React.memo(GridRow);
const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const EmployeeGrid = (props) => {
	const user = useContext(UserContext);
	const [rows, setRows] = useState([]);
	const [editingId, setEditingId] = useState("");
	const apiRef = useGridApiRef();
	const [showPopup, setShowPopup] = useState(false);

	const getRows = async () => {
		try {
			const response = await fetch(`/api/v1/grid-data?userEmail=${user.email}`);
			const body = await response.json();
			const { data } = body;
			setRows(data);
		} catch (err) {
			console.error(err);
		}
	};

	const updateRow = async (updatedRow) => {
		let result = "row update: ";
		try {
			const response = await fetch(`/api/v1/grid-data?userEmail=${user.email}`, {
				method: "POST",
				body: JSON.stringify(updatedRow),
				headers: new Headers({
					"Content-Type": "application/json",
				})
			});
			const body = await response.json();
			result += body.message;
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`;
				const error = new Error(errorMessage);
				throw (error);
			}
		} catch (err) {
			console.error(`Error in fetch: ${err.message}`);
		}
		console.log(result);
	};

	const deleteRow = async (id) => {
		let result = "row deletion: ";
		try {
			const response = await fetch(`/api/v1/grid-data?email=${user.email}&id=${id}`, {
				method: "DELETE",
				headers: new Headers({
					"Content-Type": "application/json",
				})
			});
			const body = await response.json();
			result += body.message
			if (!response.ok) {
				const errorMessage = `${response.status} (${response.statusText})`;
				const error = new Error(errorMessage);
				throw (error);
			}
			setRows(rows.filter(row => row.id !== id));
		} catch (err) {
			console.error(`Error in fetch: ${err.message}`);
		}
		console.log(result);
	};

	const handleEditButton = (params) => {
		apiRef.current.startCellEditMode({ id: params.id, field: 'firstName' });
		apiRef.current.startRowEditMode({ id: params.id });
		// console.log(params)
		// setTimeout(() => {
		// 	apiRef.current.stopRowEditMode({ id: params.id });
		// }, 1000);
	};

	const handleDeleteButton = async (params) => {
		await deleteRow(params.id);
	};

	useEffect(() => {
		getRows();
	}, []);

	useEffect(() => {
		console.log("editing id useeffect")
		if (editingId) {
			handleEditButton({ id: editingId });
		}
	}, [editingId]);

	let data = {
		columns: [
			{
				field: "Actions", headerName: "Actions", width: 100,
				renderCell: (params) => {
					return (
						<div className="row-action-buttons">
							<IconButton onClick={() => handleEditButton(params)}>
								<EditIcon />
							</IconButton>
							<IconButton onClick={async () => await handleDeleteButton(params)}>
								<DeleteIcon />
							</IconButton>
						</div>
					);
				}
			},
			{ field: 'firstName', headerName: 'First name', width: 100, editable: true },
			{ field: 'lastName', headerName: 'Last name', width: 100, editable: true },
			{ field: "email", headerName: "Email", width: 240, editable: true },
			{ field: "address", headerName: "Address", width: 300, editable: true },
			// {
			// 	field: "phoneNumber", headerName: "Phone number", width: 120, editable: true,
			// 	renderCell: (params) => {
			// 		// "1234567890"
			// 		const numberString = params.value;
			// 		return "(" + numberString.substring(0, 3) + ") " + numberString.substring(3, 6) + "-" + numberString.substring(6);
			// 	},
			// 	// preProcessEditCellProps: (params) => {
			// 	// 	const hasError = params.props.value.length < 10;
			// 	// 	// setShowPopup(true);
			// 	// 	return { ...params.props, error: hasError };
			// 	// },
			// },
			{
				field: "status", headerName: "Status", width: 200,
				// renderCell: (params) => {
				// 	return (
				// 		<Status type={params.value} />
				// 	);
				// }
			},
			{
				field: "created", headerName: "Date created", width: 120,
				renderCell: (params) => {
					const date = new Date(params.value);
					return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
				}
			},
		],
		rows: rows
	};

	// const validateRow = (row) => {
	// 	const validations = {
	// 		phoneNumber: () => { }
	// 	}
	// 	console.log("validation");
	// 	return false;
	// }

	// const useFakeMutation = () => {
	// 	return React.useCallback(
	// 		(row) =>
	// 			new Promise((resolve, reject) => {
	// 				if (row.phoneNumber.length < 10) {
	// 					setShowPopup({ message: "Invalid phone number", severity: "error" });
	// 					reject(new Error("phone number less than 10 digits"))
	// 				} else {
	// 					setShowPopup(false);
	// 					resolve(row);
	// 				}
	// 			}),
	// 		[],
	// 	);
	// };
	// const mutateRow = useFakeMutation();

	const handleRowUpdate = async (newRow, oldRow) => {
		await updateRow(newRow);
		return newRow;
	};

	const handleRowUpdateError = (error) => {
		console.log("error")
		console.error("Row update error:", error);
	};

	const handleAddRow = () => {
		const newRowId = uuidv4();
		setRows([
			...rows,
			{
				userEmail: user.email,
				id: newRowId,
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
		setEditingId(newRowId);
		return newRowId;
	};

	return (
		<>
			<div id="grid">
				<div id="grid-top">
					<Typography component="h1" variant="h5">
						Candidates
					</Typography>
					<Popup popup={showPopup} setPopup={setShowPopup} message={showPopup.message} severity={showPopup.severity} />
					<IconButton onClick={() => {
						handleAddRow();
					}}>
						<PostAddIcon />
					</IconButton>
				</div>
				<div id="grid-shadow">
					<Box sx={{ height: 520, width: '100%' }}>
						<DataGrid
							{...data}
							apiRef={apiRef}
							editMode="row"
							loading={data.rows.length === 0}
							rowHeight={38}
							checkboxSelection
							disableRowSelectionOnClick
							components={{
								Row: MemoizedRow,
								ColumnHeaders: MemoizedColumnHeaders,
							}}
							sx={{
								"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
									outline: "none !important",
								}
							}}
							initialState={{ pinnedColumns: { right: ['actions'] } }}
							processRowUpdate={handleRowUpdate}
							onProcessRowUpdateError={handleRowUpdateError}
						/>
					</Box>
				</div>
			</div>
		</>
	)
}

export default EmployeeGrid;