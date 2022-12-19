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
//전표칼럼
const slipColumns = [
	{field: 'id', headerName: 'ID', width: 200, hide: true},
	{field: 'date', headerName: '일자', width: 250},
	{field: 'debitAccount', headerName: '차변계정', width: 150},
	{field: 'debitAmount', headerName: '차변금액', width: 200},
	{field: 'creditAccount', headerName: '대변계정', width: 150},
	{field: 'creditAmount', headerName: '대변금액', width: 250},
	{field: 'workplace', headerName: '거래처', width: 200},
	{field: 'summary', headerName: '적요', width: 200}
];

//table data
//전표데이터
const slipRows = [
	{
		id: 1,
		date: 'Snow',
		debitAccount: 'Jon',
		debitAmount: 35,
		creditAccounnt: 'asdf',
		creditAmount: '적요',
		workplace: '승인대기',
		summary: 'admin'
	}
];

// ==============================|| 분개장 ||============================== //

export default function JournalForm() {
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
