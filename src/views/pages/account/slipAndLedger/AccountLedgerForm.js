// material-ui
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
// material-ui
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';
import SearchIcon from "@mui/icons-material/Search";
import React, {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const columns1 = [
	{field: 'id', headerName: 'ID', width: 130, hide: true},
	{field: 'accountCode', headerName: '계정코드', width: 250},
	{field: 'accountName', headerName: '계정명', width: 250}
];

const columns2 = [
	{field: 'id', headerName: 'ID', width: 140, hide: true},
	{field: 'date', headerName: '작성일자', width: 250,},
	{field: 'debit', headerName: '차변', width: 250},
	{field: 'credit', headerName: '대변', width: 250},
	{field: 'remain', headerName: '잔액금', width: 250}
];

// table data
const rows1 = [
	{id: 1, accountCode: 'Snow', accountName: 'Jon'}
];
const rows2 = [
	{id: 1, date: 'Snow', debit: 'Jon', credit: 35, remain: '1700'}
];

// ==============================|| 계정별원장 ||============================== //

export default function TableBasic() {
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
			<Grid item sm={4}>
				<MainCard
					content={false}
					title="계정찾기"
					secondary={
						<div Align="center">
							<div>
								<TextField id="startDate" variant={"standard"} sx={{mx: 1, width: 130}}
								           placeholder={"계정코드"}/>
								<Button variant="contained" color="secondary" startIcon={<SearchIcon/>}
								        sx={{mx: 1, mb: "10px"}}>검색</Button>
							</div>
						</div>}
				>
					{/* table data grid */}
					<Box
						sx={{
							height: 800,
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
						<DataGrid rows={rows1} columns={columns1}/>
					</Box>
				</MainCard>
			</Grid>
			<Grid item sm={8}>
				<MainCard
					content={false}
					title="계정별 원장 출력기간"
					secondary={
						<div Align="center">
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
									                                    sx={{mb: 1, mx: 1, width: 120}}
									                                    size={"small"}/>}
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
							        sx={{mt: "5px", mx: 1, mb: "10px"}}>
								조회
							</Button>
						</div>
					}
				>
					<Box
						sx={{
							height: 800,
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
						<DataGrid rows={rows2} columns={columns2}/>
					</Box>
				</MainCard>
			</Grid>
		</Grid>
	);
}
