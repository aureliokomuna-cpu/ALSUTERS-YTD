import React, { useState } from 'react';
import { 
  Table as TableIcon, 
  ChevronDown, 
  ChevronRight, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon,
  ExternalLink,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { DepartmentItem, FilterState, ZoneGroup } from '../types';
import { formatIDR, formatPct, getMetricForPeriod, getPerformanceStatus, ZONES_META } from '../data/dataset';

interface ZoneDetailTableProps {
  zones: ZoneGroup[];
  departments: DepartmentItem[];
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  isDarkMode: boolean;
  onSelectDept: (code: string) => void;
  onSelectZone: (zoneCode: string) => void;
}

export const ZoneDetailTable: React.FC<ZoneDetailTableProps> = ({
  zones,
  departments,
  filter,
  setFilter,
  isDarkMode,
  onSelectDept,
  onSelectZone
}) => {
  // State for expanded zones
  const [expandedZones, setExpandedZones] = useState<Record<string, boolean>>({
    LZ: true,
    DZ: true,
    CZ: true,
    SZ: true,
    ICF: true
  });

  const toggleZone = (zCode: string) => {
    setExpandedZones(prev => ({
      ...prev,
      [zCode]: !prev[zCode]
    }));
  };

  const expandAll = () => {
    const allExp: Record<string, boolean> = {};
    zones.forEach(z => { allExp[z.zoneCode] = true; });
    setExpandedZones(allExp);
  };

  const collapseAll = () => {
    setExpandedZones({});
  };

  const handleSort = (field: 'achievementPct' | 'growthPct' | 'achievement' | 'target' | 'name') => {
    setFilter(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };

  const renderStatusBadge = (status: 'on_track' | 'warning' | 'critical', pct: number) => {
    if (status === 'on_track') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          On Track
        </span>
      );
    }
    if (status === 'warning') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          Warning
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
        <AlertOctagon className="w-3 h-3 text-rose-400" />
        Critical
      </span>
    );
  };

  return (
    <div className={`w-full rounded-2xl border transition-all overflow-hidden ${
      isDarkMode 
        ? 'bg-[#18181b] border-zinc-800' 
        : 'bg-white border-zinc-200 shadow-xs'
    }`}>
      
      {/* Table Header Controls */}
      <div className="p-5 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 text-white">
              <TableIcon className="w-5 h-5 text-blue-500" />
              Zone & Department Performance Breakdown
            </h2>
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              isDarkMode ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-zinc-100 text-zinc-700'
            }`}>
              Periode: {filter.period}
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Click any row to view 12-month historical trends and Like-For-Like (LFL) drilldown.
          </p>
        </div>

        {/* Expand / Collapse Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            id="btn-expand-all"
            onClick={expandAll}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
              isDarkMode ? 'bg-[#121214] border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            Buka Semua Zona
          </button>
          <button
            id="btn-collapse-all"
            onClick={collapseAll}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
              isDarkMode ? 'bg-[#121214] border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            Tutup Semua
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className={`border-b text-xs uppercase tracking-wider font-semibold ${
            isDarkMode ? 'bg-[#121214] border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'
          }`}>
            <tr>
              <th className="py-3.5 pl-6 pr-4 cursor-pointer hover:text-zinc-200" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1.5">
                  <span>Zona & Departemen</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200" onClick={() => handleSort('target')}>
                <div className="flex items-center justify-end gap-1.5">
                  <span>Target {filter.period}</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200" onClick={() => handleSort('achievement')}>
                <div className="flex items-center justify-end gap-1.5">
                  <span>Realisasi YTD</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200" onClick={() => handleSort('achievementPct')}>
                <div className="flex items-center justify-end gap-1.5">
                  <span>% Pencapaian</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-200" onClick={() => handleSort('growthPct')}>
                <div className="flex items-center justify-end gap-1.5">
                  <span>% Growth YoY</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-3.5 px-4 text-right hidden md:table-cell">
                <span>Actual LY</span>
              </th>

              <th className="py-3.5 pr-6 pl-4 text-center">
                <span>Status</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/60">
            {zones.map(zone => {
              const isExpanded = !!expandedZones[zone.zoneCode];
              const zoneMeta = ZONES_META[zone.zoneCode];

              return (
                <React.Fragment key={zone.zoneCode}>
                  {/* ZONE GROUP SUMMARY ROW */}
                  <tr 
                    className={`font-semibold cursor-pointer transition-colors ${
                      isDarkMode 
                        ? 'bg-zinc-900/80 hover:bg-zinc-900 text-zinc-100' 
                        : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-900'
                    }`}
                    onClick={() => toggleZone(zone.zoneCode)}
                  >
                    <td className="py-3.5 pl-5 pr-4 flex items-center gap-2.5">
                      <span className={`p-1 rounded-md transition-transform ${isExpanded ? 'text-blue-400' : 'text-zinc-500'}`}>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </span>
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full inline-block" 
                          style={{ backgroundColor: zoneMeta?.color || '#3B82F6' }}
                        />
                        <span className="font-bold text-sm tracking-wide">
                          {zone.zoneName}
                        </span>
                        <span className="text-xs font-normal text-zinc-400">
                          ({zone.departments.length} Dept)
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-medium text-zinc-300">
                      {formatIDR(zone.target)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      {formatIDR(zone.achievement)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className={`font-extrabold font-mono ${zone.achievementPct >= 100 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {formatPct(zone.achievementPct)}
                        </span>
                        <div className="w-16 bg-zinc-800 rounded-full h-1 mt-1 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${zone.achievementPct >= 100 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                            style={{ width: `${Math.min(zone.achievementPct, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-mono font-bold flex items-center justify-end gap-0.5 ${zone.growthPct >= 0 ? 'text-blue-400' : 'text-amber-400'}`}>
                        {zone.growthPct >= 0 ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
                        )}
                        {formatPct(zone.growthPct, true)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-zinc-400 hidden md:table-cell">
                      {formatIDR(zone.actualLY)}
                    </td>

                    <td className="py-3.5 pr-6 pl-4 text-center">
                      {renderStatusBadge(zone.status, zone.achievementPct)}
                    </td>
                  </tr>

                  {/* SUB-DEPARTMENT ROWS */}
                  {isExpanded && zone.departments.map(dept => {
                    const metric = getMetricForPeriod(dept, filter.period, filter.metricMode);
                    const status = getPerformanceStatus(metric.achievementPct);

                    return (
                      <tr
                        key={dept.code}
                        onClick={() => onSelectDept(dept.code)}
                        className={`transition-colors cursor-pointer group ${
                          isDarkMode 
                            ? 'bg-[#121214]/60 hover:bg-zinc-800/40 text-zinc-200' 
                            : 'bg-white hover:bg-zinc-50 text-zinc-800'
                        }`}
                      >
                        <td className="py-3 pl-12 pr-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-blue-400">
                                {dept.code}
                              </span>
                              <span className="font-medium group-hover:text-blue-400 transition-colors">
                                {dept.name}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity" />
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right font-mono text-xs text-zinc-400">
                          {formatIDR(metric.target)}
                        </td>

                        <td className="py-3 px-4 text-right font-mono text-xs font-semibold text-zinc-100">
                          {formatIDR(metric.achievement)}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <span className={`font-mono text-xs font-bold ${metric.achievementPct >= 100 ? 'text-emerald-400' : metric.achievementPct >= 85 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {formatPct(metric.achievementPct)}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <span className={`font-mono text-xs font-medium ${metric.growthPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {formatPct(metric.growthPct, true)}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right font-mono text-xs text-zinc-400 hidden md:table-cell">
                          {formatIDR(metric.actualLY)}
                        </td>

                        <td className="py-3 pr-6 pl-4 text-center">
                          {renderStatusBadge(status, metric.achievementPct)}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
