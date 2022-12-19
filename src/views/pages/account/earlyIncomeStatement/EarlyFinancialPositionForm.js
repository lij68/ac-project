import * as React from "react";
import {useCallback, useState} from "react";
// material-ui
import {Box, Button, Grid} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';
//assets
import {useDispatch, useSelector} from 'store';
import {fetchEarlyFinancialList} from 'store/slices/account/earlyFinancialPosition/earlyFinancialPosition'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

// ==============================|| 전기분재무상태표 ||============================== //

export default function TableBasic() {

	const theme = useTheme();
	const dispatch = useDispatch();

	const [period, setPeriod] = useState("6");
	const periodChange = (e) => {
		setPeriod(e.target.value)
	};

	const earlyFinancialPosition = useSelector((state) => state.earlyFinancialPosition)
	const {asset, equalityAndLiabilities, summary} = earlyFinancialPosition; //state

	const searchEarlyFinancialPosition = useCallback(() => {
		dispatch(fetchEarlyFinancialList(period))
	}, [period]);

	const currencyFormatter = new Intl.NumberFormat('ko-KR', {
		style: 'currency',
		currency: 'KRW',
	});

	const wonPrice = {
		type: 'number',
		valueFormatter: ({value}) => currencyFormatter.format(value),
	};

	//자산 칼럼
	const assetColumn = [
		{field: 'accountCode', headerName: '코드', width: 100},
		{field: 'accountName', headerName: '계정과목', width: 150},
		{field: 'balanceSummary', ...wonPrice, headerName: '금액', width: 150}
	];
	//자본 및 부채 칼럼
	const equalityAndLiabilitiesColumn = [
		{field: 'accountCode', headerName: '코드', width: 100},
		{field: 'category', headerName: '구분', width: 100},
		{field: 'accountName', headerName: '계정과목', width: 100},
		{field: 'balanceSummary', ...wonPrice, headerName: '금액', width: 110}
	];
	//합계 칼럼
	const summaryColumn = [
		{field: 'accountName', headerName: '계정과목', width: 150},
		{field: 'balanceSummary', ...wonPrice, headerName: '합계', width: 140}
	];

	return (
		<>
			<div Align="center">
				<label>조회연도</label>
				<FormControl variant="standard" sx={{mt: "7px", mx: 1, minWidth: 120}}>
					<Select value={period} onChange={periodChange}>
						<MenuItem value="1">2017</MenuItem>
						<MenuItem value="2">2018</MenuItem>
						<MenuItem value="3">2019</MenuItem>
						<MenuItem value="4">2020</MenuItem>
						<MenuItem value="5">2021</MenuItem>
						<MenuItem value="6">2022</MenuItem>
					</Select>
				</FormControl>
				<Button variant="contained" color="secondary" startIcon={<SearchIcon/>}
				        sx={{mx: 1, mb: "10px"}} onClick={searchEarlyFinancialPosition}>
					전기분 재무상태 조회
				</Button>
			</div>
			<Grid container spacing={gridSpacing}>
				<Grid item sm={4}>
					<MainCard content={false} title="자산">
						<Box
							sx={{
								height: 700,
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
							<DataGrid rows={asset} columns={assetColumn} hideFooter
							          getRowId={(row) => row.accountCode}/>
						</Box>
					</MainCard>
				</Grid>
				<Grid item sm={4}>
					<MainCard content={false} title="자본 및 부채">
						<Box
							sx={{
								height: 700,
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
							<DataGrid rows={equalityAndLiabilities} columns={equalityAndLiabilitiesColumn} hideFooter
							          getRowId={(row) => row.accountName}/>
						</Box>
					</MainCard>
				</Grid>
				<Grid item sm={4}>
					<MainCard content={false} title="합계">
						<Box
							sx={{
								height: 700,
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
							<DataGrid rows={summary} columns={summaryColumn} hideFooter
							          getRowId={(row) => row.accountName}/>
						</Box>
					</MainCard>
				</Grid>
			</Grid>
		</>
	);
}
