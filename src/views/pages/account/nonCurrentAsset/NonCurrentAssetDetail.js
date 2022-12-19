import React, {useState} from 'react';
// material-ui
import {Box, Button, CardContent, Divider, Grid, IconButton, Modal, TextField, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

import CloseIcon from '@mui/icons-material/Close';
import {DataGrid} from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useSelector} from "../../../../store";

const columns = [
	{field: 'id', headerName: '상각월', width: 100},
	{field: 'lastName', headerName: '전월충당금이월', width: 140},
	{field: 'firstName', headerName: '당월감가상각비', width: 140},
];

// table data
const rows = [
	{id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
	{id: 2, lastName: 'Lancaster', firstName: 'Cersei', age: 42},
	{id: 3, lastName: 'Lancaster', firstName: 'Jaime', age: 45},
	{id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
	{id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
	{id: 6, lastName: 'Melisandre', firstName: null, age: 150},
	{id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
	{id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
	{id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65}
];

// ==============================|| 고정자산상세 ||============================== //

export default function NonCurrentAssetDetail() {
	const theme = useTheme();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const Body = React.forwardRef(({modalStyle, handleClose}, ref) => (
		<div ref={ref} tabIndex={-1}>
			<MainCard
				style={modalStyle}
				sx={{
					position: 'absolute',
					width: {xs: 280, lg: 450},
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}
				title="월상각내역"
				content={false}
				secondary={
					<IconButton onClick={handleClose} size="large">
						<CloseIcon fontSize="small"/>
					</IconButton>
				}
			>
				<CardContent>
					<Grid container spacing={1}>
						<Box
							sx={{
								height: 500,
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
							<DataGrid rows={rows} columns={columns} hideFooter/>
						</Box>
					</Grid>
					<Typography variant="body2" sx={{mt: 2}}>
						합계
					</Typography>
				</CardContent>
				<Divider/>
			</MainCard>
		</div>
	));

	return (
		<MainCard
			content={false}
			title="고정자산 상세"
			secondary={
				<Grid container spacing={1}>
					<Grid item>
						<Button variant="contained" color="secondary">등록</Button>
					</Grid>
					<Grid item>
						<Button variant="contained" color="secondary" onClick={handleOpen}>월상각내역</Button>
					</Grid>
					<Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
					       aria-describedby="simple-modal-description">
						<Body handleClose={handleClose}/>
					</Modal>
				</Grid>
			}
		>
			<SubCard>
				{/* table data grid */}
				<Grid
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
					<Grid item xs={12} md={10}>
						<Grid container spacing={4} mb={1}>
							<Grid item xs={3}>
								<TextField fullWidth id="outlined-basic" label="취득원가" variant="standard"/>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth id="filled-basic" label="전기말상각누계액" variant="standard"/>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth id="standard-basic" label="전기말장부가액" variant="filled" disabled/>
							</Grid>
						</Grid>
						<Grid container spacing={4} mb={2}>
							<Grid item xs={3}>
								<FormControl variant="standard" fullWidth sx={{mt: 2}}>
									<Select>
										<MenuItem value="정액법">정액법</MenuItem>
										<MenuItem value="정률법">정률법</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth id="filled-basic" label="상각완료년도" variant="filled" disabled/>
							</Grid>
						</Grid>
						<Grid container spacing={4} mb={2}>
							<Grid item xs={3}>
								<TextField fullWidth id="outlined-basic" label="내용연수" variant="standard"/>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth id="filled-basic" label="상각률" variant="filled" disabled/>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth id="standard-basic" label="월수" variant="filled" disabled/>
							</Grid>
						</Grid>
						<Grid container spacing={4} mb={2}>
							<Grid item xs={3}>
								<TextField fullWidth id="outlined-basic" label="일반상각비" variant="standard"/>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth id="filled-basic" label="전기말상각누계액감소" variant="filled" disabled/>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth id="standard-basic" label="당기말상각누계액" variant="filled" disabled/>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth id="standard-basic" label="당기말장부가액" variant="filled" disabled/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</SubCard>
		</MainCard>
	);
}