import React from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Briefcase, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  X
} from 'lucide-react';
import { DepartmentItem, FilterState, StatusCategory } from '../types';
import { PERIOD_OPTIONS, ZONES_META } from '../data/dataset';

interface FilterBarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  departments: DepartmentItem[];
  isDarkMode: boolean;
  totalFiltered: number;
  totalAll: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  setFilter,
  departments,
  isDarkMode,
  totalFiltered,
  totalAll
}) => {
  const regularDepts = departments.filter(d => !d.isZoneTotal && !d.isGrandTotal);

  // Group departments by zone for dropdown display
  const deptsByZone = React.useMemo(() => {
    const grouped: Record<string, DepartmentItem[]> = {};
    regularDepts.forEach(d => {
      if (!grouped[d.zoneCode]) grouped[d.zoneCode] = [];
      grouped[d.zoneCode].push(d);
    });
    return grouped;
  }, [regularDepts]);

  const handleReset = () => {
    setFilter({
      departmentCode: 'ALL',
      zoneCode: 'ALL',
      period: 'YTD',
      metricMode: filter.metricMode,
      searchQuery: '',
      statusFilter: 'ALL',
      sortBy: 'achievementPct',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = 
    filter.departmentCode !== 'ALL' || 
    filter.zoneCode !== 'ALL' || 
    filter.period !== 'YTD' || 
    filter.searchQuery !== '' || 
    filter.statusFilter !== 'ALL';

  return (
    <div className={`w-full rounded-2xl border p-4 sm:p-5 transition-all ${
      isDarkMode 
        ? 'bg-[#18181b] border-zinc-800 shadow-xl shadow-black/20' 
        : 'bg-white border-zinc-200 shadow-xs'
    }`}>
      
      {/* Top Row: Global Search and Dropdown Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* 1. Global Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className={`w-4 h-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
          </div>
          <input
            id="input-global-search"
            type="text"
            value={filter.searchQuery}
            onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Global Search / Cari Departemen..."
            className={`w-full pl-10 pr-9 py-2.5 rounded-xl border text-sm font-medium transition-colors outline-none focus:ring-1 focus:ring-blue-500 ${
              isDarkMode 
                ? 'bg-[#121214] border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:border-blue-500' 
                : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-blue-500'
            }`}
          />
          {filter.searchQuery && (
            <button
              onClick={() => setFilter(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. Pilihan Zona */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <MapPin className="w-4 h-4 text-blue-400" />
          </div>
          <select
            id="select-zone"
            value={filter.zoneCode}
            onChange={(e) => {
              const val = e.target.value;
              setFilter(prev => ({ 
                ...prev, 
                zoneCode: val,
                // Reset department if it does not belong to the selected zone
                departmentCode: val === 'ALL' ? prev.departmentCode : 'ALL'
              }));
            }}
            className={`w-full pl-10 pr-8 py-2.5 rounded-xl border text-sm font-medium appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-blue-500 ${
              isDarkMode 
                ? 'bg-[#121214] border-zinc-800 text-zinc-200 focus:border-blue-500' 
                : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-blue-500'
            }`}
          >
            <option value="ALL">Semua Zona (5 Zona)</option>
            {Object.values(ZONES_META).map(zone => (
              <option key={zone.code} value={zone.code}>
                {zone.name} ({zone.shortName})
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
            <Filter className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 3. Pilihan Departemen */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <select
            id="select-department"
            value={filter.departmentCode}
            onChange={(e) => setFilter(prev => ({ ...prev, departmentCode: e.target.value }))}
            className={`w-full pl-10 pr-8 py-2.5 rounded-xl border text-sm font-medium appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-blue-500 ${
              isDarkMode 
                ? 'bg-[#121214] border-zinc-800 text-zinc-200 focus:border-blue-500' 
                : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-blue-500'
            }`}
          >
            <option value="ALL">Semua Departemen ({regularDepts.length})</option>
            {Object.keys(deptsByZone).map(zCode => {
              const zoneDepts = deptsByZone[zCode] || [];
              const zoneLabel = ZONES_META[zCode]?.name || zCode;
              if (filter.zoneCode !== 'ALL' && filter.zoneCode !== zCode) return null;

              return (
                <optgroup key={zCode} label={zoneLabel}>
                  {zoneDepts.map(dept => (
                    <option key={dept.code} value={dept.code}>
                      [{dept.code}] {dept.name}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
            <Filter className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 4. Range Tanggal / Periode */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <select
            id="select-period"
            value={filter.period}
            onChange={(e) => setFilter(prev => ({ ...prev, period: e.target.value as any }))}
            className={`w-full pl-10 pr-8 py-2.5 rounded-xl border text-sm font-medium appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-blue-500 ${
              isDarkMode 
                ? 'bg-[#121214] border-zinc-800 text-zinc-200 focus:border-blue-500' 
                : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-blue-500'
            }`}
          >
            <optgroup label="Ikhtisar (Overview)">
              {PERIOD_OPTIONS.filter(p => p.group === 'Overview').map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </optgroup>
            <optgroup label="Kuartal">
              {PERIOD_OPTIONS.filter(p => p.group === 'Quarter').map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </optgroup>
            <optgroup label="Bulanan (Monthly)">
              {PERIOD_OPTIONS.filter(p => p.group === 'Monthly').map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </optgroup>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
            <Calendar className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Bottom Row: Quick Status Filter Pills & Results Counter */}
      <div className="mt-3.5 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`font-semibold mr-1 uppercase tracking-wider text-[11px] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Status:
          </span>

          <button
            id="filter-status-all"
            onClick={() => setFilter(prev => ({ ...prev, statusFilter: 'ALL' }))}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filter.statusFilter === 'ALL'
                ? isDarkMode ? 'bg-zinc-800 text-white font-semibold' : 'bg-zinc-800 text-white font-semibold'
                : isDarkMode ? 'bg-zinc-900 text-zinc-400 hover:text-zinc-200' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Semua ({regularDepts.length})
          </button>

          <button
            id="filter-status-ontrack"
            onClick={() => setFilter(prev => ({ ...prev, statusFilter: 'on_track' as StatusCategory }))}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              filter.statusFilter === 'on_track'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                : isDarkMode ? 'bg-zinc-900 text-emerald-400/80 border border-zinc-800 hover:border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            On Track (≥ 100%)
          </button>

          <button
            id="filter-status-warning"
            onClick={() => setFilter(prev => ({ ...prev, statusFilter: 'warning' as StatusCategory }))}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              filter.statusFilter === 'warning'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold'
                : isDarkMode ? 'bg-zinc-900 text-amber-400/80 border border-zinc-800 hover:border-amber-500/30' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Warning (85% - 99%)
          </button>

          <button
            id="filter-status-critical"
            onClick={() => setFilter(prev => ({ ...prev, statusFilter: 'critical' as StatusCategory }))}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              filter.statusFilter === 'critical'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 font-semibold'
                : isDarkMode ? 'bg-zinc-900 text-rose-400/80 border border-zinc-800 hover:border-rose-500/30' : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            Critical (&lt; 85%)
          </button>
        </div>

        {/* Results & Reset */}
        <div className="flex items-center gap-3">
          <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}>
            Menampilkan <strong className={isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}>{totalFiltered}</strong> dari {totalAll} Departemen
          </span>

          {hasActiveFilters && (
            <button
              id="btn-reset-filters"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline-offset-4 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filter
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
