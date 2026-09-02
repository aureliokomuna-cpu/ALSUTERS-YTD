import React from 'react';
import { 
  Building2, 
  Moon, 
  Sun, 
  RefreshCw, 
  Download, 
  Layers, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { FilterState } from '../types';

interface HeaderProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onExport: () => void;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({
  filter,
  setFilter,
  isDarkMode,
  setIsDarkMode,
  onRefresh,
  isRefreshing,
  onExport,
  lastUpdated,
}) => {
  return (
    <header className={`w-full border-b transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#09090b]/90 border-zinc-800 text-zinc-100' 
        : 'bg-white/90 border-zinc-200 text-zinc-900 shadow-xs'
    } backdrop-blur-md sticky top-0 z-30`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">
                DEPARTEMEN ALSUTERS 2026
              </h1>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Auto-Sync Sheets
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Senior BI Intelligence Portal &bull; Real-time Analytics &bull; Last synced: {lastUpdated}
            </p>
          </div>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Dataset Metric Mode Selector */}
          <div className={`inline-flex p-1 rounded-xl border text-xs font-medium ${
            isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-zinc-100 border-zinc-200'
          }`}>
            <button
              id="btn-mode-total"
              onClick={() => setFilter(prev => ({ ...prev, metricMode: 'TOTAL_RESTATED' }))}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                filter.metricMode === 'TOTAL_RESTATED'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Total Restated
            </button>
            <button
              id="btn-mode-lfl"
              onClick={() => setFilter(prev => ({ ...prev, metricMode: 'LIKE_FOR_LIKE' }))}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                filter.metricMode === 'LIKE_FOR_LIKE'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Like-For-Like (LFL)
            </button>
          </div>

          {/* Sync Refresh Button */}
          <button
            id="btn-refresh-data"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Sinkronisasi data dari Google Sheets"
            className={`px-3 py-2 rounded-xl border transition-all text-xs font-medium flex items-center gap-1.5 ${
              isDarkMode 
                ? 'bg-[#18181b] border-zinc-800 hover:bg-zinc-800 text-zinc-200' 
                : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700 shadow-xs'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-500' : 'text-zinc-400'}`} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>

          {/* Export Report Button */}
          <button
            id="btn-export-report"
            onClick={onExport}
            className={`px-3 py-2 rounded-xl border transition-all text-xs font-medium flex items-center gap-1.5 ${
              isDarkMode 
                ? 'bg-[#18181b] border-zinc-800 hover:bg-zinc-800 text-zinc-200' 
                : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700 shadow-xs'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            id="btn-toggle-theme"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
            className={`p-2 rounded-xl border transition-all ${
              isDarkMode 
                ? 'bg-[#18181b] border-zinc-800 hover:bg-zinc-800 text-amber-400' 
                : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700 shadow-xs'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
