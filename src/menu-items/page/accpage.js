import {FormattedMessage} from 'react-intl';
// assets
import {IconAbacus, IconFiles} from '@tabler/icons';

// constant
const icons = {
	IconAbacus, IconFiles
};

const accpage = {
	id: 'account',
	title: <FormattedMessage id="회계 업무"/>,
	type: 'collapse',
	icon: icons.IconAbacus,
	children: [
		{
			id: 'slipAndLedger',
			title: <FormattedMessage id="전표/장부관리"/>,
			type: 'collapse',
			children: [
				{
					id: 'slipform',
					title: (
						<FormattedMessage id="일반전표"/>
					),
					type: 'item',
					url: '/app/acc/slipForm',
					target: false
				},
				{
					id: 'approvalmanageform',
					title: (

						<FormattedMessage id="전표승인해제"/>
					),
					type: 'item',
					url: '/app/acc/approvalManageForm',
					target: false
				},
				{
					id: 'journalform',
					title: (
						<FormattedMessage id="분개장"/>
					),
					type: 'item',
					url: '/app/acc/journalForm',
					target: false
				},
				{
					id: 'detailtrialbalanceform',
					title: (
						<FormattedMessage id="일(월)계표"/>
					),
					type: 'item',
					url: '/app/acc/detailTrialBalanceForm',
					target: false
				},
				{
					id: 'genenralAccountLedger',
					title: (
							<FormattedMessage id="총계정원장"/>
					),
					type: 'item',
					url: '/app/acc/generalAccountLedgerForm',
					target: false
				},
				{
					id: 'cashjournalform',
					title: (
							<FormattedMessage id="현금출납장"/>
					),
					type: 'item',
					url: '/app/acc/cashJournalForm',
					target: false
				},
				{
					id: 'accountledgerform',
					title: (
							<FormattedMessage id="계정별원장"/>
					),
					type: 'item',
					url: '/app/acc/accountLedgerForm',
					target: false
				}
			]
		},
		{
			id: 'settlementAndFinancialStatement',
			title: <FormattedMessage id="결산/재무제표관리"/>,
			type: 'collapse',
			children: [
				{
					id: 'totaltrialbalanceform',
					title: (
							<FormattedMessage id="합계잔액시산표"/>
					),
					type: 'item',
					url: '/app/acc/totalTrialBalanceForm',
					target: false
				},
				{
					id: 'financialpositionform',
					title: (
							<FormattedMessage id="재무상태표"/>
					),
					type: 'item',
					url: '/app/acc/financialPositionForm',
					target: false
				},
				{
					id: 'incomestatementform',
					title: (
							<FormattedMessage id="손익계산서"/>
					),
					type: 'item',
					url: '/app/acc/incomeStatementForm',
					target: false
				},
				{
					id: 'monthlyincomestatementform',
					title: (
							<FormattedMessage id="월별손익계산서"/>
					),
					type: 'item',
					url: '/app/acc/monthlyIncomeStatementForm',
					target: false
				},
				{
					id: 'cashstatementform',
					title: (
							<FormattedMessage id="현금흐름표"/>
					),
					type: 'item',
					url: '/app/acc/cashStatementForm',
					target: false
				},
				{
					id: 'costreport',
					title: (
							<FormattedMessage id="원가보고서"/>
					),
					type: 'item',
					url: '/app/acc/costReport',
					target: false
				}
			]
		},
		{
			id: 'earlyincomestatementform',
			title: <FormattedMessage id="전기분손익계산서"/>,
			type: 'collapse',
			children: [
				{
					id: 'earlyfinancialpositionform',
					title: (
							<FormattedMessage id="전기분재무상태표"/>
					),
					type: 'item',
					url: '/app/acc/earlyFinancialPositionForm',
					target: false
				}
			]
		},
		{
			id: 'noneassetmanager',
			title: <FormattedMessage id="고정자산관리"/>,
			type: 'collapse',
			children: [
				{
					id: 'noncurrentassetregister',
					title: (
						<>
							<FormattedMessage id="고정자산등록"/>
						</>
					),
					type: 'item',
					url: '/app/acc/nonCurrentAsset',
					target: false
				}
			]
		},
		{
			id: 'budgetmanager',
			title: <FormattedMessage id="예산관리"/>,
			type: 'collapse',
			children: [
				{
					id: 'budgetappl',
					title: (
						<>
							<FormattedMessage id="예산신청"/>
						</>
					),
					type: 'item',
					url: '/app/acc/budgetApplForm',
					target: false
				},
				{
					id: 'budgetinsert',
					title: (
						<>
							<FormattedMessage id="예산편성"/>
						</>
					),
					type: 'item',
					url: '/app/acc/budgetInsertForm',
					target: false
				},
				{
					id: 'budgetstatus',
					title: (
						<>
							<FormattedMessage id="예산실적현황"/>
						</>
					),
					type: 'item',
					url: '/app/acc/budgetStatusForm',
					target: false
				},
			]
		},
		{
			id: 'basicinformation',
			title: <FormattedMessage id="기초정보관리"/>,
			type: 'collapse',
			children: [
				{
					id: 'accountmanager',
					title: (
						<>
							<FormattedMessage id="계정과목관리"/>
						</>
					),
					type: 'item',
					url: '/app/acc/accountManage',
					target: false
				},
				{
					id: 'customermanager',
					title: (
						<>
							<FormattedMessage id="거래처관리"/>
						</>
					),
					type: 'item',
					url: '/app/acc/workplaceManagement',
					target: false
				}
			]
		}
	]
}

export default accpage;