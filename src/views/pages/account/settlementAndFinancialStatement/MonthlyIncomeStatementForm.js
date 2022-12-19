import React from 'react';
// material-ui
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';

//Columns
const slipColumns = [
	{field: 'id', headerName: 'ID', width: 200, hide: true},
	{field: 'year', headerName: '연도', width: 110},
	{field: 'revenue', headerName: '매출액', width: 110},
	{field: 'salesCost', headerName: '매출원가', width: 110},
	{field: 'totalSales', headerName: '매출총액', width: 110},
	{field: 'operatingExpense', headerName: '판관비', width: 110},
	{field: 'operatingProfit', headerName: '영업이익', width: 110},
	{field: 'otherRevenues', headerName: '영업외수익', width: 110},
	{field: 'nonOperatingExpense', headerName: '영업외비용', width: 110},
	{field: 'earningBeforeTax', headerName: '법인세차감전이익', width: 110},
	{field: 'corporateTax', headerName: '법인세', width: 110},
	{field: 'netIncome', headerName: '당기순이익', width: 110},
];

//table data
const slipRows = [
	{
		id: 1,
		year: 'Snow',
		revenue: 'Jon',
		salesCost: 'asdf',
		totalSales: 'asdf',
		operatingExpense: 'asdf',
		operatingProfit: 'asdf',
		otherRevenues: 'asdf',
		nonOperatingExpense: 'asdf',
		earningBeforeTax: 'asdf',
		corporateTax: 'asdf',
		netIncome: 'asdf'
	}
];

// ==============================|| 월별손익계산서 ||============================== //

export default function MonthlyIncomeStatementForm() {
	const theme = useTheme();

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item xs={12}>
				<div Align="center">
					<Typography variant="h3">[ 검색조건 ]</Typography>
					<div>
						<TextField id="startDate" type={"date"} variant={"standard"} sx={{mx: 1}}/>
						<Button variant="contained" color="secondary" startIcon={<SearchIcon/>}
						        sx={{mx: 1, mb: "10px"}}>조회</Button>
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
