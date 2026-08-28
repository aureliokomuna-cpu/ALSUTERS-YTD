import React from 'react';
import { 
  Trophy, 
  AlertTriangle, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { DepartmentItem, FilterState, ZoneGroup } from '../types';
import { formatIDR, formatPct, getMetricForPeriod, MONTH_KEYS, ZONES_META } from '../data/dataset';

interface ZoneComparisonHeatmapProps {
  zones: ZoneGroup[];
  departments: DepartmentItem[];
  filter: FilterState;
  isDarkMode: boolean;
  onSelectDept: (code: string) => void;
  onSelectZone: (zoneCode: string) => void;
}

export const ZoneComparisonHeatmap: React.FC<ZoneComparisonHeatmapProps> = ({
  zones,
  departments,
  filter,
  isDarkMode,
  onSelectDept,
  onSelectZone
}) => {
  const regularDepts = departments.filter(d => !d.isZoneTotal && !d.isGrandTotal);

  // Calculate Top Performers & Underperformers based on active period & mode
  const rankedDepts = React.useMemo(() => {
    return regularDepts.map(d => {
      const metric = getMetricForPeriod(d, filter.period, filter.metricMode);
      return {
        ...d,
        metric
      };
    }).sort((a, b) => b.metric.achievementPct - a.metric.achievementPct);
  }, [regularDepts, filter.period, filter.metricMode]);

  const topPerformers = rankedDepts.slice(0, 3);
  const underPerformers = [...rankedDepts].reverse().slice(0, 3);

  // Active months for heatmap (Jan - Jul)
  const heatmapMonths = MONTH_KEYS.slice(0, 7);

  // Calculate Heatmap cell color based on % achievement
  const getHeatmapColor = (pct: number) => {
    if (pct >= 120) return isDarkMode ? 'bg-emerald-500/80 text-white font-bold' : 'bg-emerald-600 text-white';
    if (pct >= 100) return isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800';
    if (pct >= 90) return isDarkMode ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-800';
    if (pct >= 80) return isDarkMode ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-orange-100 text-orange-800';
    return isDarkMode ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-rose-100 text-rose-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      
      {/* 1. TOP PERFORMERS CARD */}
      <div className={`rounded-2xl border p-6 transition-all ${
        isDarkMode 
          ? 'bg-[#18181b] border-zinc-800' 
          : 'bg-white border-zinc-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Top Performers</h3>
              <p className="text-[11px] text-zinc-400">Pencapaian Tertinggi {filter.period}</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Rank #1 - #3
          </span>
        </div>

        <div className="space-y-2.5">
          {topPerformers.map((item, idx) => (
            <div
              key={item.code}
              onClick={() => onSelectDept(item.code)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isDarkMode ? 'bg-[#121214] border-zinc-800 hover:border-zinc-700' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold ${
                  idx === 0 ? 'bg-amber-400 text-zinc-950 shadow-xs' : 'bg-zinc-800 text-zinc-300'
                }`}>
                  {idx + 1}
                </span>
                <div>
                  <span className="font-semibold text-xs text-zinc-100 block">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    [{item.code}] &bull; {item.zoneName}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 block">
                  {formatPct(item.metric.achievementPct)}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {formatIDR(item.metric.achievement, true)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. UNDERPERFORMERS / ATTENTION CARD */}
      <div className={`rounded-2xl border p-6 transition-all ${
        isDarkMode 
          ? 'bg-[#18181b] border-zinc-800' 
          : 'bg-white border-zinc-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Needs Attention</h3>
              <p className="text-[11px] text-zinc-400">Pencapaian di Bawah Target</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Action Req.
          </span>
        </div>

        <div className="space-y-2.5">
          {underPerformers.map((item, idx) => (
            <div
              key={item.code}
              onClick={() => onSelectDept(item.code)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isDarkMode ? 'bg-[#121214] border-zinc-800 hover:border-zinc-700' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center text-xs font-bold">
                  !
                </span>
                <div>
                  <span className="font-semibold text-xs text-zinc-100 block">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    [{item.code}] &bull; {item.zoneName}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-rose-400 block">
                  {formatPct(item.metric.achievementPct)}
                </span>
                <span className="text-[10px] text-zinc-500 flex items-center justify-end gap-0.5 font-mono">
                  {item.metric.growthPct < 0 ? <TrendingDown className="w-3 h-3 text-rose-400" /> : <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {formatPct(item.metric.growthPct, true)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ZONE PERFORMANCE HEATMAP MATRIX */}
      <div className={`rounded-2xl border p-6 transition-all ${
        isDarkMode 
          ? 'bg-[#18181b] border-zinc-800' 
          : 'bg-white border-zinc-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Zone Heatmap</h3>
              <p className="text-[11px] text-zinc-400">Intensitas performa zona per bulan (% Achv)</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-zinc-500">Jan - Jul</span>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left font-semibold text-[11px] pb-2 text-zinc-500">Zona</th>
                {heatmapMonths.map(m => (
                  <th key={m} className="text-center font-semibold text-[10px] pb-2 text-zinc-500">
                    {m.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-1">
              {zones.map(z => (
                <tr 
                  key={z.zoneCode}
                  onClick={() => onSelectZone(z.zoneCode)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <td className="py-1.5 pr-2 font-semibold text-zinc-300 whitespace-nowrap text-[11px]">
                    {ZONES_META[z.zoneCode]?.shortName || z.zoneName}
                  </td>
                  {heatmapMonths.map(mKey => {
                    // Calculate zone achievement in that month
                    let targetSum = 0;
                    let achvSum = 0;
                    z.departments.forEach(d => {
                      const dm = d.monthly[mKey];
                      if (dm) {
                        targetSum += dm.target;
                        achvSum += dm.achievement;
                      }
                    });
                    const pct = targetSum > 0 ? (achvSum / targetSum) * 100 : 0;

                    return (
                      <td key={mKey} className="p-0.5 text-center">
                        <div 
                          title={`${z.zoneName} - ${mKey}: ${formatPct(pct)} (${formatIDR(achvSum)} / ${formatIDR(targetSum)})`}
                          className={`rounded px-1 py-1 text-[10px] font-mono font-bold transition-all ${getHeatmapColor(pct)}`}
                        >
                          {pct > 0 ? Math.round(pct) + '%' : '-'}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Heatmap scale indicator */}
        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
          <span>&lt;80%</span>
          <div className="flex items-center gap-1">
            <span className="w-3 h-2 rounded bg-rose-500/40 inline-block" />
            <span className="w-3 h-2 rounded bg-amber-500/40 inline-block" />
            <span className="w-3 h-2 rounded bg-emerald-500/40 inline-block" />
            <span className="w-3 h-2 rounded bg-emerald-500 inline-block" />
          </div>
          <span>&gt;120%</span>
        </div>
      </div>

    </div>
  );
};
