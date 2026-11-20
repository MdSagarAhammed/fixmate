export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const CATEGORIES = ['Smartphone', 'Laptop & PC', 'AC', 'Refrigerator', 'TV', 'Washing Machine', 'Electrical'];
export const MODES = ['Home Visit', 'Shop Drop-off'];
export const STATUS_STYLE = {
  requested: 'bg-blue-100 text-blue-700', accepted: 'bg-indigo-100 text-indigo-700', 'in-progress': 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700', cancelled: 'bg-slate-200 text-slate-600',
  pending: 'bg-amber-100 text-amber-800', approved: 'bg-green-100 text-green-700', unpaid: 'bg-orange-100 text-orange-700', paid: 'bg-green-100 text-green-700',
};
export const STATUS_HEX = { requested: '#3b82f6', accepted: '#6366f1', 'in-progress': '#ff7a45', completed: '#22c55e', rejected: '#ef4444', cancelled: '#94a3b8' };
export const dashboardFor = (role) => `/dashboard/${['customer', 'technician', 'admin'].includes(role) ? role : 'customer'}`;
