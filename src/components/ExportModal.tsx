import React from 'react';
import { X, FileSpreadsheet, FileText, Download, Check, Sparkles } from 'lucide-react';
import { DepartmentItem, FilterState, GlobalKPISummary, ZoneGroup } from '../types';
import { formatIDR, formatPct, getMetricForPeriod } from '../data/dataset';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  departments: DepartmentItem[];
  zones: ZoneGroup[];
  summary: GlobalKPISummary;
  filter: FilterState;
  isDarkMode: boolean;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  departments,
  zones,
  summary,
  filter,
  isDarkMode
}) => {
  if (!isOpen) return null;

  const handleExportCSV = () => {
    const headers = [
      'Zone Code',
      'Zone Name',
      'Dept Code',
      'Dept Name',
      `Target (${filter.period})`,
      `Realisasi (${filter.period})`,
      '% Achievement',
      'Actual LY',
      '% Growth YoY',
      'Status'
    ];

    const rows = departments.map(d => {
      const m = getMetricForPeriod(d, filter.period, filter.metricMode);
      const status = m.achievementPct >= 100 ? 'On Track' : m.achievementPct >= 85 ? 'Warning' : 'Critical';
      return [
        `"${d.zoneCode}"`,
        `"${d.zoneName}"`,
        `"${d.code}"`,
        `"${d.name}"`,
        m.target,
        m.achievement,
        `"${m.achievementPct.toFixed(2)}%"`,
        m.actualLY,
        `"${m.growthPct.toFixed(2)}%"`,
        `"${status}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DEPARTEMEN_ALSUTERS_2026_${filter.period}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const dataToExport = {
      title: 'DEPARTEMEN ALSUTERS 2026',
      exportedAt: new Date().toISOString(),
      filterApplied: filter,
      kpiSummary: summary,
      departments: departments.map(d => ({
        code: d.code,
        name: d.name,
        zone: d.zoneName,
        metrics: getMetricForPeriod(d, filter.period, filter.metricMode)
      }))
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `DEPARTEMEN_ALSUTERS_2026_${filter.period}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
        isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
      }`}>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Export Laporan & Dataset</h3>
              <p className="text-xs text-zinc-400">Pilih format unduhan data performa</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Export Options */}
        <div className="space-y-3 mt-4">
          
          {/* CSV Button */}
          <button
            onClick={handleExportCSV}
            className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group hover:border-emerald-500/50 ${
              isDarkMode ? 'bg-[#121214] border-zinc-800 hover:bg-zinc-800/40' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-sm block text-zinc-100">Export CSV / Excel</span>
                <span className="text-xs text-zinc-400">Tabel data ({departments.length} Dept) untuk spreadsheet</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
          </button>

          {/* JSON Button */}
          <button
            onClick={handleExportJSON}
            className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group hover:border-blue-500/50 ${
              isDarkMode ? 'bg-[#121214] border-zinc-800 hover:bg-zinc-800/40' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-sm block text-zinc-100">Export JSON Dataset</span>
                <span className="text-xs text-zinc-400">Format data mentah terstruktur & KPI summary</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" />
          </button>

          {/* Print / PDF Button */}
          <button
            onClick={handlePrint}
            className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group hover:border-blue-500/50 ${
              isDarkMode ? 'bg-[#121214] border-zinc-800 hover:bg-zinc-800/40' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-sm block text-zinc-100">Print / Simpan PDF</span>
                <span className="text-xs text-zinc-400">Cetak laporan ringkas eksekutif</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" />
          </button>

        </div>

        <div className="mt-5 pt-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
          >
            Tutup
          </button>
        </div>

      </div>

    </div>
  );
};
