import * as React from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridRow, GridColumnHeaders } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const GridDemo = (props) => {
	const { data } = useDemoData({
		dataSet: 'Commodity',
		rowLength: 100000,
		editable: true,
	});

	console.log(data);

	return (
		<>
			<div>Grid demo</div>
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

export default GridDemo;