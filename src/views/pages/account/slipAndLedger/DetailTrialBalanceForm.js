import * as React from 'react';
// material-ui
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
	{id: 'slipNum', label: '계', minWidth: 170},
	{id: 'gisu', label: '대체', minWidth: 170},
	{id: 'deptCode', label: '현금', minWidth: 170},
	{id: 'gubun', label: '계정과목', minWidth: 170},
	{id: 'summary', label: '현금', minWidth: 170},
	{id: 'status', label: '대체', minWidth: 170},
	{id: 'code', label: '계', minWidth: 170},
];

const rows = [
	{
		slipNum: '12314',
		gisu: '1432',
		deptCode: 'A1231',
		gubun: '124315',
		summary: 'asdfhl',
		status: '대기',
		code: '0sdf0',
		date: '2022-10-17'
	}
];

// ==============================|| 일(월)계표 ||============================== //

export default function DetailTrialBalanceForm() {

	return (
		<Paper sx={{width: '100%'}}>
			<TableContainer sx={{maxHeight: 440}}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell colSpan={3} align={"center"}>
								차변
							</TableCell>
							<TableCell colSpan={1}></TableCell>
							<TableCell colSpan={3} align={"center"}>
								대변
							</TableCell>
						</TableRow>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={"center"}
									style={{top: 57, minWidth: column.minWidth}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={"center"}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
