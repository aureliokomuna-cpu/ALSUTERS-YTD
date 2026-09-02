import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Layers, 
  Calendar, 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ChevronRight
} from 'lucide-react';
import { DepartmentItem, FilterState, ZoneGroup } from '../types';
import { formatIDR, formatPct, getMetricForPeriod, MONTH_KEYS, ZONES_META, getActiveMonths } from '../data/dataset';

interface ComboPerformanceChartProps {
  zones: ZoneGroup[];
  departments: DepartmentItem[];
  filter: FilterState;
  isDarkMode: boolean;
  onSelectDept?: (deptCode: string) => void;
  onSelectZone?: (zoneCode: string) => void;
}

export const ComboPerformanceChart: React.FC<ComboPerformanceChartProps> = ({
  zones,
  departments,
  filter,
  isDarkMode,
  onSelectDept,
  onSelectZone
}) => {
  const [chartView, setChartView] = useState<'ZONES' | 'DEPARTMENTS' | 'MONTHLY_TREND' | 'ZONE_MONTHLY'>('ZONES');
  const [activeZoneCode, setActiveZoneCode] = useState<string | null>(
    filter.zoneCode !== 'ALL' ? filter.zoneCode : null
  );

  // Sync if global filter changes
  useEffect(() => {
    if (filter.zoneCode !== 'ALL') {
      setActiveZoneCode(filter.zoneCode);
      setChartView('ZONE_MONTHLY');
    }
  }, [filter.zoneCode]);

  // 1. Data per Zone (Overview)
  const zoneChartData = React.useMemo(() => {
    return zones.map(z => {
      return {
        name: z.zoneName.replace(' ZONE', ''),
        fullName: z.zoneName,
        code: z.zoneCode,
        targetM: Number((z.target / 1_000_000_000).toFixed(2)),
        realisasiM: Number((z.achievement / 1_000_000_000).toFixed(2)),
        actLYM: Number((z.actualLY / 1_000_000_000).toFixed(2)),
        targetRaw: z.target,
        realisasiRaw: z.achievement,
        actLYRaw: z.actualLY,
        achievementPct: Number(z.achievementPct.toFixed(1)),
        growthPct: Number(z.growthPct.toFixed(1)),
        color: ZONES_META[z.zoneCode]?.color || '#3B82F6',
        deptCount: z.departments.length
      };
    });
  }, [zones]);

  // 2. Data per Department (sorted by Realisasi)
  const deptChartData = React.useMemo(() => {
    return departments.slice(0, 12).map(d => {
      const m = getMetricForPeriod(d, filter.period, filter.metricMode);
      return {
        name: d.name.length > 14 ? d.name.slice(0, 12) + '...' : d.name,
        fullName: d.name,
        code: d.code,
        zoneName: d.zoneName,
        targetM: Number((m.target / 1_000_000_000).toFixed(2)),
        realisasiM: Number((m.achievement / 1_000_000_000).toFixed(2)),
        actLYM: Number((m.actualLY / 1_000_000_000).toFixed(2)),
        targetRaw: m.target,
        realisasiRaw: m.achievement,
        actLYRaw: m.actualLY,
        achievementPct: Number(m.achievementPct.toFixed(1)),
        growthPct: Number(m.growthPct.toFixed(1)),
        color: m.achievementPct >= 100 ? '#10B981' : m.achievementPct >= 85 ? '#F59E0B' : '#F43F5E'
      };
    });
  }, [departments, filter.period, filter.metricMode]);

  // 3. Monthly Trend for ALL Departments
  const monthlyTrendData = React.useMemo(() => {
    const activeDepts = departments;
    const months = getActiveMonths(departments);

    return months.map(mKey => {
      let mTarget = 0;
      let mAchv = 0;
      let mActLY = 0;

      activeDepts.forEach(d => {
        const metric = d.monthly[mKey] || { target: 0, achievement: 0, actualLY: 0 };
        mTarget += metric.target;
        mAchv += metric.achievement;
        mActLY += metric.actualLY;
      });

      const achvPct = mTarget > 0 ? (mAchv / mTarget) * 100 : 0;
      const growthPct = mActLY > 0 ? ((mAchv - mActLY) / mActLY) * 100 : 0;

      return {
        name: mKey.slice(0, 3),
        fullName: mKey,
        targetM: Number((mTarget / 1_000_000_000).toFixed(2)),
        realisasiM: Number((mAchv / 1_000_000_000).toFixed(2)),
        actLYM: Number((mActLY / 1_000_000_000).toFixed(2)),
        targetRaw: mTarget,
        realisasiRaw: mAchv,
        actLYRaw: mActLY,
        achievementPct: Number(achvPct.toFixed(1)),
        growthPct: Number(growthPct.toFixed(1))
      };
    });
  }, [departments]);

  // 4. Monthly Trend for SPECIFIC SELECTED ZONE
  const zoneMonthlyData = React.useMemo(() => {
    if (!activeZoneCode) return [];
    
    // Find all depts belonging to this zone
    const zoneDepts = departments.filter(d => d.zoneCode === activeZoneCode);
    const months = getActiveMonths(departments);

    return months.map(mKey => {
      let mTarget = 0;
      let mAchv = 0;
      let mActLY = 0;

      zoneDepts.forEach(d => {
        const metric = d.monthly[mKey] || { target: 0, achievement: 0, actualLY: 0 };
        mTarget += metric.target;
        mAchv += metric.achievement;
        mActLY += metric.actualLY;
      });

      const achvPct = mTarget > 0 ? (mAchv / mTarget) * 100 : 0;
      const growthPct = mActLY > 0 ? ((mAchv - mActLY) / mActLY) * 100 : 0;

      return {
        name: mKey.slice(0, 3),
        fullName: mKey,
        monthKey: mKey,
        targetM: Number((mTarget / 1_000_000_000).toFixed(2)),
        realisasiM: Number((mAchv / 1_000_000_000).toFixed(2)),
        actLYM: Number((mActLY / 1_000_000_000).toFixed(2)),
        targetRaw: mTarget,
        realisasiRaw: mAchv,
        actLYRaw: mActLY,
        achievementPct: Number(achvPct.toFixed(1)),
        growthPct: Number(growthPct.toFixed(1)),
        color: achvPct >= 100 ? '#10B981' : achvPct >= 85 ? '#F59E0B' : '#F43F5E'
      };
    });
  }, [departments, activeZoneCode]);

  // Determine current active chart dataset
  const currentChartData = 
    chartView === 'ZONE_MONTHLY' && activeZoneCode
      ? zoneMonthlyData
      : chartView === 'ZONES' 
        ? zoneChartData 
        : chartView === 'DEPARTMENTS' 
          ? deptChartData 
          : monthlyTrendData;

  // Handle Zone Selection / Drilldown
  const handleZoneClick = (zoneCode: string) => {
    setActiveZoneCode(zoneCode);
    setChartView('ZONE_MONTHLY');
    if (onSelectZone) {
      onSelectZone(zoneCode);
    }
  };

  const handleResetToAllZones = () => {
    setActiveZoneCode(null);
    setChartView('ZONES');
    if (onSelectZone) {
      onSelectZone('ALL');
    }
  };

  const activeZoneMeta = activeZoneCode ? ZONES_META[activeZoneCode] : null;

  // Custom rich tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-4 rounded-xl border shadow-xl text-xs backdrop-blur-md ${
          isDarkMode ? 'bg-[#18181b]/95 border-zinc-800 text-zinc-100' : 'bg-white/95 border-zinc-200 text-zinc-900'
        }`}>
          <div className="font-bold text-sm border-b border-zinc-800 pb-2 mb-2 flex items-center justify-between gap-4">
            <span>{data.fullName || label}</span>
            {data.code ? (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">[{data.code}]</span>
            ) : chartView === 'ZONE_MONTHLY' && activeZoneMeta ? (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${activeZoneMeta.color}20`, color: activeZoneMeta.color }}>
                {activeZoneMeta.name}
              </span>
            ) : null}
          </div>

          <div className="space-y-1.5 font-medium">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">Realisasi (Achv):</span>
              <strong className="text-emerald-400">{formatIDR(data.realisasiRaw)} ({data.realisasiM} M)</strong>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">Target:</span>
              <strong className="text-blue-400">{formatIDR(data.targetRaw)} ({data.targetM} M)</strong>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">Actual LY:</span>
              <strong className="text-zinc-300">{formatIDR(data.actLYRaw)} ({data.actLYM} M)</strong>
            </div>
            <div className="flex justify-between gap-4 pt-1.5 border-t border-zinc-800">
              <span className="text-zinc-400">% Pencapaian:</span>
              <strong className={data.achievementPct >= 100 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {formatPct(data.achievementPct)}
              </strong>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">% Growth YoY:</span>
              <strong className={data.growthPct >= 0 ? 'text-blue-400 font-bold' : 'text-amber-400 font-bold'}>
                {formatPct(data.growthPct, true)}
              </strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full rounded-2xl border p-6 transition-all ${
      isDarkMode 
        ? 'bg-[#18181b] border-zinc-800' 
        : 'bg-white border-zinc-200 shadow-xs'
    }`}>
      
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-white">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              {chartView === 'ZONE_MONTHLY' && activeZoneMeta ? (
                <span>Pencapaian & Growth Bulanan: <span className="text-blue-400">{activeZoneMeta.name}</span></span>
              ) : (
                <span>Achievement & YoY Growth Analysis</span>
              )}
            </h2>

            {chartView === 'ZONE_MONTHLY' && activeZoneMeta ? (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Januari - Juli 2026
              </span>
            ) : (
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isDarkMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200'
              }`}>
                Bar (Rp M) + Line (% YoY)
              </span>
            )}
          </div>
          
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {chartView === 'ZONE_MONTHLY' && activeZoneMeta ? (
              <span>Menampilkan rincian performa pencapaian bulanan (Target vs Realisasi) dan laju Growth YoY untuk <strong>{activeZoneMeta.name}</strong>.</span>
            ) : (
              <span>Klik pada salah satu batang zona di bawah untuk melihat rincian pencapaian tiap bulan & pertumbuhan YoY.</span>
            )}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {chartView === 'ZONE_MONTHLY' && (
            <button
              id="btn-back-to-all-zones"
              onClick={handleResetToAllZones}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isDarkMode 
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white' 
                  : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Semua Zona
            </button>
          )}

          <div className={`inline-flex p-1 rounded-xl border text-xs font-medium ${
            isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-zinc-100 border-zinc-200'
          }`}>
            <button
              id="tab-chart-zones"
              onClick={() => {
                setActiveZoneCode(null);
                setChartView('ZONES');
                if (onSelectZone) onSelectZone('ALL');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                chartView === 'ZONES'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Semua Zona ({zones.length})
            </button>
            
            <button
              id="tab-chart-depts"
              onClick={() => setChartView('DEPARTMENTS')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                chartView === 'DEPARTMENTS'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Departemen ({departments.length})
            </button>

            <button
              id="tab-chart-trend"
              onClick={() => {
                setActiveZoneCode(null);
                setChartView('MONTHLY_TREND');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                chartView === 'MONTHLY_TREND'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Tren Total (Jan-Jul)
            </button>
          </div>
        </div>
      </div>

      {/* Zone Quick Switcher Pills */}
      <div className="flex items-center gap-2 pb-3 mb-4 overflow-x-auto text-xs border-b border-zinc-800/60">
        <span className="text-[11px] font-semibold text-zinc-500 whitespace-nowrap">Pilih Zona:</span>
        {Object.values(ZONES_META).map(z => {
          const isSelected = activeZoneCode === z.code && chartView === 'ZONE_MONTHLY';
          return (
            <button
              key={z.code}
              id={`pill-zone-${z.code}`}
              onClick={() => handleZoneClick(z.code)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xs'
                  : isDarkMode
                    ? 'bg-[#121214] border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <span 
                className="w-2 h-2 rounded-full inline-block" 
                style={{ backgroundColor: z.color }} 
              />
              <span>{z.name}</span>
            </button>
          );
        })}
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={currentChartData}
            margin={{ top: 20, right: 20, bottom: 25, left: 10 }}
            onClick={(state: any) => {
              if (state && state.activePayload && state.activePayload.length) {
                const item = state.activePayload[0].payload;
                if (chartView === 'ZONES' && item.code) {
                  // Direct drilldown into this zone's monthly trend
                  handleZoneClick(item.code);
                } else if (chartView === 'DEPARTMENTS' && onSelectDept && item.code) {
                  onSelectDept(item.code);
                }
              }
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? '#27272a' : '#e4e4e7'} 
              opacity={0.8} 
            />
            
            {/* X Axis */}
            <XAxis 
              dataKey="name" 
              tick={{ fill: isDarkMode ? '#a1a1aa' : '#71717a', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: isDarkMode ? '#3f3f46' : '#d4d4d8' }}
              interval={0}
              angle={chartView === 'DEPARTMENTS' ? -25 : 0}
              textAnchor={chartView === 'DEPARTMENTS' ? 'end' : 'middle'}
            />

            {/* Left Y Axis for Nominal (Miliar IDR) */}
            <YAxis 
              yAxisId="left" 
              orientation="left"
              tick={{ fill: isDarkMode ? '#a1a1aa' : '#71717a', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: isDarkMode ? '#3f3f46' : '#d4d4d8' }}
              tickFormatter={(v) => `${v} M`}
            />

            {/* Right Y Axis for Percentage Growth */}
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tick={{ fill: isDarkMode ? '#a1a1aa' : '#71717a', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: isDarkMode ? '#3f3f46' : '#d4d4d8' }}
              tickFormatter={(v) => `${v}%`}
            />

            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ fontSize: '12px', color: isDarkMode ? '#d4d4d8' : '#52525b' }}
            />

            {/* Realisasi Bar */}
            <Bar 
              yAxisId="left" 
              dataKey="realisasiM" 
              name="Realisasi (Miliar Rp)" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
              maxBarSize={chartView === 'ZONE_MONTHLY' ? 36 : 40}
              cursor={chartView === 'ZONES' ? 'pointer' : 'default'}
            >
              {currentChartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    chartView === 'ZONES' 
                      ? entry.color 
                      : entry.achievementPct >= 100 
                        ? '#10B981' 
                        : entry.achievementPct >= 85 
                          ? '#F59E0B' 
                          : '#F43F5E'
                  } 
                />
              ))}
            </Bar>

            {/* Target Bar */}
            <Bar 
              yAxisId="left" 
              dataKey="targetM" 
              name="Target (Miliar Rp)" 
              fill={isDarkMode ? '#27272a' : '#e4e4e7'} 
              radius={[4, 4, 0, 0]}
              maxBarSize={chartView === 'ZONE_MONTHLY' ? 36 : 40}
            />

            {/* Growth Line */}
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="growthPct" 
              name="Growth YoY (%)" 
              stroke="#38BDF8" 
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: '#38BDF8', strokeWidth: 1.5, stroke: '#09090b' }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* MONTHLY BREAKDOWN CARDS (Visible when a Zone is clicked/selected) */}
      {chartView === 'ZONE_MONTHLY' && activeZoneMeta && (
        <div className="mt-6 pt-5 border-t border-zinc-800 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">
                Rincian Pencapaian & Growth Bulanan: {activeZoneMeta.name}
              </h3>
            </div>
            <span className="text-xs text-zinc-400">
              Total 7 Bulan (Januari - Juli)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {zoneMonthlyData.map((m) => {
              const isAchvGood = m.achievementPct >= 100;
              const isGrowthGood = m.growthPct >= 0;

              return (
                <div 
                  key={m.monthKey}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/70">
                    <span className="font-bold text-xs text-zinc-200">{m.monthKey}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isAchvGood 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {formatPct(m.achievementPct)}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-zinc-500">Realisasi:</span>
                      <span className="font-bold text-zinc-100 font-mono text-[11px]">{m.realisasiM} M</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-zinc-500">Target:</span>
                      <span className="text-zinc-400 font-mono text-[11px]">{m.targetM} M</span>
                    </div>

                    <div className="flex justify-between items-center pt-1.5 mt-1 border-t border-zinc-800/50">
                      <span className="text-[11px] text-zinc-500">Growth:</span>
                      <span className={`font-bold font-mono text-[11px] flex items-center gap-0.5 ${
                        isGrowthGood ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {isGrowthGood ? (
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-rose-400" />
                        )}
                        {formatPct(m.growthPct, true)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chart Footer Insight */}
      <div className={`mt-5 pt-3.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
        isDarkMode ? 'border-zinc-800 text-zinc-400' : 'border-zinc-100 text-zinc-500'
      }`}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>
            {chartView === 'ZONES' 
              ? 'Klik batang zona mana saja untuk membuka grafik & rincian pencapaian tiap bulan + Growth YoY.' 
              : 'Klik "Kembali ke Semua Zona" untuk kembali ke ringkasan per zona.'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> On Track (≥100%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Warning (85-99%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Critical (&lt;85%)
          </span>
        </div>
      </div>

    </div>
  );
};
