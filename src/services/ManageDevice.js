// src/services/groupsService.js
import axios from 'axios';
import { API_BASE } from './api';

const http = axios.create({
  baseURL: API_BASE,          // '/api' บน gateway หรือ 'http://localhost:3000/api' ถ้าเซ็ต env
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
});

const groupsService = {
  getDevice: async () => (await http.get('/devices', { params:{ order_by:'device_type,short_index' } })).data || [],
  getSingle: async (typeDevice) => (await http.get(`/${typeDevice}`)).data || [],
  getGroups: async () => (await http.get('/groups')).data || [],
  createGroup: async (formData) => (await http.post('/groups', formData)).data,
  addGroupMember: async (groupId, formData) => (await http.post(`/groups/${groupId}/members/add`, formData)).data,
  SettingDevices: async (typeDevice, groupId, formData) => (await http.post(`/${typeDevice}/${groupId}/set`, formData)).data,
  removeGroupMember: async (groupId, formData) => (await http.post(`/groups/${groupId}/members/remove`, formData)).data,
};

export default groupsService;
