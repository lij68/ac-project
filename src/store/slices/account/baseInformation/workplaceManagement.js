import {createSlice} from '@reduxjs/toolkit';
import axiosServices from "utils/axios";

const initialState = {
	workplaceList: [],
	businessList: [],
	creditcardList:[]
};

const workplaceManagement = createSlice({
	name: 'workplaceManagement',
	initialState,
	reducers: {
		workplace(state, action) { //액션타입
			state.workplaceList = action.payload
		},
		business(state, action) {
			state.businessList = action.payload
		},
		creditcard(state, action) {
			state.creditcardList = action.payload
		},
	}
})

export const fetchWorkplace = () => {
	return async (dispatch) => {
		axiosServices.post(
			"/operate/allworkplacelist"
		).then((res) => {
			dispatch(workplace(res.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}
export const fetchBusiness = () => {
	return async (dispatch) => {
		axiosServices.get(
			"/operate/businesslist"
		).then((res) => {
			dispatch(business(res.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}
export const fetchCreditCard = () => {
	return async (dispatch) => {
		axiosServices.get(
			"/operate/creditcardlist"
		).then((res) => {
			dispatch(creditcard(res.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const {workplace, business, creditcard} = workplaceManagement.actions;
export default workplaceManagement.reducer;