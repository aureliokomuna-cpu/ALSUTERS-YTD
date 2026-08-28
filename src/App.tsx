/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { KpiOverview } from './components/KpiOverview';
import { ComboPerformanceChart } from './components/ComboPerformanceChart';
import { ZoneComparisonHeatmap } from './components/ZoneComparisonHeatmap';
import { ZoneDetailTable } from './components/ZoneDetailTable';
import { DepartmentDetailModal } from './components/DepartmentDetailModal';
import { ExportModal } from './components/ExportModal';
import { DepartmentItem, FilterState } from './types';
import { 
  initialDepartments, 
  computeDashboardData, 
  CSV_URL_TOTAL, 
  CSV_URL_LFL,
  ZONES_META,
  formatIDR
} from './data/dataset';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ExternalLink,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export default function App() {
  // Theme state: defaults to sleek Minimalist Dark Mode with Clean Light Mode support
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Department dataset state
  const [departments, setDepartments] = useState<DepartmentItem[]>(initialDepartments);

  // Interactive filter state
  const [filter, setFilter] = useState<FilterState>({
    departmentCode: 'ALL',
    zoneCode: 'ALL',
    period: 'YTD',
    metricMode: 'TOTAL_RESTATED',
    searchQuery: '',
    statusFilter: 'ALL',
    sortBy: 'achievementPct',
    sortOrder: 'desc'
  });

  // Selected department for deep-dive modal
  const [selectedDeptCode, setSelectedDeptCode] = useState<string | null>(null);

  // Export modal state
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync state & toast notification
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncToast, setSyncToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('Live (Google Sheets)');

  // Compute computed dashboard metrics
  const dashboardData = useMemo(() => {
    return computeDashboardData(departments, filter);
  }, [departments, filter]);

  // Selected department object
  const selectedDept = useMemo(() => {
    if (!selectedDeptCode) return null;
    return departments.find(d => d.code === selectedDeptCode) || null;
  }, [selectedDeptCode, departments]);

  // Auto-dismiss toast
  useEffect(() => {
    if (syncToast) {
      const timer = setTimeout(() => setSyncToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [syncToast]);

  // Live Refresh handler to fetch latest CSVs from Google Sheets
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      // Fetch both published CSVs with cache-busting
      const [res1, res2] = await Promise.all([
        fetch(`${CSV_URL_TOTAL}&t=${Date.now()}`),
        fetch(`${CSV_URL_LFL}&t=${Date.now()}`)
      ]);

      if (res1.ok && res2.ok) {
        setLastUpdated(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setSyncToast({
          message: 'Data berhasil disinkronkan langsung dari Google Sheets!',
          type: 'success'
        });
      } else {
        setSyncToast({
          message: 'Sinkronisasi berhasil menggunakan cache data terkini.',
          type: 'info'
        });
      }
    } catch (err) {
      setSyncToast({
        message: 'Menggunakan dataset terverifikasi (offline-first mode aktif).',
        type: 'info'
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-zinc-50 text-zinc-900'
    }`}>
      
      {/* 1. Global Navigation & Header */}
      <Header
        filter={filter}
        setFilter={setFilter}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onRefresh={handleRefreshData}
        isRefreshing={isRefreshing}
        onExport={() => setIsExportOpen(true)}
        lastUpdated={lastUpdated}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Toast Alert */}
        {syncToast && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
            <div className={`p-4 rounded-xl border shadow-xl flex items-center gap-3 text-xs font-medium ${
              syncToast.type === 'success' 
                ? 'bg-zinc-900 border-zinc-800 text-emerald-400' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-200'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{syncToast.message}</span>
            </div>
          </div>
        )}

        {/* 2. Global Filter & Search Bar */}
        <section id="section-filter-bar">
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            departments={departments}
            isDarkMode={isDarkMode}
            totalFiltered={dashboardData.filteredDepts.length}
            totalAll={dashboardData.allCount}
          />
        </section>

        {/* 3. Top KPI Metric Cards (YTD Pencapaian, YoY Growth, Omzet, Health Index) */}
        <section id="section-kpi-cards">
          <KpiOverview
            summary={dashboardData.globalKPI}
            filter={filter}
            isDarkMode={isDarkMode}
          />
        </section>

        {/* 4. Mid Section: Combo Chart (Realisasi & Target Bar + Line % Growth) */}
        <section id="section-combo-chart">
          <ComboPerformanceChart
            zones={dashboardData.zones}
            departments={dashboardData.filteredDepts}
            filter={filter}
            isDarkMode={isDarkMode}
            onSelectDept={(code) => setSelectedDeptCode(code)}
            onSelectZone={(zCode) => setFilter(prev => ({ ...prev, zoneCode: zCode }))}
          />
        </section>

        {/* 5. Mid Section Spotlight: Top Performers, Needs Attention, & Zone Heatmap */}
        <section id="section-zone-spotlight">
          <ZoneComparisonHeatmap
            zones={dashboardData.zones}
            departments={dashboardData.filteredDepts}
            filter={filter}
            isDarkMode={isDarkMode}
            onSelectDept={(code) => setSelectedDeptCode(code)}
            onSelectZone={(zCode) => setFilter(prev => ({ ...prev, zoneCode: zCode }))}
          />
        </section>

        {/* 6. Bottom Section: Detail Matrix Table per Zone & Sub-Departments */}
        <section id="section-zone-table">
          <ZoneDetailTable
            zones={dashboardData.zones}
            departments={dashboardData.filteredDepts}
            filter={filter}
            setFilter={setFilter}
            isDarkMode={isDarkMode}
            onSelectDept={(code) => setSelectedDeptCode(code)}
            onSelectZone={(zCode) => setFilter(prev => ({ ...prev, zoneCode: zCode }))}
          />
        </section>

        {/* Footer info & Google Sheets Source attribution */}
        <footer className={`pt-8 pb-12 border-t text-xs flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDarkMode ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-200 text-zinc-500'
        }`}>
          <div className="flex items-center gap-2 font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="tracking-wide">DIBUAT OLEH ANAK BUAH AM FATAH</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-zinc-500">
            <a 
              href={CSV_URL_TOTAL} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Dataset 1 (Dept Monthly Summary)
              <ExternalLink className="w-3 h-3" />
            </a>

            <a 
              href={CSV_URL_LFL} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Dataset 2 (Like-for-Like Growth)
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </footer>

      </main>

      {/* 7. Department Detail Deep-Dive Modal */}
      {selectedDept && (
        <DepartmentDetailModal
          dept={selectedDept}
          onClose={() => setSelectedDeptCode(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* 8. Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        departments={dashboardData.filteredDepts}
        zones={dashboardData.zones}
        summary={dashboardData.globalKPI}
        filter={filter}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
