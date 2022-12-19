import React, {useState} from 'react';
// material-ui
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

//Columns
const slipColumns = [
	{field: 'id', headerName: 'ID', width: 200, hide: true},
	{field: 'month', headerName: '해당월', width: 250},
	{field: 'date', headerName: '일자', width: 150},
	{field: 'summary', headerName: '적요', width: 200},
	{field: 'workplace', headerName: '거래처', width: 150},
	{field: 'workplaceName', headerName: '거래처명', width: 250},
	{field: 'input', headerName: '입금', width: 200},
	{field: 'output', headerName: '출금', width: 200},
	{field: 'remain', headerName: '잔액', width: 130}
];

//table data
const slipRows = [
	{
		id: 1,
		month: 'Snow',
		date: 'Jon',
		summary: 35,
		workplace: 'asdf',
		workplaceName: 'qwer',
		input: '적요',
		output: '승인대기',
		remain: 'admin'
	}
];

// ==============================|| 현금출납장 ||============================== //

export default function CashJournalForm() {
	const theme = useTheme();

	const year = new Date().getFullYear()
	const month = new Date().getMonth() + 1
	const today = year + "-" + month + "-" + new Date().getDate()
	const yearFirst = year + '-01-01'
	const yearLast = year + '-12-31'
	const monthFirst = year + '-' + month + '-01'

	const [startDate, setStartDate] = useState(monthFirst)
	const [endDate, setEndDate] = useState(today)

	const thisYear = () => {
		setStartDate(yearFirst)
		setEndDate(yearLast)
	};

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item xs={12}>
				<div Align="center">
					<Typography variant="h3">[ 검색조건 ]</Typography>
					<div>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="Start Date"
								value={startDate}
								onChange={(newValue) => {
									setStartDate(newValue);
								}}
								inputFormat={"yyyy-MM-dd"}
								mask={"____-__-__"}
								renderInput={(params) => <TextField {...params} variant="standard"
								                                    sx={{mb: 1, mx: 1, width: 120}} size={"small"}/>}
							/>
							<DatePicker
								label="End Date"
								value={endDate}
								onChange={(newValue) => {
									setEndDate(newValue);
								}}
								inputFormat={"yyyy-MM-dd"}
								mask={"____-__-__"}
								renderInput={(params) =>
									<TextField {...params} variant="standard" sx={{mb: 1, mx: 1, width: 120}}
									           size={"small"}/>}
							/>
						</LocalizationProvider>
						<Button variant="contained" color="secondary" startIcon={<CalendarMonthIcon/>}
						        sx={{mt: "5px", mx: 1, mb: "10px"}} onClick={thisYear}
						>
							올해
						</Button>
						<Button variant="contained" color="secondary" startIcon={<SearchIcon/>}
						        sx={{mt: "5px", mx: 1, mb: "10px"}} >
							조회
						</Button>
					</div>
				</div>
				<MainCard
					content={false}
					title="전표"
					sx={{
						'&MuiCard-root': {color: theme.palette.text.primary}
					}}
				>
					{/* table data grid */}
					<Box
						sx={{
							height: 300,
							width: '100%',
							'& .MuiDataGrid-root': {
								border: 'none',
								'& .MuiDataGrid-cell': {
									borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								},
								'& .MuiDataGrid-columnsContainer': {
									color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
									borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								},
								'& .MuiDataGrid-columnSeparator': {
									color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}
							}
						}}
					>
						<DataGrid rows={slipRows} columns={slipColumns} pageSize={5} rowsPerPageOptions={[5]}/>
					</Box>
				</MainCard>
			</Grid>
		</Grid>
	);
}
