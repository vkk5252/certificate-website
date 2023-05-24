import * as React from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridRow, GridColumnHeaders, useGridApiRef } from '@mui/x-data-grid';
import Title from "../Title.js";

const MemoizedRow = React.memo(GridRow);
const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const RecentGrid = ({ rows, timePeriod, highlightedIndex }) => {
	let data = {
		columns: [
			{ field: 'firstName', headerName: 'First name', width: 100, editable: true },
			{ field: 'lastName', headerName: 'Last name', width: 100, editable: true },
			{ field: "email", headerName: "Email", width: 240, editable: true },
			{ field: "address", headerName: "Address", width: 300, editable: true },
			{ field: "status", headerName: "Status", width: 200 },
			{
				field: "created", headerName: "Date created", width: 120,
				renderCell: (params) => {
					const date = new Date(params.value);
					return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
				}
			},
		],
		rows: rows.filter((row) => {
			if (row.created && highlightedIndex !== false) {
				const dateSelectedMs = (new Date().getTime()) - ((timePeriod - highlightedIndex) * (24 * 60 * 60 * 1000));
				const dateSelectedMsRounded = Math.floor(dateSelectedMs / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000);
				return dateSelectedMsRounded < row.created && row.created < (dateSelectedMsRounded + (24 * 60 * 60 * 1000));
			}
			return true;
		})
	};

	return (
		<>
			<Title>Recent</Title>
			<Box sx={{ height: 430, width: '100%' }}>
				<DataGrid
					{...data}
					loading={rows.length === 0}
					rowHeight={30}
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
				/>
			</Box>
		</>
	)
}

export default RecentGrid;