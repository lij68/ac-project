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
	{field: 'number', headerName: '번호', width: 250},
	{field: 'accountName', headerName: '계정명', width: 250},
	{field: 'currentAmount', headerName: '당기합계금액', width: 250},
	{field: 'previousAmount', headerName: '전기합계금액', width: 250}
];

//table data
const slipRows = [
	{
		id: 1,
		number: 'Snow',
		accountName: 'Jon',
		currentAmount: 35,
		previousAmount: 'asdf'
	}
];

// ==============================|| 손익계산서 ||============================== //

export default function IncomeStatementForm() {
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
