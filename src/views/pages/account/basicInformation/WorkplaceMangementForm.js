import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
// project imports
import {useDispatch, useSelector} from 'store';
import {fetchWorkplace, fetchBusiness, fetchCreditCard} from 'store/slices/account/baseInformation/workplaceManagement'
// material-ui
import {styled, useTheme} from '@mui/material/styles';
import {
	Box,
	Button,
	Grid,
	Tab,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Typography
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import CreditCard from '@mui/icons-material/CreditCard';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

// tab content
function TabPanel({children, value, index, ...other}) {
	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
		     aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{p: 3}}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

// styles
const StyledTableCell = styled(TableCell)(({theme}) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.grey[200],
		color: theme.palette.common.black
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

// ==============================|| 거래처관리 ||============================== //

export default function WorkplaceMangement() {
	const theme = useTheme();
	const dispatch = useDispatch();

	const workplaceManagement = useSelector((state) => state.workplaceManagement)
	const {workplaceList, businessList, creditcardList} = workplaceManagement

	useEffect(() => {
		dispatch(fetchWorkplace())
		dispatch(fetchBusiness())
		dispatch(fetchCreditCard())
	}, [])

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<MainCard>
			<Grid item xs={12}>
				<Tabs
					value={value}
					variant="scrollable"
					onChange={handleChange}
					textColor="secondary"
					indicatorColor="secondary"
					sx={{
						mb: 3,
						'& a': {
							minHeight: 'auto',
							minWidth: 10,
							py: 1.6,
							px: 1,
							mr: 2.2,
							color: theme.palette.grey[600],
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center'
						},
						'& a.Mui-selected': {
							color: theme.palette.secondary.main
						},
						'& a > svg': {
							mb: '0px !important',
							mr: 1.1
						}
					}}
				>
					<Tab
						component={Link}
						to="#"
						icon={<PersonOutlineTwoToneIcon sx={{fontSize: '1.3rem'}}/>}
						label="일반거래처"
						{...a11yProps(0)}
					/>
					<Tab
						component={Link}
						to="#"
						icon={<RecentActorsTwoToneIcon sx={{fontSize: '1.3rem'}}/>}
						label="금융거래처"
						{...a11yProps(1)}
					/>
					<Tab
						component={Link}
						to="#"
						icon={<CreditCard sx={{fontSize: '1.3rem'}}/>}
						label="신용카드"
						{...a11yProps(2)}
					/>
				</Tabs>
				<div Align="center">
					<div>
						<Button variant="contained" color="secondary" startIcon={<AddCircleIcon/>}
						        sx={{mx: 1, mb: "1px"}}>추가</Button>
						<Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}
						        sx={{mx: 1, mb: "1px"}}>삭제</Button>
						<Button variant="contained" color="secondary" startIcon={<SaveIcon/>}
						        sx={{mx: 1, mb: "1px"}}>저장</Button>
					</div>
				</div>
				<TabPanel value={value} index={0}>
					<Grid item xs={12}>
						{/* table */}
						<TableContainer>
							<Table sx={{minWidth: 350}} aria-label="simple table">
								<TableHead>
									<TableRow>
										<StyledTableCell align="center">거래처 코드</StyledTableCell>
										<StyledTableCell align="center">거래처명</StyledTableCell>
										<StyledTableCell align="center">거래처 전화번호</StyledTableCell>
										<StyledTableCell align="center">사업자번호</StyledTableCell>
										<StyledTableCell align="center">종목</StyledTableCell>
										<StyledTableCell align="center">유형</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{workplaceList.map((row) => (
										<TableRow hover>
											<TableCell align="center">{row.workplaceCode}</TableCell>
											<TableCell align="center">{row.workplaceName}</TableCell>
											<TableCell align="center">{row.workplaceTelNumber}</TableCell>
											<TableCell align="center">{row.corporationLicence}</TableCell>
											<TableCell align="center">{row.businessItems}</TableCell>
											<TableCell align="center">{row.businessConditions}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Grid item xs={12}>
						{/* table */}
						<TableContainer>
							<Table sx={{minWidth: 350}} aria-label="simple table">
								<TableHead>
									<TableRow>
										<StyledTableCell align="center">금융거래처 코드</StyledTableCell>
										<StyledTableCell align="center">금융거래처명</StyledTableCell>
										<StyledTableCell align="center">사업장코드</StyledTableCell>
										<StyledTableCell align="center">금융기관코드</StyledTableCell>
										<StyledTableCell align="center">금융기관명</StyledTableCell>
										<StyledTableCell align="center">계좌번호</StyledTableCell>
										<StyledTableCell align="center">유형</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{businessList.map((row) => (
										<TableRow hover>
											<TableCell align="center">{row.accountAssociatesCode}</TableCell>
											<TableCell align="center">{row.accountAssociatesName}</TableCell>
											<TableCell align="center">{row.workplaceCode}</TableCell>
											<TableCell align="center">{row.financialInstituteCode}</TableCell>
											<TableCell align="center">{row.financialInstituteName}</TableCell>
											<TableCell align="center">{row.accountNumber}</TableCell>
											<TableCell align="center">{row.divisionCode}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Grid item xs={12}>
						{/* table */}
						<TableContainer>
							<Table sx={{minWidth: 350}} aria-label="simple table">
								<TableHead>
									<TableRow>
										<StyledTableCell align="center">카드 회원명</StyledTableCell>
										<StyledTableCell align="center">거래처코드</StyledTableCell>
										<StyledTableCell align="center">거래처명</StyledTableCell>
										<StyledTableCell align="center">가맹점 번호</StyledTableCell>
										<StyledTableCell align="center">카드번호</StyledTableCell>
										<StyledTableCell align="center">유형</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{creditcardList.map((row) => (
										<TableRow hover>
											<TableCell align="center">{row.cardMemberName}</TableCell>
											<TableCell align="center">{row.customerCode}</TableCell>
											<TableCell align="center">{row.customerName}</TableCell>
											<TableCell align="center">{row.cardOpenPlace}</TableCell>
											<TableCell align="center">{row.cardNumber}</TableCell>
											<TableCell align="center">{row.cardType}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</TabPanel>
			</Grid>
		</MainCard>
	);
}
