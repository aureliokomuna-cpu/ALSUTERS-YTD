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
  Layers
} from 'lucide-react';
import { FilterState, GlobalKPISummary } from '../types';
import { formatIDR, formatPct } from '../data/dataset';

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
          <span className="text-4xl font-bold text-white">
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

      {/* CARD 3: TOTAL OMZET & LIKE-FOR-LIKE */}
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
          <span className="text-3xl font-bold text-white">
            {formatIDR(summary.achievement, true)}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
            LFL: {formatPct(summary.lflGrowthPct, true)}
          </div>
          <span className="text-zinc-500 text-xs">
            Same-SKU metric
          </span>
        </div>

        {/* Average per Dept */}
        <div className={`mt-auto pt-3 border-t flex items-center justify-between text-xs ${
          isDarkMode ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-100 text-zinc-500'
        }`}>
          <span className="text-[11px] text-zinc-500">Rata-rata / Dept:</span>
          <strong className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
            {summary.totalDepartments > 0 
              ? formatIDR(summary.achievement / summary.totalDepartments, true) 
              : 'Rp 0'}
          </strong>
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
