import { createSlice } from '@reduxjs/toolkit';

const caseSlice = createSlice({
  name: 'case',
  initialState: {
    caseData: {},
  },
  reducers: {
    setCaseData: (state, action) => {
      console.log("Action Payload:", action.payload); 

      state.caseData = action.payload
      console.log("Updated Redux State:", state.caseData); // Confirm Redux updated state
        },
    clearCaseData: (state) => {
      state.caseData = {}; 
    },
  },
});

export const { setCaseData, clearCaseData } = caseSlice.actions;
export default caseSlice.reducer;
