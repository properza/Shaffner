import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import groupsService from '../../services/ManageDevice';

export const fetchSingleDevice = createAsyncThunk('groups/fetchSingle', async (typeDevice, thunkAPI) => {
    try {
        return await groupsService.getSingle(typeDevice);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const fetchDeviceData = createAsyncThunk('groups/fetcDevices', async (_, thunkAPI) => {
    try {
        return await groupsService.getDevice();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const fetchGroups = createAsyncThunk('groups/fetchAll', async (_, thunkAPI) => {
    try {
        return await groupsService.getGroups();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const createGroup = createAsyncThunk('groups/create', async (formData, thunkAPI) => {
    try {
        return await groupsService.createGroup(formData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const addGroupMember = createAsyncThunk('groups/addMember', async ({ groupId, formData }, thunkAPI) => {
    try {
        return await groupsService.addGroupMember(groupId, formData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const removeGroupMember = createAsyncThunk('groups/removeMember', async ({ groupId, formData }, thunkAPI) => {
    try {
        return await groupsService.removeGroupMember(groupId, formData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

const initialState = {
    single: null,
    deviceDatas: [],
    groups: [],
    loading: false,
    error: null,
    success: null,
};

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleDevice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleDevice.fulfilled, (state, action) => {
                state.loading = false;
                state.single = action.payload;
            })
            .addCase(fetchSingleDevice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch single';
            })

            .addCase(fetchGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.loading = false;
                state.groups = action.payload;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch groups';
            })

            .addCase(fetchDeviceData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeviceData.fulfilled, (state, action) => {
                state.loading = false;
                state.deviceDatas = action.payload;
            })
            .addCase(fetchDeviceData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch groups';
            })

            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.groups.push(action.payload);
                state.success = 'Group created successfully';
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create group';
            })

            .addCase(addGroupMember.fulfilled, (state) => {
                state.success = 'Member added successfully';
            })
            .addCase(addGroupMember.rejected, (state, action) => {
                state.error = action.payload || 'Failed to add member';
            })

            .addCase(removeGroupMember.fulfilled, (state) => {
                state.success = 'Member removed successfully';
            })
            .addCase(removeGroupMember.rejected, (state, action) => {
                state.error = action.payload || 'Failed to remove member';
            });
    },
});

export const { clearStatus } = groupsSlice.actions;
export default groupsSlice.reducer;
