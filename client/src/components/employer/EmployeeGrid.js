import * as React from 'react';

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

const nodes = [
	{
    id: '1',
    name: 'VSCode',
    deadline: new Date(2020, 1, 17),
    type: 'SETUP',
    isComplete: true,
  },
  {
    id: '2',
    name: 'JavaScript',
    deadline: new Date(2020, 2, 28),
    type: 'LEARN',
    isComplete: true,
  },
  {
    id: '3',
    name: 'React',
    deadline: new Date(2020, 3, 8),
    type: 'LEARN',
    isComplete: false,
  }
];

const EmployeeGrid = (props) => {
	const data = { nodes };

	const theme = useTheme(getTheme());

	const COLUMNS = [
		{ label: "Task", renderCell: (item) => item.name },
		{
			label: "Deadline",
			renderCell: (item) =>
				item.deadline.toLocaleDateString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				}),
		},
		{ label: "Type", renderCell: (item) => item.type },
		{
			label: "Complete",
			renderCell: (item) => item.isComplete.toString(),
		},
		{ label: "Tasks", renderCell: (item) => item.nodes?.length },
	];
	return (
		<>
			<div> Employee Grid</div>
			<div id="grid">
				<CompactTable columns={COLUMNS} data={data} theme={theme} />
			</div>
		</>
	)
}

export default EmployeeGrid;