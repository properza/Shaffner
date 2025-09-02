import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBuilding: 'A',
  selectedFloor: '1'
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSelectedBuilding(state, action) {
      state.selectedBuilding = action.payload;
    },
    setSelectedFloor(state, action) {
      state.selectedFloor = action.payload;
    }
  }
});

export const { setSelectedBuilding, setSelectedFloor } = dataSlice.actions;
export default dataSlice.reducer;
