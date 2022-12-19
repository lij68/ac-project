// third-party
import {combineReducers} from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
// 전표/장부관리
import slipAndJournal from "./slices/account/slipAndLedger/slipAndJournal";
//전기분재무상태표
import earlyFinancialPosition from './slices/account/earlyFinancialPosition/earlyFinancialPosition'
//고정자산관리
import nonCurrentAsset from "./slices/account/nonCurrentAsset/nonCurrentAsset";
// 기초정보관리
import accountManagement from './slices/account/baseInformation/accountManagement'
import workplaceManagement from "./slices/account/baseInformation/workplaceManagement";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
	slipAndJournal: slipAndJournal,
	accountManagement: accountManagement,
	earlyFinancialPosition: earlyFinancialPosition,
	nonCurrentAsset: nonCurrentAsset,
	workplaceManagement: workplaceManagement,
	snackbar: snackbarReducer,
	menu: menuReducer
});

export default reducer;
