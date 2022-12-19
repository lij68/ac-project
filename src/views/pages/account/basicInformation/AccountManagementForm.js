import React, {useCallback, useEffect, useState} from 'react';

// material-ui
import {Box, Button, CardContent, Divider, Grid, IconButton, InputLabel, Modal, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useTheme} from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import {gridSpacing} from 'store/constant';
import {useDispatch, useSelector} from 'store';
import {
	fetchAccountDetailList,
	fetchAccountList,
	fetchNewAccountList,
	fetchDeleteAccountList
} from 'store/slices/account/baseInformation/accountManagement'
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const accountColums = [
	{field: 'accountInnerCode', headerName: '계정코드', width: 180},
	{field: 'accountName', headerName: '계정명', width: 180}
];

const accountDetailcolums = [
	{field: 'accountInnerCode', headerName: '계정과목코드', width: 200},
	{field: 'accountInnerName', headerName: '계정과목명', width: 200},
	{field: 'groupCode', headerName: '그룹명', width: 155}
];

// ==============================|| 계정과목관리 ||============================== //

const Body = React.forwardRef(({
	                               modalStyle,
	                               handleClose,
	                               parentAccountInnercode,
	                               accountName,
	                               accountInnerCode,
	                               accountInnerName,
	                               accountDivision,
	                               groupCode,
	                               accountInnerCodeChange,
	                               accountInnerNameChange,
	                               divisionChange,
	                               registNewAccount
                               }, ref) => (
	<div ref={ref} tabIndex={-1}>
		<MainCard
			style={modalStyle}
			sx={{
				position: 'absolute',
				width: 500,
				height: 430,
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)'
			}}
			title="계정과목 추가"
			content={false}
			secondary={
				<IconButton onClick={handleClose} size="large">
					<CloseIcon fontSize="small"/>
				</IconButton>
			}
		>
			<CardContent>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={12} lg={6}>
							<InputLabel>계정 코드</InputLabel>
							<TextField fullWidth disabled value={parentAccountInnercode}/>
						</Grid>
						<Grid item xs={12} lg={6}>
							<InputLabel>계정명</InputLabel>
							<TextField fullWidth disabled value={accountInnerName}/>
						</Grid>
						<Grid item xs={12} lg={6}>
							<InputLabel>계정과목 코드</InputLabel>
							<TextField fullWidth onChange={accountInnerCodeChange} value={accountInnerCode}/>
						</Grid>
						<Grid item xs={12} lg={6}>
							<InputLabel>계정과목명</InputLabel>
							<TextField fullWidth onChange={accountInnerNameChange} value={accountName}/>
						</Grid>
						<Grid item xs={12} lg={6}>
							<InputLabel>대차구분</InputLabel>
							<FormControl sx={{minWidth: 218}}>
								<Select value={accountDivision} onChange={divisionChange}>
									<MenuItem value="대변">대변</MenuItem>
									<MenuItem value="차변">차변</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} lg={6}>
							<InputLabel>그룹명</InputLabel>
							<TextField fullWidth disabled value={groupCode}/>
						</Grid>
						<Grid item container direction="column" alignItems="flex-end">
							<Button variant="contained" color="secondary" startIcon={<SaveIcon/>}
							        onClick={registNewAccount}>저장</Button>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<Divider/>
		</MainCard>
	</div>
));

export default function AccountManagementForm() {
	const theme = useTheme();
	const dispatch = useDispatch();

	const [parentAccountCode, setParentAccountCode] = useState('');
	const [open, setOpen] = useState(false)
	const [newAccount, setNewAccount] = useState({
		accountInnerCode: "",
		parentAccountInnercode: "",
		accountCode: "",
		accountCharacter: "",
		accountName: "",
		accountUseCheck: "",
		accountDivision: "",
		accountDescription: "",
		groupCode: "",
		editable: "",
		accountInnerName: ""
	})
	const [selectAccount, setSelectAccount] = useState([])

	//계정과목 추가할때 계정과목코드 설정하는 함수
	const accountInnerCodeChange = e => {
		setNewAccount({
			...newAccount,
			accountInnerCode: e.target.value,
			accountCode: e.target.value
		})
	}

	//계정과목 추가할때 계정과목명 설정하는 함수
	const accountInnerNameChange = e => {
		setNewAccount({
			...newAccount,
			accountName: e.target.value
		});
	};
	//계정과목 추가할때 대차구분 설정하는 함수
	const divisionChange = e => {
		const {value} = e.target;
		setNewAccount({
			...newAccount,
			accountDivision: value
		});
	}

	const accountManagement = useSelector((state) => state.accountManagement)
	const {accountList, accountDetailList, accountStatus} = accountManagement;

	//계정 조회 함수
	useEffect(() => {
		dispatch(fetchAccountList())
	}, [])

	//계정과목 조회 함수
	const accountDetail = useCallback((e) => {
		setParentAccountCode(e.id);
		dispatch(fetchAccountDetailList(e.id))
	});

	//모달창 여는 함수
	const handleOpen = () => {
		setOpen(true);
		dispatch(fetchAccountList())
		setNewAccount({
			...newAccount,
			parentAccountInnercode: accountDetailList[0].parentAccountInnercode,
			groupCode: accountDetailList[0].groupCode,
			accountInnerName: accountDetailList[0].accountName
		})
	};
	//모달창 닫는 함수
	const handleClose = () => {
		setOpen(false);
	};

	//계정과목 등록 함수
	const registNewAccount = useCallback(() => {
		setOpen(false);
		dispatch(fetchNewAccountList(newAccount))
		setNewAccount({
			accountInnerCode: "",
			parentAccountInnercode: "",
			accountCode: "",
			accountCharacter: "",
			accountName: "",
			accountUseCheck: "",
			accountDivision: "",
			accountDescription: "",
			groupCode: "",
			editable: "",
			accountInnerName: ""
		})
	})

	//계정과목 삭제 함수
	const onDeleteAccount = () => {
		console.log(selectAccount)
		dispatch(fetchDeleteAccountList(selectAccount, parentAccountCode))
	};

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item sm={4}>
				<MainCard
					content={false}
					title="계정"
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
						<DataGrid rows={accountList} columns={accountColums} hideFooter
						          getRowId={(row) => row.accountInnerCode} onCellClick={accountDetail}
						/>
					</Box>
				</MainCard>
			</Grid>
			<Grid item sm={8}>
				<MainCard
					content={false}
					title="계정과목"
					secondary={
						<Grid container spacing={1}>
							<Grid item>
								<Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>}
								        onClick={handleOpen} disabled={accountStatus}>추가</Button>
								<Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
								       aria-describedby="simple-modal-description">
									<Body handleClose={handleClose}
									      parentAccountInnercode={newAccount.parentAccountInnercode}
									      accountName={newAccount.accountName}
									      accountInnerCode={newAccount.accountInnerCode}
									      accountInnerName={newAccount.accountInnerName}
									      accountDivision={newAccount.accountDivision}
									      groupCode={newAccount.groupCode}
									      accountInnerCodeChange={accountInnerCodeChange}
									      accountInnerNameChange={accountInnerNameChange}
									      divisionChange={divisionChange}
									      registNewAccount={registNewAccount}
									/>
								</Modal>
							</Grid>
							<Grid item>
								<Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}
								        onClick={onDeleteAccount}>삭제</Button>
							</Grid>
						</Grid>
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
						<DataGrid rows={accountDetailList} columns={accountDetailcolums} checkboxSelection hideFooter
						          getRowId={(row) => row.accountInnerCode}
						          onSelectionModelChange={(ids) => {
							          setSelectAccount(ids)
						          }}
						/>
					</Box>
				</MainCard>
			</Grid>
		</Grid>
	);
}
