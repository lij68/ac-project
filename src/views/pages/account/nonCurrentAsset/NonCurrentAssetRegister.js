import React, {useState, useCallback} from 'react'
// material-ui
import {Box, Button, CardContent, Divider, Grid, IconButton, Modal} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {fetchAccountList ,fetchNonCurrentAssetList} from "store/slices/account/nonCurrentAsset/nonCurrentAsset";
import {useDispatch, useSelector} from 'store';

const columns = [
	{field: 'accountCode', headerName: '계정코드', width: 200},
	{field: 'accountName', headerName: '계정명', width: 200},
	{field: 'assetItemCode', headerName: '자산코드', width: 200},
	{field: 'assetItemName', headerName: '자산명', width: 200, editable: true},
	{field: 'acquisitionDate', headerName: '취득일', width: 200, editable: true, type: 'date'},
	{field: 'managementDeptName', headerName: '처리부서명', width: 140}
];
const accountColumns = [
	{field: 'accountCode', headerName: '계정코드', width: 150},
	{field: 'accountName', headerName: '계정명', width: 180}
];

// ==============================|| 고정자산등록 ||============================== //

export default function NonCurrentAssetRegister() {
	const theme = useTheme();
	const dispatch = useDispatch();

	const nonCurrentAsset = useSelector((state) => state.nonCurrentAsset)
	const {accountList,nonCurrentAssetList} = nonCurrentAsset;

	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true);
		dispatch(fetchAccountList())
	};
	const handleClose = () => {
		setOpen(false);
	};

	const selectNonCurrentAsset = useCallback((e) => {
		dispatch(fetchNonCurrentAssetList(e.id))
		handleClose()
	},[open])

	//모달창
	const Body = React.forwardRef(({modalStyle, handleClose}, ref) => (
		<div ref={ref} tabIndex={-1}>
			<MainCard
				style={modalStyle}
				sx={{
					position: 'absolute',
					width: 400,
					height: 535,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}
				title="계정과목"
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
						<DataGrid rows={accountList} columns={accountColumns} hideFooter getRowId={(row) => row.accountCode} onCellDoubleClick={selectNonCurrentAsset}/>
					</Box>
				</CardContent>
				<Divider/>
			</MainCard>
		</div>
	));

	return (
		<MainCard
			content={false}
			title="고정자산"
			secondary={
				<Grid container spacing={1}>
					<Grid item>
						<Button variant="contained" color="secondary" startIcon={<SearchIcon/>}
						        onClick={handleOpen}>조회</Button>
						<Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
						       aria-describedby="simple-modal-description">
							<Body handleClose={handleClose}/>
						</Modal>
					</Grid>
					<Grid item>
						<Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>}>추가</Button>
					</Grid>
					<Grid item>
						<Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}>삭제</Button>
					</Grid>
				</Grid>
			}
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
				<DataGrid rows={nonCurrentAssetList} columns={columns} hideFooter getRowId={(row) => row.assetItemCode}/>
			</Box>
		</MainCard>
	);
}
