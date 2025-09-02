import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../features/common/headerSlice';
import modalSlice from '../features/common/modalSlice';
import rightDrawerSlice from '../features/common/rightDrawerSlice';
import leadsSlice from '../features/leads/leadSlice';
import dataReducer from '../app/slices/dataSlice';

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  data: dataReducer
};

export default configureStore({
  reducer: combinedReducer
});
