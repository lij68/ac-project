import {createSlice} from '@reduxjs/toolkit';
import axiosServices from "utils/axios";

const initialState = {
	accountList: [],
	nonCurrentAssetList: []
};

const nonCurrentAsset = createSlice({
	name: 'nonCurrentAsset',
	initialState,
	reducers: {
		selectAccount(state, action) {
			state.accountList = action.payload
		},
		selectNonCurrentAsset(state, action) {
			state.nonCurrentAssetList = action.payload
		},
	}
})

export const fetchAccountList = () => {
	return async (dispatch) => {
		axiosServices.get(
			"/posting/nonCurrentAssetAccount"
		).then((res) => {
			dispatch(selectAccount(res.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const fetchNonCurrentAssetList = (parentCode) => {
	return async (dispatch) => {
		axiosServices.get(
			"/posting/nonCurrentAsset",{
				params:{
					parentCode:parentCode
				}
			}
		).then((res) => {
			dispatch(selectNonCurrentAsset(res.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const {selectAccount, selectNonCurrentAsset} = nonCurrentAsset.actions;
export default nonCurrentAsset.reducer;
