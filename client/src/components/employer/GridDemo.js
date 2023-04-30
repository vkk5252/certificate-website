import * as React from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridRow, GridColumnHeaders } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

const GridDemo = (props) => {
	const { data } = useDemoData({
		dataSet: 'Commodity',
		rowLength: 100000,
		editable: true,
	});

	console.log(data);
  const theme = createTheme();

	return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography component="h1" variant="h5">
           Grid Demo 
          </Typography>
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

				</Box>
			</Container>
		</ThemeProvider>

	)
}

export default GridDemo;