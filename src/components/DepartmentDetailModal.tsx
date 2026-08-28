import React from 'react';
import { 
  X, 
  Building2, 
  Target, 
  TrendingUp, 
  Calendar, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { DepartmentItem } from '../types';
import { formatIDR, formatPct, MONTH_KEYS, ZONES_META } from '../data/dataset';

interface DepartmentDetailModalProps {
  dept: DepartmentItem | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  dept,
  onClose,
  isDarkMode
}) => {
  if (!dept) return null;

  const zoneMeta = ZONES_META[dept.zoneCode];

  // Prepare monthly chart data
  const chartData = MONTH_KEYS.map(mKey => {
    const metric = dept.monthly[mKey] || { target: 0, achievement: 0, achievementPct: 0, actualLY: 0, growthPct: 0 };
    const lfl = dept.lfl && dept.lfl[mKey] ? dept.lfl[mKey] : null;

    return {
      month: mKey.slice(0, 3),
      fullMonth: mKey,
      targetM: Number((metric.target / 1_000_000_000).toFixed(2)),
      achvM: Number((metric.achievement / 1_000_000_000).toFixed(2)),
      actualLYM: Number((metric.actualLY / 1_000_000_000).toFixed(2)),
      targetRaw: metric.target,
      achvRaw: metric.achievement,
      actualLYRaw: metric.actualLY,
      achievementPct: Number(metric.achievementPct.toFixed(1)),
      growthPct: Number(metric.growthPct.toFixed(1)),
      lflGrowthPct: lfl ? Number(lfl.growthPctLFL.toFixed(1)) : null,
      lflAchvRaw: lfl ? lfl.achievementLFL : null
    };
  });

  const ytdMetric = dept.monthly['YTD'] || { target: 0, achievement: 0, achievementPct: 0, actualLY: 0, growthPct: 0 };
  const ytdLFL = dept.lfl && dept.lfl['YTD'] ? dept.lfl['YTD'] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border overflow-hidden shadow-2xl ${
        isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
      }`}>
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-base text-white shadow-xs"
              style={{ backgroundColor: zoneMeta?.color || '#3B82F6' }}
            >
              {dept.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">{dept.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {dept.zoneName}
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Monthly Performance Breakdown & Like-for-Like (LFL) Growth Tracking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <span className="text-[11px] font-medium text-zinc-400 block">Total Realisasi YTD</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">
                {formatIDR(ytdMetric.achievement, true)}
              </span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">
                {formatIDR(ytdMetric.achievement)}
              </span>
            </div>

            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <span className="text-[11px] font-medium text-zinc-400 block">Target YTD</span>
              <span className="text-lg font-bold text-blue-400 font-mono">
                {formatIDR(ytdMetric.target, true)}
              </span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">
                {formatIDR(ytdMetric.target)}
              </span>
            </div>

            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <span className="text-[11px] font-medium text-zinc-400 block">% Pencapaian YTD</span>
              <span className={`text-lg font-extrabold font-mono ${ytdMetric.achievementPct >= 100 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatPct(ytdMetric.achievementPct)}
              </span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">
                {ytdMetric.achievementPct >= 100 ? 'Status: On Track' : 'Status: Needs Focus'}
              </span>
            </div>

            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <span className="text-[11px] font-medium text-zinc-400 block">% Growth YoY</span>
              <span className={`text-lg font-extrabold font-mono flex items-center gap-1 ${ytdMetric.growthPct >= 0 ? 'text-blue-400' : 'text-amber-400'}`}>
                {ytdMetric.growthPct >= 0 ? <ArrowUpRight className="w-4 h-4 text-emerald-400" /> : <ArrowDownRight className="w-4 h-4 text-rose-400" />}
                {formatPct(ytdMetric.growthPct, true)}
              </span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">
                LFL: {ytdLFL ? formatPct(ytdLFL.growthPctLFL, true) : '-'}
              </span>
            </div>
          </div>

          {/* Monthly Trajectory Chart */}
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-white">
              <Calendar className="w-4 h-4 text-blue-400" />
              Kinerja Bulanan & Tren Pertumbuhan (Januari - Desember)
            </h3>
            
            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 15, right: 15, bottom: 15, left: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#27272a' : '#e4e4e7'} opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: isDarkMode ? '#a1a1aa' : '#71717a', fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fill: isDarkMode ? '#a1a1aa' : '#71717a', fontSize: 11 }} tickFormatter={(v) => `${v} M`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: isDarkMode ? '#a1a1aa' : '#71717a', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#18181b' : '#FFFFFF', 
                      borderColor: isDarkMode ? '#27272a' : '#e4e4e7',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                      color: isDarkMode ? '#fafafa' : '#09090b'
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', color: isDarkMode ? '#d4d4d8' : '#52525b' }} />
                  <Bar yAxisId="left" dataKey="achvM" name="Realisasi (M)" fill="#10B981" radius={[3, 3, 0, 0]} maxBarSize={28} />
                  <Bar yAxisId="left" dataKey="targetM" name="Target (M)" fill="#3B82F6" radius={[3, 3, 0, 0]} maxBarSize={28} />
                  <Bar yAxisId="left" dataKey="actualLYM" name="Actual LY (M)" fill={isDarkMode ? '#3f3f46' : '#94a3b8'} opacity={0.5} radius={[3, 3, 0, 0]} maxBarSize={28} />
                  <Line yAxisId="right" type="monotone" dataKey="growthPct" name="Growth YoY (%)" stroke="#38BDF8" strokeWidth={2} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Breakdown Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-xs text-left">
              <thead className={`font-semibold uppercase tracking-wider ${isDarkMode ? 'bg-[#121214] text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
                <tr>
                  <th className="py-2.5 px-3">Bulan</th>
                  <th className="py-2.5 px-3 text-right">Target</th>
                  <th className="py-2.5 px-3 text-right">Realisasi</th>
                  <th className="py-2.5 px-3 text-right">% Achv</th>
                  <th className="py-2.5 px-3 text-right">Act LY</th>
                  <th className="py-2.5 px-3 text-right">% Growth</th>
                  <th className="py-2.5 px-3 text-right">LFL Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {MONTH_KEYS.map(mKey => {
                  const m = dept.monthly[mKey] || { target: 0, achievement: 0, achievementPct: 0, actualLY: 0, growthPct: 0 };
                  const l = dept.lfl && dept.lfl[mKey] ? dept.lfl[mKey] : null;

                  return (
                    <tr key={mKey} className={isDarkMode ? 'hover:bg-zinc-800/30' : 'hover:bg-zinc-50'}>
                      <td className="py-2 px-3 font-semibold text-zinc-300">{mKey}</td>
                      <td className="py-2 px-3 text-right font-mono text-zinc-400">{formatIDR(m.target)}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-zinc-100">{formatIDR(m.achievement)}</td>
                      <td className="py-2 px-3 text-right font-mono">
                        <span className={m.achievementPct >= 100 ? 'text-emerald-400 font-bold' : m.achievementPct > 0 ? 'text-rose-400' : 'text-zinc-500'}>
                          {m.achievementPct > 0 ? formatPct(m.achievementPct) : '-'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-zinc-400">{formatIDR(m.actualLY)}</td>
                      <td className="py-2 px-3 text-right font-mono">
                        <span className={m.growthPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {m.actualLY > 0 ? formatPct(m.growthPct, true) : '-'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-blue-400">
                        {l && l.growthPctLFL !== 0 ? formatPct(l.growthPctLFL, true) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs"
          >
            Tutup
          </button>
        </div>

      </div>

    </div>
  );
};
