import React from 'react';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Layers,
  Maximize2
} from 'lucide-react';
import { FilterState, GlobalKPISummary } from '../types';
import { 
  formatIDR, 
  formatPct, 
  formatProductivity, 
  formatSQM, 
  getProductivityColorClass, 
  getProductivityBadgeClass 
} from '../data/dataset';

interface KpiOverviewProps {
  summary: GlobalKPISummary;
  filter: FilterState;
  isDarkMode: boolean;
}

export const KpiOverview: React.FC<KpiOverviewProps> = ({
  summary,
  filter,
  isDarkMode
}) => {
  const isPositiveGrowth = summary.growthPct >= 0;
  const isAchieved = summary.achievementPct >= 100;
  const deltaTarget = summary.achievement - summary.target;
  const isHighProductivity = summary.spaceProductivity >= 1_000_000;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      {/* CARD 1: TOTAL ACHIEVEMENT YTD */}
      <div 
        id="kpi-card-achievement"
        className={`border p-6 rounded-2xl flex flex-col gap-1 transition-all ${
          isDarkMode 
            ? 'bg-[#18181b] border-zinc-800' 
            : 'bg-white border-zinc-200 shadow-xs'
        }`}
      >
        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
          Total Achievement {filter.period}
        </span>
        
        <div className="flex items-baseline gap-2 mt-1">
          <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            {formatPct(summary.achievementPct)}
          </span>
          <span className="text-zinc-500 text-sm">
            of {formatIDR(summary.target, true)} target
          </span>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="w-full bg-zinc-800 h-1.5 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(summary.achievementPct, 100)}%` }}
          />
        </div>

        {/* Realisasi vs Target Values */}
        <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
          isDarkMode ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-100 text-zinc-500'
        }`}>
          <div>
            <span className="text-[11px] text-zinc-500 block">Realisasi</span>
            <strong className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
              {formatIDR(summary.achievement, true)}
            </strong>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-zinc-500 block">Selisih Target</span>
            <strong className={`font-mono font-semibold ${deltaTarget >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {deltaTarget >= 0 ? '+' : ''}{formatIDR(deltaTarget, true)}
            </strong>
          </div>
        </div>
      </div>

      {/* CARD 2: GROWTH YTD (% YoY) */}
      <div 
        id="kpi-card-growth"
        className={`border p-6 rounded-2xl flex flex-col gap-1 transition-all ${
          isDarkMode 
            ? 'bg-[#18181b] border-zinc-800' 
            : 'bg-white border-zinc-200 shadow-xs'
        }`}
      >
        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
          Growth YTD (YoY)
        </span>

        <div className="flex items-baseline gap-2 mt-1">
          <span className={`text-4xl font-bold ${isPositiveGrowth ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatPct(summary.growthPct, true)}
          </span>
          <span className={`text-xs ${isPositiveGrowth ? 'text-emerald-400/70' : 'text-rose-400/70'}`}>
            {isPositiveGrowth ? '↑' : '↓'}
          </span>
        </div>

        <p className="text-zinc-500 text-xs mt-4 italic">
          {summary.growthAmount >= 0 
            ? `Outperforming LY by ${formatIDR(summary.growthAmount, true)}`
            : `Underperforming LY by ${formatIDR(Math.abs(summary.growthAmount), true)}`
          }
        </p>

        {/* Actual CY vs LY comparison */}
        <div className={`mt-auto pt-3 border-t flex items-center justify-between text-xs ${
          isDarkMode ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-100 text-zinc-500'
        }`}>
          <div>
            <span className="text-[11px] text-zinc-500 block">Realisasi CY</span>
            <strong className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
              {formatIDR(summary.achievement, true)}
            </strong>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-zinc-500 block">Actual LY</span>
            <strong className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
              {formatIDR(summary.actualLY, true)}
            </strong>
          </div>
        </div>
      </div>

      {/* CARD 3: TOTAL OMZET & PRODUCTIVITY ALL STORE */}
      <div 
        id="kpi-card-revenue"
        className={`border p-6 rounded-2xl flex flex-col gap-1 transition-all ${
          isDarkMode 
            ? 'bg-[#18181b] border-zinc-800' 
            : 'bg-white border-zinc-200 shadow-xs'
        }`}
      >
        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
          Total Sales Revenue
        </span>

        <div className="flex items-baseline gap-2 mt-1">
          <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            {formatIDR(summary.achievement, true)}
          </span>
        </div>

        {/* PRODUCTIVITY ALL STORE (Placed right below Total Revenue as requested) */}
        <div className={`mt-3 p-3 rounded-xl border transition-all ${
          isDarkMode 
            ? isHighProductivity 
              ? 'bg-blue-950/20 border-blue-900/50' 
              : 'bg-rose-950/20 border-rose-900/50'
            : isHighProductivity 
              ? 'bg-blue-50/80 border-blue-200' 
              : 'bg-rose-50/80 border-rose-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1" title="Rata-rata Penjualan per m² per Bulan (Dihitung per bulan lalu dirata-rata)">
              <Maximize2 className="w-3 h-3 text-zinc-400" />
              Productivity All Store (Avg/Bln)
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-white text-zinc-600 border border-zinc-200'
            }`}>
              {formatSQM(summary.totalSqm)}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <span className={`text-base sm:text-lg font-mono tracking-tight ${getProductivityColorClass(summary.spaceProductivity, isDarkMode)}`}>
              {formatProductivity(summary.spaceProductivity)}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isHighProductivity 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-rose-500/20 text-rose-400'
            }`}>
              {isHighProductivity ? '≥ 1 Jt (Tinggi)' : '< 1 Jt (Rendah)'}
            </span>
          </div>
        </div>

        {/* LFL & Avg/Dept Footer */}
        <div className={`mt-auto pt-3 border-t flex items-center justify-between text-xs ${
          isDarkMode ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-100 text-zinc-500'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              LFL: {formatPct(summary.lflGrowthPct, true)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-500 mr-1">Avg/Dept:</span>
            <strong className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
              {summary.totalDepartments > 0 
                ? formatIDR(summary.achievement / summary.totalDepartments, true) 
                : 'Rp 0'}
            </strong>
          </div>
        </div>
      </div>

      {/* CARD 4: HEALTH INDEX / STATUS DISTRIBUTION */}
      <div 
        id="kpi-card-health"
        className={`border p-6 rounded-2xl flex flex-col gap-1 transition-all ${
          isDarkMode 
            ? 'bg-[#18181b] border-zinc-800' 
            : 'bg-white border-zinc-200 shadow-xs'
        }`}
      >
        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
          Health Index (% On Track)
        </span>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl font-bold text-blue-400">
            {summary.totalDepartments > 0 
              ? `${Math.round((summary.onTrackCount / summary.totalDepartments) * 100)}%` 
              : '0%'}
          </span>
          <span className="text-zinc-500 text-xs">
            ({summary.onTrackCount}/{summary.totalDepartments} depts)
          </span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="w-full bg-zinc-800 h-1.5 mt-4 rounded-full overflow-hidden flex">
          {summary.totalDepartments > 0 && (
            <>
              <div 
                className="bg-emerald-400 h-full"
                title={`On Track: ${summary.onTrackCount}`}
                style={{ width: `${(summary.onTrackCount / summary.totalDepartments) * 100}%` }}
              />
              <div 
                className="bg-amber-400 h-full"
                title={`Warning: ${summary.warningCount}`}
                style={{ width: `${(summary.warningCount / summary.totalDepartments) * 100}%` }}
              />
              <div 
                className="bg-rose-400 h-full"
                title={`Critical: ${summary.criticalCount}`}
                style={{ width: `${(summary.criticalCount / summary.totalDepartments) * 100}%` }}
              />
            </>
          )}
        </div>

        {/* Status Distribution Pills */}
        <div className={`mt-auto pt-3 border-t flex items-center justify-between text-xs ${
          isDarkMode ? 'border-zinc-800/80' : 'border-zinc-100'
        }`}>
          <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {summary.onTrackCount} On Track
          </span>
          <span className="flex items-center gap-1 text-amber-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {summary.warningCount} Warning
          </span>
          <span className="flex items-center gap-1 text-rose-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            {summary.criticalCount} Critical
          </span>
        </div>
      </div>

    </div>
  );
};
