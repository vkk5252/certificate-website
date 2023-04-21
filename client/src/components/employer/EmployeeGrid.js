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

	return (
		<>
			<div> Employee Grid</div>
			<div id="grid">
				<Table data={gridData} theme={theme}>
					{(tableList) => (
						<>
							<Header>
								<HeaderRow>
									<HeaderCell>Task</HeaderCell>
									<HeaderCell>Deadline</HeaderCell>
									<HeaderCell>Type</HeaderCell>
									<HeaderCell>Complete</HeaderCell>
									<HeaderCell>Tasks</HeaderCell>
								</HeaderRow>
							</Header>

							<Body>
								{tableList.map((item) => (
									<Row key={item.id} item={item}>
										<Cell>{item.name}</Cell>
										<Cell>
											{item.deadline.toLocaleDateString('en-US', {
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
											})}
										</Cell>
										<Cell>{item.type}</Cell>
										<Cell>{item.isComplete.toString()}</Cell>
										<Cell>{item.nodes?.length}</Cell>
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