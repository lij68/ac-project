import {createSlice} from '@reduxjs/toolkit';
import axiosServices from "utils/axios";

const initialState = {
	asset: [],
	equalityAndLiabilities: [],
	summary: []
};

const earlyFinancialPosition = createSlice({
	name: 'earlyFinancialPosition',
	initialState,
	reducers: {
		selectAsset(state, action) {
			state.asset = action.payload
		},
		selectEquality(state, action) {
			state.equalityAndLiabilities = action.payload
		},
		selectSummary(state, action) {
			state.summary = action.payload
		},
	}
})

export const fetchEarlyFinancialList = (period) => {
	return async (dispatch) => {
		axiosServices.get(
			"/settlement/earlyfinancialposition",{
				params:{
					period:period
				}
			}
		).then((res) => {
			dispatch(selectAsset(res.data.filter(e => e.category === "자산")))
			dispatch(selectEquality(res.data.filter(e => e.category === "자본" || e.category === "부채")))
			dispatch(selectSummary(res.data.filter(e => e.category === "총계")))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const {selectAsset,selectEquality,selectSummary} = earlyFinancialPosition.actions;
export default earlyFinancialPosition.reducer;
