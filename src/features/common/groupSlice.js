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

export const settingDevicesData = createAsyncThunk('groups/settingDevic', async ({ typeDevice, groupId, formData }, thunkAPI) => {
    try {
        return await groupsService.SettingDevices(typeDevice, groupId, formData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

// ------------------------------------------------------------------

export const fetchDeviceTimer = createAsyncThunk('groups/fetchDeviceTimerData', async ({ typeDevice = 'ac', deviceNam = 'AC01' }, thunkAPI) => {
    try {
        return await groupsService.getTimerDeviceSetting(typeDevice, deviceNam);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const setTimerDeviceSetting = createAsyncThunk(
    'groups/timer/create',
    async ({ typeDevice, deviceNam, formData }, thunkAPI) => {
        try {
            return await groupsService.setTimerDeviceSetting(typeDevice, deviceNam, formData);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const editTimerDeviceSetting = createAsyncThunk(
    'groups/timer/edit',
    async ({ timerID, formData }, thunkAPI) => {
        try {
            return await groupsService.EditTimerDeviceSetting(timerID, formData);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deleteTimerDeviceSetting = createAsyncThunk(
    'groups/timer/delete',
    async (timerID, thunkAPI) => {
        try {
            return await groupsService.DeleteTimerDeviceSetting(timerID);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    single: null,
    deviceTimer: [],
    deviceDatas: [],
    groups: [],
    Addgroups: [],
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

            .addCase(addGroupMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addGroupMember.fulfilled, (state, action) => {
                state.loading = false;
                state.Addgroups.push(action.payload);
                state.success = 'Member added successfully';
            })
            .addCase(addGroupMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add member';
            })

            .addCase(removeGroupMember.fulfilled, (state) => {
                state.success = 'Member removed successfully';
            })
            .addCase(removeGroupMember.rejected, (state, action) => {
                state.error = action.payload || 'Failed to remove member';
            })


            .addCase(settingDevicesData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(settingDevicesData.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'Setting device successfully';
                state.Addgroups.push(action.payload);
            })
            .addCase(settingDevicesData.rejected, (state, action) => {
                state.error = action.payload || 'Setting failed';
            })

            //ตาราง

            .addCase(fetchDeviceTimer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeviceTimer.fulfilled, (state, action) => {
                state.loading = false;
                state.deviceTimer = action.payload;
            })
            .addCase(fetchDeviceTimer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch deviceTimer';
            })

            .addCase(setTimerDeviceSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(setTimerDeviceSetting.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'Created timer window';
                if (Array.isArray(state.deviceTimer)) {
                    state.deviceTimer.push(action.payload);
                } else {
                    state.deviceTimer = [action.payload];
                }
            })

            .addCase(setTimerDeviceSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create timer window';
            })

            .addCase(editTimerDeviceSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTimerDeviceSetting.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'Updated timer window';
                const updated = action.payload;
                const targetId = updated?.id ?? updated?.timer_id ?? action.meta.arg.timerID;
                if (Array.isArray(state.deviceTimer) && targetId != null) {
                    const idx = state.deviceTimer.findIndex(
                        (w) => (w?.id ?? w?.timer_id) === targetId
                    );
                    if (idx !== -1) state.deviceTimer[idx] = updated;
                }
            })
            .addCase(editTimerDeviceSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update timer window';
            })

            .addCase(deleteTimerDeviceSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTimerDeviceSetting.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'Deleted timer window';
                const targetId = action.meta.arg;
                if (Array.isArray(state.deviceTimer) && targetId != null) {
                    state.deviceTimer = state.deviceTimer.filter(
                        (w) => (w?.id ?? w?.timer_id) !== targetId
                    );
                }
            })
            .addCase(deleteTimerDeviceSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete timer window';
            });
    },
});

export const { clearStatus } = groupsSlice.actions;
export default groupsSlice.reducer;
