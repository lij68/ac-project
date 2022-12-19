//예산실적현황
import * as React from "react";
// material-ui
import {Box, CardContent, Divider, Grid, IconButton, Modal, TextField} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useDispatch} from 'store';
import SubCard from "../../../../ui-component/cards/SubCard";
// project imports
import MainCard from 'ui-component/cards/MainCard';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";

const columns = [
	{id: 'accountInnerCode', label: '계정과목코드', minWidth: 150},
	{id: 'accountName', label: '계정과목', minWidth: 150},
	{id: 'annualBudgetRecord', label: '실적', minWidth: 100},
	{id: 'annualBudget', label: '예산', minWidth: 100},
	{id: 'remainingBudget', label: '잔여예산', minWidth: 100},
	{id: 'budgetExecRatio', label: '집행율(%)', minWidth: 100},
	{id: 'monthBudgetRecord', label: '실적', minWidth: 100},
	{id: 'monthBudget', label: '예산', minWidth: 100},
	{id: 'remainingMonthBudget', label: '잔여예산', minWidth: 100},
	{id: 'monthBudgetExecRatio', label: '집행율(%)', minWidth: 100},
];

const rows = [{
	accountInnerCode: '12314',
	accountName: '1432',
	annualBudgetRecord: 'A1231',
	annualBudget: '124315',
	remainingBudget: 'asdfhl',
	budgetExecRatio: '대기',
	monthBudgetRecord: '0sdf0',
	monthBudget: '2022-10-17',
	remainingMonthBudget: '123213',
	monthBudgetExecRatio:'12uh34'
}];

// ==============================|| 예산실적현황 ||============================== //

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
			<MainCard
				content={false}
				sx={{mt: 2}}
			>
				<SubCard>
					{/* table data grid */}
					<Grid
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
						<Paper sx={{width: '100%'}}>
							<TableContainer sx={{height: 400}}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell colSpan={2} align={"left"}></TableCell>
											<TableCell colSpan={4}>누계예산대비실적</TableCell>
											<TableCell colSpan={4} align={"left"}>당월예산대비실적</TableCell>
										</TableRow>
										<TableRow>
											{columns.map((column) => (
												<TableCell
													key={column.id}
													align={"left"}
													style={{top: 57, minWidth: column.minWidth}}
												>
													{column.label}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{rows
											.map((row) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
														{columns.map((column) => {
															const value = row[column.id];
															return (
																<TableCell key={column.id} align={"left"}>
																	{column.format && typeof value === 'number'
																		? column.format(value)
																		: value}
																</TableCell>
															);
														})}
													</TableRow>
												);
											})}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Grid>
				</SubCard>
			</MainCard>
			<MainCard
				content={false}
				sx={{mt: 2}}
			>
				<SubCard>
					{/* table data grid */}
					<Grid
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
						<Paper sx={{width: '100%'}}>
							<TableContainer sx={{height: 400}}>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell colSpan={2} align={"left"}></TableCell>
											<TableCell colSpan={4}>누계예산대비실적</TableCell>
											<TableCell colSpan={4} align={"left"}>당월예산대비실적</TableCell>
										</TableRow>
										<TableRow>
											{columns.map((column) => (
												<TableCell
													key={column.id}
													align={"left"}
													style={{top: 57, minWidth: column.minWidth}}
												>
													{column.label}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{rows
											.map((row) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
														{columns.map((column) => {
															const value = row[column.id];
															return (
																<TableCell key={column.id} align={"left"}>
																	{column.format && typeof value === 'number'
																		? column.format(value)
																		: value}
																</TableCell>
															);
														})}
													</TableRow>
												);
											})}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Grid>
				</SubCard>
			</MainCard>
		</>
	);
}
