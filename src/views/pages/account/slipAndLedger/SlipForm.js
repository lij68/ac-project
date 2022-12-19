import React, {useCallback, useState} from 'react';
// material-ui
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';
// assets
import {useDispatch, useSelector} from 'store';
import {
	fetchJournalDetailList,
	fetchJournalList,
	fetchSlipList
} from 'store/slices/account/slipAndLedger/slipAndJournal'

//Columns
//전표칼럼
const slipColumns = [
	{field: 'slipNo', headerName: '전표번호', width: 250},
	{field: 'accountPeriodNo', headerName: '기수', width: 150},
	{field: 'deptCode', headerName: '부서코드', width: 200},
	{field: 'slipType', headerName: '구분', width: 150},
	{field: 'expenseReport', headerName: '적요', width: 200},
	{field: 'slipStatus', headerName: '승인상태', width: 200},
	{field: 'reportingEmpCode', headerName: '작성자코드', width: 200},
	{field: 'reportingDate', headerName: '작성일', width: 130}
];
//분개칼럼
const journalColumns = [
	{field: 'journalNo', headerName: '분개번호', width: 250},
	{field: 'gubun', headerName: '구분', width: 150},
	{field: 'accountCode', headerName: '계정코드', width: 200},
	{field: 'accountName', headerName: '계정과목', width: 150},
	{field: 'debit', headerName: '차변', width: 200},
	{field: 'credit', headerName: '대변', width: 200},
	{field: 'workplace', headerName: '거래처', width: 200},
	{field: 'status', headerName: '상태', width: 180}
];
//분개상세칼럼
const journalDetailColumns = [
	{field: 'accountControlType', headerName: '계정 설정 속성', width: 250},
	{field: 'journalDetailNo', headerName: '분개 상세 번호', width: 250},
	{field: 'accountControlName', headerName: '분개 상세 항목', width: 250},
	{field: 'accountControlCode', headerName: '분개 상세 내용', width: 250}
];

// ==============================|| 일반전표 ||============================== //

const SlipForm = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	//날짜 설정
	const year = new Date().getFullYear()
	const month = new Date().getMonth() + 1
	const today = year + "-" + month + "-" + new Date().getDate()
	const yearFirst = year + '-01-01'
	const yearLast = year + '-12-31'
	const monthFirst = year + '-' + month + '-01'

	const [startDate, setStartDate] = useState(monthFirst)
	const [endDate, setEndDate] = useState(today)
	const [slip, setSlip] = useState("승인여부")

	const slipStatusChange = (e) => {
		setSlip(e.target.value)
	};

	const thisYear = () => {
		setStartDate(yearFirst)
		setEndDate(yearLast)
	};

	const slipAndJournal = useSelector((state) => state.slipAndJournal)
	const {journalStatus, slipList, journalList, journalDetailList} = slipAndJournal; //state

	//전표 조회
	const searchSlip = useCallback(() => {
		dispatch(fetchSlipList(startDate, endDate, slip))
	}, [startDate, endDate, slip]);
	//분개 조회
	const searchJournal = useCallback((e) => {
		dispatch(fetchJournalList(e.id))
	}, [journalList]);
	//분개상세 조회
	const searchJournalDetail = useCallback((e) => {
		dispatch(fetchJournalDetailList(e.id))
	}, [journalDetailList]);

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
						<FormControl variant="standard" sx={{mt: "13px", mx: 1, minWidth: 120}}>
							<Select value={slip} onChange={slipStatusChange}>
								<MenuItem value="승인여부">전체</MenuItem>
								<MenuItem value="작성중">미결</MenuItem>
								<MenuItem value="작성중(반려)">반려</MenuItem>
								<MenuItem value="승인완료">승인</MenuItem>
							</Select>
						</FormControl>
						<Button variant="contained" color="secondary" startIcon={<CalendarMonthIcon/>}
						        sx={{mt: "5px", mx: 1, mb: "10px"}} onClick={thisYear}
						>
							올해
						</Button>
						<Button variant="contained" color="secondary" startIcon={<SearchIcon/>}
						        sx={{mt: "5px", mx: 1, mb: "10px"}} onClick={searchSlip}>
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
					secondary={<Grid container spacing={1}>
						<Grid item>
							<Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>}>추가</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}>삭제</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" color="secondary" startIcon={<SaveIcon/>}>저장</Button>
						</Grid>
					</Grid>}
				>
					{/* table data grid */}
					<Box
						sx={{
							height: 500, width: '100%', '& .MuiDataGrid-root': {
								border: 'none', '& .MuiDataGrid-cell': {
									borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}, '& .MuiDataGrid-columnsContainer': {
									color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
									borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}, '& .MuiDataGrid-columnSeparator': {
									color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}
							}
						}}
					>
						<DataGrid rows={slipList} columns={slipColumns} checkboxSelection
						          onCellDoubleClick={searchJournal} getRowId={(row) => row.slipNo}/>
					</Box>
				</MainCard>
				<MainCard
					content={false}
					title="분개"
					secondary={<Grid container spacing={1}>
						<Grid item>
							<Button variant="contained" color="secondary" disabled={journalStatus}>발주/납품 마감신청</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" color="secondary" disabled={journalStatus}>분개추가</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" color="secondary">분개삭제</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" color="secondary">분개저장</Button>
						</Grid>
					</Grid>}
				>
					{/* table data grid */}
					<Box
						sx={{
							height: 300, width: '100%', '& .MuiDataGrid-root': {
								border: 'none', '& .MuiDataGrid-cell': {
									borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}, '& .MuiDataGrid-columnsContainer': {
									color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
									borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}, '& .MuiDataGrid-columnSeparator': {
									color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}
							}
						}}
					>
						<DataGrid rows={journalList} columns={journalColumns} checkboxSelection hideFooter
						          getRowId={(row) => row.journalNo} onCellDoubleClick={searchJournalDetail}/>
					</Box>
				</MainCard>
				<MainCard
					content={false}
					title="분개상세"
					secondary={<Grid item>
						<Button variant="contained" color="secondary">분개상세 저장</Button>
					</Grid>}
				>
					{/* table data grid */}
					<Box
						sx={{
							height: 300, width: '100%', '& .MuiDataGrid-root': {
								border: 'none', '& .MuiDataGrid-cell': {
									borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}, '& .MuiDataGrid-columnsContainer': {
									color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
									borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}, '& .MuiDataGrid-columnSeparator': {
									color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
								}
							}
						}}
					>
						<DataGrid rows={journalDetailList} columns={journalDetailColumns} hideFooter getRowId={(row) => row.journalDetailNo}/>
					</Box>
				</MainCard>
			</Grid>
		</Grid>
	);
}

export default React.memo(SlipForm);