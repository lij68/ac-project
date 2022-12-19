import {createSlice} from '@reduxjs/toolkit';
import axiosServices from "utils/axios";
import {openSnackbar} from "../../snackbar";

const initialState = {
	accountList: [],
	accountDetailList: [],
	accountStatus: true
};

const accountManagement = createSlice({
	name: 'accountManagement',
	initialState,
	reducers: {
		findAccount(state, action) {
			state.accountList = action.payload
		},
		findAccountDetail(state, action) {
			state.accountDetailList = action.payload
			state.accountStatus = false
		}
	}
})

export const fetchAccountList = () => {
	return async (dispatch) => {
		axiosServices.get(
			"/operate/parentaccountlist"
		).then((res) => {
			dispatch(findAccount(res.data))
		}).catch((err) => {
			console.log(err)
		})
	};
}

export const fetchAccountDetailList = (accountCode) => {
	return async (dispatch) => {
		axiosServices.get(
			"/operate/detailaccountlist", {
				params: {
					code: accountCode
				}
			}
		).then((res) => {
			dispatch(findAccountDetail(res.data))
		}).catch((err) => {
			console.log(err)
		})
	};
}

export const fetchNewAccountList = (newAccount) => {
	return async (dispatch) => {
		await axiosServices.post(
			"/operate/registAccount", {
				accountInnerCode: newAccount.accountInnerCode,
				parentAccountInnercode: newAccount.parentAccountInnercode,
				accountCode: newAccount.accountCode,
				accountCharacter: newAccount.accountCharacter,
				accountName: newAccount.accountName,
				accountUseCheck: newAccount.accountUseCheck,
				accountDivision: newAccount.accountDivision,
				accountDescription: newAccount.accountDescription,
				groupCode: newAccount.groupCode,
				editable: newAccount.editable
			}
		).then(() => {
			dispatch(fetchAccountDetailList(newAccount.parentAccountInnercode))
			dispatch(
				openSnackbar({
					open: true,
					message: '계정과목이 추가되었습니다',
					variant: 'alert',
					close: true,
					alert: {color: 'success'},
					transition: 'SlideUp'
				})
			)
		}).catch((err) => {
			dispatch(
				openSnackbar({
					open: true,
					message: err.error + " 계정과목 추가에 실패하였습니다",
					variant: 'alert',
					close: true,
					alert: {color: 'error'},
					transition: 'SlideUp'
				})
			)
		})
	};
}

export const fetchDeleteAccountList = (accountList, parentAccountCode) => {
	return async (dispatch) => {
		axiosServices.delete(
			"/operate/deleteAccount", {
				data: accountList
			}
		).then(() => {
			dispatch(fetchAccountDetailList(parentAccountCode))
			dispatch(
				openSnackbar({
					open: true,
					message: '계정과목이 삭제되었습니다',
					variant: 'alert',
					close: true,
					alert: {color: 'success'},
					transition: 'SlideUp'
				})
			)
		}).catch((err) => {
			dispatch(
				openSnackbar({
					open: true,
					message: err.error,
					variant: 'alert',
					close: true,
					alert: {color: 'error'},
					transition: 'SlideUp'
				})
			)
		})
	};
}

export const {findAccount, findAccountDetail} = accountManagement.actions;
export default accountManagement.reducer;