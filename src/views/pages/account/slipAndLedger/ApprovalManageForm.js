import React, {useState} from 'react';
// material-ui
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import ApprovalIcon from '@mui/icons-material/Approval';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import CallMissedIcon from '@mui/icons-material/CallMissed';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

//Columns
//전표칼럼
const slipColumns = [
	{field: 'id', headerName: 'ID', width: 200, hide: true},
	{field: 'slipNo', headerName: '전표일련번호', width: 250},
	{field: 'accountPeriodNo', headerName: '기수일련번호', width: 150},
	{field: 'slipType', headerName: '전표유형', width: 200},
	{field: 'reportingDate', headerName: '작성날짜', width: 150},
	{field: 'reportingEmpCode', headerName: '작성자명', width: 250},
	{field: 'expenseReport', headerName: '품의내역', width: 200},
	{field: 'approvalDate', headerName: '승인날짜', width: 200},
	{field: 'approvalEmpCode', headerName: '승인자', width: 130},
	{field: 'slipStatus', headerName: '승인상태', width: 130}
];
//분개칼럼
const indignationColumns = [
	{field: 'id', headerName: 'ID', width: 250, hide: true},
	{field: 'indignationNum', headerName: '분개일련번호', width: 250},
	{field: 'accountCode', headerName: '계정코드', width: 200},
	{field: 'accountName', headerName: '계정명', width: 200},
	{field: 'debitOrCredit', headerName: '대차구분', width: 200},
	{field: 'summary', headerName: '적요', width: 200},
	{field: 'workplaceCode', headerName: '거래처코드', width: 200},
	{field: 'workplaceName', headerName: '거래처명', width: 200},
	{field: 'amount', headerName: '금액', width: 180}
];

//table data
//전표데이터
const slipRows = [
	{
		id: 1,
		slipNum: 'Snow',
		gisuNum: 'Jon',
		type: 35,
		writeDate: 'asdf',
		writer: 'qwer',
		productDetail: '적요',
		approvalDate: '승인대기',
		approver: 'admin',
		status: '2022-10-13'
	}
];
//분개데이터
const indignationRows = [
	{
		id: 1,
		indignationNum: 'Snow',
		accountCode: 'Jon',
		accountName: 'adsfasdf',
		debitOrCredit: '대차변',
		summary: '적요',
		workplaceCode: '거래처코드',
		workplaceName: '거래처명',
		amount: '금액'
	}
];

// ==============================|| 전표승인해제 ||============================== //

export default function ApprovalManageForm() {
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
					secondary={
						<Grid container spacing={1}>
							<Grid item>
								<Button variant="contained" color="secondary" startIcon={<ApprovalIcon/>}>전표승인</Button>
							</Grid>
							<Grid item>
								<Button variant="contained" color="secondary" startIcon={<CallMissedIcon/>}>반려</Button>
							</Grid>
							<Grid item>
								<Button variant="contained" color="secondary" startIcon={<RefreshIcon/>}>초기화</Button>
							</Grid>
						</Grid>
					}
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
						<DataGrid hideFooter rows={slipRows} columns={slipColumns}/>
					</Box>
				</MainCard>
				<MainCard
					content={false}
					title="분개"
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
						<DataGrid hideFooter rows={indignationRows} columns={indignationColumns}/>
					</Box>
				</MainCard>
			</Grid>
		</Grid>
	);
}
