import * as React from 'react';
// material-ui
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, TextField, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
	{id: 'slipNum', label: '과목', minWidth: 170},
	{id: 'gisu', label: '세부금액', minWidth: 170},
	{id: 'deptCode', label: '합계금액', minWidth: 170},
	{id: 'gubun', label: '세부금액', minWidth: 170},
	{id: 'summary', label: '합계금액', minWidth: 170}
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

// ==============================|| 재무상태표 ||============================== //

export default function DetailTrialBalanceForm() {

	return (
		<>
			<div Align="center">
				<Typography variant="h3">[ 검색조건 ]</Typography>
				<div>
					<TextField id="startDate" type={"date"} variant={"standard"} sx={{mx: 1}}/>
					<Button variant="contained" color="secondary" startIcon={<SearchIcon/>}
					        sx={{mx: 1, mb: "10px"}}>조회</Button>
				</div>
			</div>
			<Paper sx={{width: '100%'}}>
				<TableContainer sx={{maxHeight: 440}}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell colSpan={1}></TableCell>
								<TableCell colSpan={2}>
									당기
								</TableCell>
								<TableCell colSpan={2}>
									전기
								</TableCell>
							</TableRow>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
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
													<TableCell key={column.id} align={column.align}>
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
		</>
	);
}
