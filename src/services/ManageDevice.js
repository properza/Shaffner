import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

const groupsService = {
  getDevice: async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/devices?order_by=device_type,short_index`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      });
      return res.data || [];
    } catch (err) {
      console.warn(`ไม่สามารถโหลดข้อมูลได้`);
      throw err;
    }
  },
  getSingle: async (typeDevice) => {
    try {
      const res = await axios.get(`${API_BASE}/api/${typeDevice}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      });
      return res.data || [];
    } catch (err) {
      console.warn(`ไม่สามารถโหลด ${typeDevice} ได้`);
      throw err;
    }
  },
  getGroups: async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/groups`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      });
      return res.data || [];
    } catch (err) {
      console.warn('ไม่สามารถโหลดกลุ่มได้');
      throw err;
    }
  },

  createGroup: async (formData) => {
    try {
      const res = await axios.post(`${API_BASE}/api/groups`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      });
      return res.data;
    } catch (err) {
      console.warn('ไม่สามารถสร้างกลุ่มได้');
      throw err;
    }
  },

  // EditGroup: async (groupId, formData) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/api/groups/${groupId}`, formData, {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.warn('ไม่สามารถแก้ไขกลุ่มได้');
  //     throw err;
  //   }
  // },

  addGroupMember: async (groupId, formData) => {
    try {
      const res = await axios.post(`${API_BASE}/api/groups/${groupId}/members/add`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      });
      return res.data;
    } catch (err) {
      console.warn(`ไม่สามารถเพิ่มสมาชิกในกลุ่ม ${groupId} ได้`);
      throw err;
    }
  },

  SettingDevices: async (typeDevice, groupId, formData) => {
    try {
      const res = await axios.post(`${API_BASE}/api/${typeDevice}/${groupId}/set`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      });
      return res.data;
    } catch (err) {
      console.warn(`ไม่สามารถตั้งค่า ${groupId} ได้`);
      throw err;
    }
  },

  removeGroupMember: async (groupId, formData) => {
    try {
      const res = await axios.post(`${API_BASE}/api/groups/${groupId}/members/remove`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      });
      return res.data;
    } catch (err) {
      console.warn(`ไม่สามารถลบสมาชิกในกลุ่ม ${groupId} ได้`);
      throw err;
    }
  },
};

export default groupsService;
