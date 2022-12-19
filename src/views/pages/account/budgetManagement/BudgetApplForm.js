import * as React from "react";
import {useState} from "react";
// material-ui
import {Box, Button, CardContent, Divider, Grid, IconButton, Modal, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import {useDispatch} from 'store';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SubCard from "../../../../ui-component/cards/SubCard";
import CloseIcon from "@mui/icons-material/Close";
import ApprovalIcon from '@mui/icons-material/Approval';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';

//계정 칼럼
const assetColumn = [
	{field: 'accountCode', headerName: '코드', width: 140},
	{field: 'accountName', headerName: '계정과목', width: 150}
];
//계정상세 칼럼
const equalityAndLiabilitiesColumn = [
	{field: 'accountCode', headerName: '코드', width: 120},
	{field: 'category', headerName: '구분', width: 80},
	{field: 'accountName', headerName: '계정과목', width: 150}
];

// ==============================|| 예산신청 ||============================== //

export default function TableBasic() {
	const theme = useTheme();
	const dispatch = useDispatch();

	const [period, setPeriod] = useState("6");
	const periodChange = (e) => {
		setPeriod(e.target.value)
	};

	const [open, setOpen] = useState(false)
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
					width: 600,
					height: 607,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}
				title="사업장, 부서"
				content={false}
				secondary={
					<IconButton onClick={handleClose} size="large">
						<CloseIcon fontSize="small"/>
					</IconButton>
				}
			>
				<CardContent>
					<Box
						sx={{
							height: '100%',
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
						{/*모달창 내용 들어가는 곳*/}
					</Box>
				</CardContent>
				<Divider/>
			</MainCard>
		</div>
	));

	return (
		<>
			<div Align="center">
				<label>회계연도</label>
				<FormControl variant="standard" sx={{mx: 1, mr: 3, minWidth: 120}}>
					<Select value={period} onChange={periodChange}>
						<MenuItem value="1">2017</MenuItem>
						<MenuItem value="2">2018</MenuItem>
						<MenuItem value="3">2019</MenuItem>
						<MenuItem value="4">2020</MenuItem>
						<MenuItem value="5">2021</MenuItem>
						<MenuItem value="6">2022</MenuItem>
					</Select>
				</FormControl>
				<label>사업장</label>
				<TextField variant="standard" sx={{mb: 1, ml: 1, mr: 3, width: 120}}
				           InputProps={{
					           endAdornment:
						           <>
							           <IconButton variant="text" color="primary" sx={{mt: "-10px"}} size={"small"}
							                       onClick={handleOpen}>
								           <SearchIcon/>
							           </IconButton>
							           <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
							                  aria-describedby="simple-modal-description">
								           <Body handleClose={handleClose}/>
							           </Modal>
						           </>
				           }}/>
				<label>부서</label>
				<TextField variant="standard" sx={{mb: 1, ml: 1, width: 120}}/>
			</div>
			<Grid container spacing={gridSpacing}>
				<Grid item sm={6}>
					<MainCard
						content={false}
						sx={{mt: 2}}
					>
						{/* table data grid */}
						<Box
							sx={{
								height: 400,
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
							<DataGrid hideFooter rows={[]} columns={assetColumn}/>
						</Box>
					</MainCard>
				</Grid>
				<Grid item sm={6}>
					<MainCard
						content={false}
						sx={{mt: 2}}
					>
						{/* table data grid */}
						<Box
							sx={{
								height: 400,
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
							<DataGrid hideFooter rows={[]} columns={equalityAndLiabilitiesColumn}/>
						</Box>
					</MainCard>
				</Grid>
			</Grid>
			<MainCard
				content={false}
				title="전기 예산 신청"
				sx={{mt: 2}}
			>
				<SubCard>
					{/* table data grid */}
					<Grid
						sx={{
							height: 310,
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
									<TextField fullWidth label="1월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="2월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="3월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="1분기" variant="standard"/>
								</Grid>
							</Grid>
							<Grid container spacing={4} mb={2}>
								<Grid item xs={3}>
									<TextField fullWidth label="4월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="5월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="6월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="2분기" variant="standard"/>
								</Grid>
							</Grid>
							<Grid container spacing={4} mb={2}>
								<Grid item xs={3}>
									<TextField fullWidth label="7월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="8월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="9월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="3분기" variant="standard"/>
								</Grid>
							</Grid>
							<Grid container spacing={4} mb={2}>
								<Grid item xs={3}>
									<TextField fullWidth label="10월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="11월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="12월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="4분기" variant="standard"/>
								</Grid>
							</Grid>
							<Grid container spacing={1} mb={2}>
								<Grid item xs={3}>
									<TextField fullWidth label="합계" variant="standard"/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</SubCard>

			</MainCard>
			<MainCard
				content={false}
				title="당기 예산 신청"
				sx={{mt: 2}}
			>
				<SubCard>
					{/* table data grid */}
					<Grid
						sx={{
							height: 310,
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
									<TextField fullWidth label="1월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="2월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="3월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="1분기" variant="standard"/>
								</Grid>
							</Grid>
							<Grid container spacing={4} mb={2}>
								<Grid item xs={3}>
									<TextField fullWidth label="4월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="5월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="6월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="2분기" variant="standard"/>
								</Grid>
							</Grid>
							<Grid container spacing={4} mb={2}>
								<Grid item xs={3}>
									<TextField fullWidth label="7월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="8월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="9월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="3분기" variant="standard"/>
								</Grid>
							</Grid>
							<Grid container spacing={4} mb={2}>
								<Grid item xs={3}>
									<TextField fullWidth label="10월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="11월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="12월" variant="standard"/>
								</Grid>
								<Grid item xs={3}>
									<TextField fullWidth label="4분기" variant="standard"/>
								</Grid>
							</Grid>
							<Grid container spacing={1} mb={2}>
								<Grid item xs={3}>
									<TextField fullWidth label="합계" variant="standard"/>
								</Grid>
								<Grid item xs={9} container direction="column" alignItems="flex-end">
									<Button variant="contained" color="secondary" startIcon={<ApprovalIcon/>}>예산신청</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</SubCard>
			</MainCard>
		</>
	);
}
