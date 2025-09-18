// import axios from 'axios';

// const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

// const groupsService = {
//   getDevice: async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/devices?order_by=device_type,short_index`, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: false,
//       });
//       return res.data || [];
//     } catch (err) {
//       console.warn(`ไม่สามารถโหลดข้อมูลได้`);
//       throw err;
//     }
//   },
//   getSingle: async (typeDevice) => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/${typeDevice}`, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: false,
//       });
//       return res.data || [];
//     } catch (err) {
//       console.warn(`ไม่สามารถโหลด ${typeDevice} ได้`);
//       throw err;
//     }
//   },
//   getGroups: async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/groups`, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: false,
//       });
//       return res.data || [];
//     } catch (err) {
//       console.warn('ไม่สามารถโหลดกลุ่มได้');
//       throw err;
//     }
//   },

//   createGroup: async (formData) => {
//     try {
//       const res = await axios.post(`${API_BASE}/api/groups`, formData, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: false,
//       });
//       return res.data;
//     } catch (err) {
//       console.warn('ไม่สามารถสร้างกลุ่มได้');
//       throw err;
//     }
//   },

//   // EditGroup: async (groupId, formData) => {
//   //   try {
//   //     const res = await axios.post(`${API_BASE}/api/groups/${groupId}`, formData, {
//   //       headers: { 'Content-Type': 'application/json' },
//   //       withCredentials: true,
//   //     });
//   //     return res.data;
//   //   } catch (err) {
//   //     console.warn('ไม่สามารถแก้ไขกลุ่มได้');
//   //     throw err;
//   //   }
//   // },

//   addGroupMember: async (groupId, formData) => {
//     try {
//       const res = await axios.post(`${API_BASE}/api/groups/${groupId}/members/add`, formData, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: false,
//       });
//       return res.data;
//     } catch (err) {
//       console.warn(`ไม่สามารถเพิ่มสมาชิกในกลุ่ม ${groupId} ได้`);
//       throw err;
//     }
//   },

//   SettingDevices: async (typeDevice, groupId, formData) => {
//     try {
//       const res = await axios.post(`${API_BASE}/api/${typeDevice}/${groupId}/set`, formData, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: false,
//       });
//       return res.data;
//     } catch (err) {
//       console.warn(`ไม่สามารถตั้งค่า ${groupId} ได้`);
//       throw err;
//     }
//   },

//   removeGroupMember: async (groupId, formData) => {
//     try {
//       const res = await axios.post(`${API_BASE}/api/groups/${groupId}/members/remove`, formData, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: false,
//       });
//       return res.data;
//     } catch (err) {
//       console.warn(`ไม่สามารถลบสมาชิกในกลุ่ม ${groupId} ได้`);
//       throw err;
//     }
//   },
// };

// export default groupsService;

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

// ดึง array จาก data ถ้า data เป็น object
function pickArray(data, candidates = []) {
  if (Array.isArray(data)) return data;
  for (const k of candidates) {
    if (Array.isArray(data?.[k])) return data[k];
  }
  // เผื่อบาง API คืนเป็น object map แปลงเป็น values
  if (data && typeof data === 'object') {
    const vals = Object.values(data);
    if (vals.length && vals.every(v => typeof v === 'object' || typeof v === 'string')) {
      return vals;
    }
  }
  return [];
}

const axiosBase = axios.create({
  baseURL: API_BASE,
  withCredentials: false, 
  headers: { 'Content-Type': 'application/json' }
});

const groupsService = {
  getDevice: async () => {
    const res = await axiosBase.get(`/api/devices?order_by=device_type,short_index`);
    // อาจเป็น [] หรือ { ok:true, devices:[...] } หรือ { rows:[...] }
    return pickArray(res.data, ['devices', 'rows', 'data']);
  },

  getSingle: async (typeDevice) => {
    const res = await axiosBase.get(`/api/${typeDevice}`);
    // รองรับ /api/ac → { ok:true, ac:[...] } หรือ { items:[...] }
    return pickArray(res.data, [typeDevice, `${typeDevice}s`, 'items', 'rows', 'data']);
  },

  getGroups: async () => {
    const res = await axiosBase.get(`/api/groups`);
    // ส่วนใหญ่จะเป็น { ok:true, groups:[...] }
    return pickArray(res.data, ['groups', 'items', 'rows', 'data']);
  },

  createGroup: async (formData) => {
    const res = await axiosBase.post(`/api/groups`, formData);
    return res.data;
  },

  addGroupMember: async (groupId, formData) => {
    const res = await axiosBase.post(`/api/groups/${groupId}/members/add`, formData);
    return res.data;
  },

  SettingDevices: async (typeDevice, groupId, formData) => {
    const res = await axiosBase.post(`/api/${typeDevice}/${groupId}/set`, formData);
    return res.data;
  },

  removeGroupMember: async (groupId, formData) => {
    const res = await axiosBase.post(`/api/groups/${groupId}/members/remove`, formData);
    return res.data;
  },
};

export default groupsService;

