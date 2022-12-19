import {createSlice} from '@reduxjs/toolkit';
import axiosServices from "utils/axios";

const initialState = {
	journalStatus:true,
	slipList: [],
	journalList: [],
	journalDetailList: []
};

const slipAndJournal = createSlice({
	name: 'slipAndJournal',
	initialState,
	reducers: {
		selectSlip(state, action) {
			state.slipList = action.payload
			state.journalList = []
			state.journalDetailList = []
			state.journalStatus = true
		},
		selectJournal(state, action) {
			state.journalList = action.payload
			state.journalStatus = false
		},
		selectJournalDetail(state, action) {
			state.journalDetailList = action.payload
		},
	}
})

export const fetchSlipList = (s,e,ss) => {
	return async (dispatch) => {
		axiosServices.get(
			"/posting/rangedsliplist", {
				params: {
					startDate: s,
					endDate: e,
					slipStatus: ss
				}
			}
		).then((res) => {
			dispatch(selectSlip(res.data))
		}).catch((err)=>{
			console.log(err)
		})
	}
}

export const fetchJournalList = (slipNo) => {
	return async (dispatch) => {
		axiosServices.get(
			"/posting/singlejournallist", {
				params: {
					slipNo: slipNo
				}
			}
		).then((res) => {
			dispatch(selectJournal(res.data))
		}).catch((err)=>{
			console.log(err)
		})
	}
}
export const fetchJournalDetailList = (journalNo) => {
	return async (dispatch) => {
		axiosServices.get(
			"/posting/journaldetaillist", {
				params: {
					journalNo: journalNo
				}
			}
		).then((res) => {
			dispatch(selectJournalDetail(res.data))
		}).catch((err)=>{
			console.log(err)
		})
	}
}

export const {selectSlip, selectJournal, selectJournalDetail} = slipAndJournal.actions;
export default slipAndJournal.reducer;
