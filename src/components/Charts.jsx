'use client';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { STATUS_HEX } from '@/lib/constants';

export function StatusChart({ items, title = 'Jobs by status' }) {
  const data = items.map((i) => ({ ...i, fill: STATUS_HEX[i.name] || '#0b2a4a' }));
  return (
    <div className="card p-5">
      <h3 className="mb-4 font-semibold">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" fontSize={12} /><YAxis allowDecimals={false} fontSize={12} /><Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>{data.map((d) => <Cell key={d.name} fill={d.fill} />)}</Bar></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export const countBy = (rows, key = 'status') => Object.entries(rows.reduce((m, r) => ({ ...m, [r[key]]: (m[r[key]] || 0) + 1 }), {})).map(([name, value]) => ({ name, value }));
