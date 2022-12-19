import {lazy} from 'react';
import Loadable from 'ui-component/Loadable';
//전표/장부관리

import ApprovalMangeForm from '../views/pages/account/slipAndLedger/ApprovalManageForm'
import JournalForm from '../views/pages/account/slipAndLedger/JournalForm'
import DetailTrialBalanceForm from '../views/pages/account/slipAndLedger/DetailTrialBalanceForm'
import GeneralAccountLedgerForm from '../views/pages/account/slipAndLedger/GeneralAccountLedgerForm'
import CashJournalForm from "../views/pages/account/slipAndLedger/CashJournalForm";
import AccountLedgerForm from '../views/pages/account/slipAndLedger/AccountLedgerForm'
//결산/재무제표관리
import TotalTrialBalanceForm from '../views/pages/account/settlementAndFinancialStatement/TotalTrialBalanceForm'
import FinancialPositionForm from '../views/pages/account/settlementAndFinancialStatement/FinancialPositionForm'
import IncomeStatementForm from '../views/pages/account/settlementAndFinancialStatement/IncomeStatementForm'
import MonthlyIncomeStatementForm from '../views/pages/account/settlementAndFinancialStatement/MonthlyIncomeStatementForm'
import CashStatementForm from '../views/pages/account/settlementAndFinancialStatement/CashStatementForm'
import CostReport from '../views/pages/account/settlementAndFinancialStatement/CostReportForm'
//전기분손익계산서
import EarlyFinancialPositionForm from '../views/pages/account/earlyIncomeStatement/EarlyFinancialPositionForm'
//고정자산관리
import NonCurrentAsset from '../views/pages/account/nonCurrentAsset/NonCurrentAssetForm'
//예산관리
import BudgetApplForm from "../views/pages/account/budgetManagement/BudgetApplForm";
import BudgetInsertForm from "../views/pages/account/budgetManagement/BudgetInsertForm";
import BudgetStatusForm from "../views/pages/account/budgetManagement/BudgetStatusForm";
//기초정보관리
import AccountManger from '../views/pages/account/basicInformation/AccountManagementForm'
import WorkplaceMangement from '../views/pages/account/basicInformation/WorkplaceMangementForm'
//
import AuthGuard from "../utils/route-guard/AuthGuard";
import MainLayout from "../layout/MainLayout";
const SlipForm = Loadable(lazy(() => import('../views/pages/account/slipAndLedger/SlipForm')));
const AccountRoutes = {
	path: '/',
	element: (
		<AuthGuard>
			<MainLayout/>
		</AuthGuard>
	),
	children: [
		// 잔표/장부관리
		{   //일반전표
			path: '/app/acc/slipForm',
			element: <SlipForm/>
		},
		{   //전표승인해제
			path: '/app/acc/approvalManageForm',
			element: <ApprovalMangeForm/>
		},
		{   //분개장
			path: '/app/acc/journalForm',
			element: <JournalForm/>
		},
		{   //일(월)계표
			path: '/app/acc/detailTrialBalanceForm',
			element: <DetailTrialBalanceForm/>
		},
		{   //총계정원장
			path: '/app/acc/generalAccountLedgerForm',
			element: <GeneralAccountLedgerForm/>
		},
		{   //현금출납장
			path: '/app/acc/cashJournalForm',
			element: <CashJournalForm/>
		},
		{   //계정별원장
			path: '/app/acc/accountLedgerForm',
			element: <AccountLedgerForm/>
		},
		// 결산/재무제표관리
		{   //합계잔액시산표
			path: '/app/acc/totalTrialBalanceForm',
			element: <TotalTrialBalanceForm/>
		},
		{   //재무상태표
			path: '/app/acc/financialPositionForm',
			element: <FinancialPositionForm/>
		},
		{   //손익계산서
			path: '/app/acc/incomeStatementForm',
			element: <IncomeStatementForm/>
		},
		{   //월별손익계산서
			path: '/app/acc/monthlyIncomeStatementForm',
			element: <MonthlyIncomeStatementForm/>
		},
		{   //현금흐름표
			path: '/app/acc/cashStatementForm',
			element: <CashStatementForm/>
		},
		{   //원가명세서
			path: '/app/acc/costReport',
			element: <CostReport/>
		},
		//전기분재무상태표
		{   //전기분재무상태표
			path: '/app/acc/earlyFinancialPositionForm',
			element: <EarlyFinancialPositionForm/>
		},
		// 고정자산관리
		{   //고정자산등록
			path: '/app/acc/nonCurrentAsset',
			element: <NonCurrentAsset/>
		},
		//예산관리
		{   //예산신청
			path: '/app/acc/budgetApplForm',
			element: <BudgetApplForm/>
		},
		{   //예산편성
			path: '/app/acc/budgetInsertForm',
			element: <BudgetInsertForm/>
		},
		{   //예산실적현황
			path: '/app/acc/budgetStatusForm',
			element: <BudgetStatusForm/>
		},
		// 기초정보관리
		{   //계정과목관리
			path: '/app/acc/accountManage',
			element: <AccountManger/>
		},
		{   //거래처관리
			path: '/app/acc/workplaceManagement',
			element: <WorkplaceMangement/>
		}
	]
}

export default AccountRoutes;