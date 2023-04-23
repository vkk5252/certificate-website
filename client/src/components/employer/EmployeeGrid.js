import React, { useEffect, useState } from "react";

import { Table, Header, HeaderRow, Body, Row, HeaderCell, Cell } from '@table-library/react-table-library/table';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

const EmployeeGrid = ({ user }) => {
	const [gridData, setGridData] = useState({ nodes: [] });
	const theme = useTheme(getTheme());

	const getGridData = async () => {
		const response = await fetch(`/api/v1/get-grid-data?user=${user.email}`);
		let { nodes } = await response.json();
		nodes.forEach((item) => item.deadline = new Date(item.deadline));
		setGridData({ nodes });
	}

	useEffect(() => {
		getGridData();
	}, []);

	const resize = { minWidth: 500 };

	return (
		<>
			<div> Employee Grid</div>
			<div id="grid">
				<Table
					data={gridData}
					theme={theme}
				>
					{(tableList) => (
						<>
							<Header>
								<HeaderRow>
									<HeaderCell resize={resize}>First name</HeaderCell>
									<HeaderCell>Last name</HeaderCell>
									<HeaderCell>Email</HeaderCell>
									<HeaderCell>Address</HeaderCell>
									<HeaderCell>Status</HeaderCell>
									<HeaderCell>Verified</HeaderCell>
									<HeaderCell>Proof</HeaderCell>
									<HeaderCell>Email sent?</HeaderCell>
								</HeaderRow>
							</Header>

							<Body>
								{tableList.map((item) => (
									<Row key={item.id} item={item}>
										<Cell>{item.firstName}</Cell>
										<Cell>{item.lastName}</Cell>
										<Cell>{item.email}</Cell>
										<Cell>{item.address}</Cell>
										<Cell>{item.status}</Cell>
										<Cell>{item.verified}</Cell>
										<Cell>{item.proof}</Cell>
										<Cell>{item.emailSent}</Cell>
									</Row>
								))}
							</Body>
						</>
					)}
				</Table>
			</div>
		</>
	)
}

export default EmployeeGrid;