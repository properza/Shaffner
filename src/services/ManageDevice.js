import { axiosBase, toArray } from './apiClient';

const groupsService = {
  getDevice: async () => {
    const res = await axiosBase.get(`/api/devices?order_by=device_type,short_index`);
    return toArray(res.data); // กันคืนเป็น obj
  },

  getSingle: async (typeDevice) => {
    const res = await axiosBase.get(`/api/${typeDevice}`);
    // /api/ac คืน object -> แปลง array
    return toArray(res.data);
  },

  getGroups: async () => {
    const res = await axiosBase.get(`/api/groups`);
    const d = res.data;
    if (Array.isArray(d)) return d;
    if (Array.isArray(d?.groups)) return d.groups;
    if (Array.isArray(d?.items))  return d.items;
    return toArray(d);
  },

  createGroup: async (formData) => (await axiosBase.post(`/api/groups`, formData)).data,
  addGroupMember: async (groupId, formData) => (await axiosBase.post(`/api/groups/${groupId}/members/add`, formData)).data,
  SettingDevices: async (typeDevice, groupId, formData) => (await axiosBase.post(`/api/${typeDevice}/${groupId}/set`, formData)).data,
  removeGroupMember: async (groupId, formData) => (await axiosBase.post(`/api/groups/${groupId}/members/remove`, formData)).data,

  getTimerDeviceSetting: async (typeDevice, deviceNam) => (await axiosBase.get(`/schedule/${typeDevice}/${deviceNam}/windows`)).data || [],
  setTimerDeviceSetting: async (typeDevice, deviceNam, formData) => (await axiosBase.post(`/schedule/${typeDevice}/${deviceNam}/windows`, formData)).data,
  EditTimerDeviceSetting: async (timerID, formData) => (await axiosBase.patch(`/schedule/windows/${timerID}`, formData)).data,
  DeleteTimerDeviceSetting: async (timerID) => (await axiosBase.delete(`/schedule/windows/${timerID}`)).data,
};

export default groupsService;


