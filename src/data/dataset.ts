import { DepartmentItem, FilterState, GlobalKPISummary, MonthKey, PeriodSelection, PerformanceMetric, StatusCategory, ZoneGroup } from '../types';
import rawData from './rawDataset.json';

export const CSV_URL_TOTAL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRlXvmUHEiaU0TWKjdKzAK6pkX-n5Xc-RdEU5aNZtzGEMSDMXxStPIMYmfJlDjHiKCU0oPdET_ZEzc/pub?gid=1697114944&single=true&output=csv';
export const CSV_URL_LFL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRlXvmUHEiaU0TWKjdKzAK6pkX-n5Xc-RdEU5aNZtzGEMSDMXxStPIMYmfJlDjHiKCU0oPdET_ZEzc/pub?gid=1805434721&single=true&output=csv';

export interface ZoneMeta {
  code: string;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentGradient: string;
  description: string;
}

export const ZONES_META: Record<string, ZoneMeta> = {
  LZ: {
    code: 'LZ',
    name: 'LIVING ZONE',
    shortName: 'Living',
    color: '#3B82F6', // Blue
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    accentGradient: 'from-blue-500/20 to-indigo-500/20',
    description: 'Sofa & Chair, Table & Cabinet, Home Textile, Home Decore, Home Organizer, Bathroom'
  },
  DZ: {
    code: 'DZ',
    name: 'DINING ZONE',
    shortName: 'Dining & Appliances',
    color: '#10B981', // Emerald/Mint
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    accentGradient: 'from-emerald-500/20 to-teal-500/20',
    description: 'Dining, Kitchen, Classic, Homeware, Lighting, KELS Appliances'
  },
  CZ: {
    code: 'CZ',
    name: 'COMMERCIAL ZONE',
    shortName: 'Commercial',
    color: '#06B6D4', // Cyan/Teal
    bgColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
    accentGradient: 'from-cyan-500/20 to-blue-500/20',
    description: 'Office, Office Seating, Commercial & Business Solutions'
  },
  SZ: {
    code: 'SZ',
    name: 'SLEEPING ZONE',
    shortName: 'Sleeping & Galleria',
    color: '#F59E0B', // Amber
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    accentGradient: 'from-amber-500/20 to-orange-500/20',
    description: 'Bedroom, Kids Space, Mattress, Textile Bedding, Home Galleria'
  },
  ICF: {
    code: 'ICF',
    name: 'ICF ZONE',
    shortName: 'Informa Custom Furniture',
    color: '#8B5CF6', // Purple/Violet
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    accentGradient: 'from-purple-500/20 to-violet-500/20',
    description: 'Custom Furniture (ICF), COMSER & FURNIPRO'
  }
};

export const PERIOD_OPTIONS: { id: PeriodSelection; label: string; group: 'Overview' | 'Quarter' | 'Monthly' }[] = [
  { id: 'YTD', label: 'YTD (Year-to-Date)', group: 'Overview' },
  { id: 'YTD_SEMESTER_1', label: 'Semester 1 (H1)', group: 'Overview' },
  { id: 'Q1', label: 'Kuartal 1 (Q1: Jan-Mar)', group: 'Quarter' },
  { id: 'Q2', label: 'Kuartal 2 (Q2: Apr-Jun)', group: 'Quarter' },
  { id: 'Q3', label: 'Kuartal 3 (Q3: Jul-Sep)', group: 'Quarter' },
  { id: 'Q4', label: 'Kuartal 4 (Q4: Okt-Des)', group: 'Quarter' },
  { id: 'JANUARI', label: 'Januari', group: 'Monthly' },
  { id: 'FEBRUARI', label: 'Februari', group: 'Monthly' },
  { id: 'MARET', label: 'Maret', group: 'Monthly' },
  { id: 'APRIL', label: 'April', group: 'Monthly' },
  { id: 'MEI', label: 'Mei', group: 'Monthly' },
  { id: 'JUNI', label: 'Juni', group: 'Monthly' },
  { id: 'JULI', label: 'Juli', group: 'Monthly' },
  { id: 'AGUSTUS', label: 'Agustus', group: 'Monthly' },
  { id: 'SEPTEMBER', label: 'September', group: 'Monthly' },
  { id: 'OKTOBER', label: 'Oktober', group: 'Monthly' },
  { id: 'NOVEMBER', label: 'November', group: 'Monthly' },
  { id: 'DESEMBER', label: 'Desember', group: 'Monthly' },
];

export const MONTH_KEYS: MonthKey[] = [
  'JANUARI',
  'FEBRUARI',
  'MARET',
  'APRIL',
  'MEI',
  'JUNI',
  'JULI',
  'AGUSTUS',
  'SEPTEMBER',
  'OKTOBER',
  'NOVEMBER',
  'DESEMBER',
];

export const DEPARTMENT_SQM: Record<string, { sqmEks: number; sqmRelayout: number }> = {
  AM: { sqmEks: 259, sqmRelayout: 259 },
  BA: { sqmEks: 2502, sqmRelayout: 2502 },
  BB: { sqmEks: 857, sqmRelayout: 857 },
  BC: { sqmEks: 1035, sqmRelayout: 1035 },
  BD: { sqmEks: 946, sqmRelayout: 946 },
  BE: { sqmEks: 179, sqmRelayout: 179 },
  BF: { sqmEks: 751, sqmRelayout: 855 },
  BG: { sqmEks: 392, sqmRelayout: 310 },
  BH: { sqmEks: 43, sqmRelayout: 43 },
  BI: { sqmEks: 457, sqmRelayout: 457 },
  BJ: { sqmEks: 516, sqmRelayout: 516 },
  BK: { sqmEks: 1192, sqmRelayout: 1192 },
  BL: { sqmEks: 823, sqmRelayout: 823 },
  BM: { sqmEks: 394, sqmRelayout: 394 },
  BN: { sqmEks: 867, sqmRelayout: 867 },
  BO: { sqmEks: 120, sqmRelayout: 120 },
  BP: { sqmEks: 871, sqmRelayout: 871 },
  BQ: { sqmEks: 425, sqmRelayout: 425 },
  BR: { sqmEks: 452, sqmRelayout: 452 },
  BS: { sqmEks: 493, sqmRelayout: 493 },
  DA: { sqmEks: 29, sqmRelayout: 29 },
  DB: { sqmEks: 116, sqmRelayout: 116 },
  DC: { sqmEks: 116, sqmRelayout: 116 },
  DD: { sqmEks: 13, sqmRelayout: 13 },
  'ALL KELS': { sqmEks: 274, sqmRelayout: 274 },
  FA: { sqmEks: 39, sqmRelayout: 39 },
  FB: { sqmEks: 0, sqmRelayout: 0 },
  AJ: { sqmEks: 0, sqmRelayout: 0 }
};

/**
 * Total Luasan Area Store ALSUTERS (18.346 m²)
 */
export const TOTAL_STORE_SQM = 18346;

export function getDeptSQM(code: string): number {
  return DEPARTMENT_SQM[code]?.sqmRelayout ?? 0;
}

export const initialDepartments: DepartmentItem[] = ((rawData as unknown) as DepartmentItem[]).map(d => {
  const sqmInfo = DEPARTMENT_SQM[d.code] || { sqmEks: 0, sqmRelayout: 0 };
  return {
    ...d,
    sqm: d.sqm ?? sqmInfo.sqmRelayout,
    sqmEks: d.sqmEks ?? sqmInfo.sqmEks
  };
});

/**
 * Determine all months that have recorded actual targets or achievements in the active dataset
 */
export function getActiveMonths(departments: DepartmentItem[]): MonthKey[] {
  const active: MonthKey[] = [];
  
  MONTH_KEYS.forEach(mKey => {
    const hasData = departments.some(d => {
      const m = d.monthly[mKey];
      return m && (m.target > 0 || m.achievement > 0);
    });
    if (hasData) {
      active.push(mKey);
    }
  });

  return active.length > 0 ? active : ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER'];
}

/**
 * Returns the list of month keys included in the selected period filter that are active.
 */
export function getMonthsInPeriod(period: PeriodSelection, activeMonths: MonthKey[] = MONTH_KEYS): MonthKey[] {
  if (period === 'YTD') {
    return activeMonths;
  }
  if (period === 'YTD_SEMESTER_1') {
    const sem1: MonthKey[] = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI'];
    return sem1.filter(m => activeMonths.includes(m));
  }
  if (period === 'Q1') {
    const q1: MonthKey[] = ['JANUARI', 'FEBRUARI', 'MARET'];
    return q1.filter(m => activeMonths.includes(m));
  }
  if (period === 'Q2') {
    const q2: MonthKey[] = ['APRIL', 'MEI', 'JUNI'];
    return q2.filter(m => activeMonths.includes(m));
  }
  if (period === 'Q3') {
    const q3: MonthKey[] = ['JULI', 'AGUSTUS', 'SEPTEMBER'];
    return q3.filter(m => activeMonths.includes(m));
  }
  if (period === 'Q4') {
    const q4: MonthKey[] = ['OKTOBER', 'NOVEMBER', 'DESEMBER'];
    return q4.filter(m => activeMonths.includes(m));
  }
  if (MONTH_KEYS.includes(period as MonthKey)) {
    return [period as MonthKey];
  }
  return activeMonths.length > 0 ? activeMonths : ['JANUARI'];
}

/**
 * Calculate Average Monthly Space Productivity for a single department in a given period.
 * Formula per user request:
 * For each month in the period: calculate productivity = Sales(month) / SQM.
 * Then take the average across all active months in that period.
 */
export function calculateDeptPeriodProductivity(
  dept: DepartmentItem,
  period: PeriodSelection,
  activeMonths: MonthKey[] = MONTH_KEYS,
  mode: 'TOTAL_RESTATED' | 'LIKE_FOR_LIKE' = 'TOTAL_RESTATED'
): number {
  const deptSqm = dept.sqm ?? DEPARTMENT_SQM[dept.code]?.sqmRelayout ?? 0;
  if (deptSqm <= 0) return 0;

  const periodMonths = getMonthsInPeriod(period, activeMonths);
  if (periodMonths.length === 0) return 0;

  let sumMonthlyProductivity = 0;
  periodMonths.forEach(mKey => {
    let monthlySales = 0;
    if (mode === 'LIKE_FOR_LIKE' && dept.lfl && dept.lfl[mKey]) {
      monthlySales = dept.lfl[mKey].achievementLFL || dept.monthly[mKey]?.achievement || 0;
    } else {
      monthlySales = dept.monthly[mKey]?.achievement || 0;
    }
    const monthProductivity = monthlySales / deptSqm;
    sumMonthlyProductivity += monthProductivity;
  });

  return sumMonthlyProductivity / periodMonths.length;
}

/**
 * Calculate Average Monthly Space Productivity for a group of departments (Zone or All Store).
 * Formula per user request:
 * For each month in the period: monthly group productivity = Total Sales(month) / Total SQM.
 * Then take the average across all active months in that period.
 */
export function calculateGroupPeriodProductivity(
  depts: DepartmentItem[],
  period: PeriodSelection,
  activeMonths: MonthKey[] = MONTH_KEYS,
  mode: 'TOTAL_RESTATED' | 'LIKE_FOR_LIKE' = 'TOTAL_RESTATED',
  customTotalSqm?: number
): { totalSqm: number; avgMonthlyProductivity: number } {
  let totalSqm = 0;
  if (customTotalSqm && customTotalSqm > 0) {
    totalSqm = customTotalSqm;
  } else {
    depts.forEach(d => {
      const dSqm = d.sqm ?? DEPARTMENT_SQM[d.code]?.sqmRelayout ?? 0;
      totalSqm += dSqm;
    });
  }

  if (totalSqm <= 0) return { totalSqm: 0, avgMonthlyProductivity: 0 };

  const periodMonths = getMonthsInPeriod(period, activeMonths);
  if (periodMonths.length === 0) return { totalSqm, avgMonthlyProductivity: 0 };

  let sumMonthlyProductivity = 0;
  periodMonths.forEach(mKey => {
    let monthSales = 0;
    depts.forEach(d => {
      if (mode === 'LIKE_FOR_LIKE' && d.lfl && d.lfl[mKey]) {
        monthSales += d.lfl[mKey].achievementLFL || d.monthly[mKey]?.achievement || 0;
      } else {
        monthSales += d.monthly[mKey]?.achievement || 0;
      }
    });
    const monthlyProductivity = monthSales / totalSqm;
    sumMonthlyProductivity += monthlyProductivity;
  });

  const avgMonthlyProductivity = sumMonthlyProductivity / periodMonths.length;
  return { totalSqm, avgMonthlyProductivity };
}

/**
 * Format Square Meters (SQM)
 */
export function formatSQM(sqm: number): string {
  if (sqm === 0 || isNaN(sqm)) return '0 m²';
  return `${new Intl.NumberFormat('id-ID').format(Math.round(sqm))} m²`;
}

/**
 * Format Sales Productivity per SQM (Rp/m²)
 */
export function formatProductivity(value: number, compact = false): string {
  if (value === 0 || isNaN(value)) return 'Rp 0 / m²';
  const absVal = Math.abs(value);
  const isNegative = value < 0;

  if (compact) {
    if (absVal >= 1_000_000_000) {
      return `${isNegative ? '-' : ''}Rp ${(absVal / 1_000_000_000).toFixed(2)} M/m²`;
    }
    if (absVal >= 1_000_000) {
      return `${isNegative ? '-' : ''}Rp ${(absVal / 1_000_000).toFixed(2)} Jt/m²`;
    }
    if (absVal >= 1_000) {
      return `${isNegative ? '-' : ''}Rp ${(absVal / 1_000).toFixed(0)} Rb/m²`;
    }
  }

  return `${isNegative ? '-' : ''}Rp ${new Intl.NumberFormat('id-ID').format(Math.round(absVal))} / m²`;
}

/**
 * Color class for Space Productivity based on user rule:
 * >= 1,000,000 -> Bold Biru (Blue)
 * < 1,000,000 -> Bold Merah (Red)
 */
export function getProductivityColorClass(productivity: number, isDarkMode = true): string {
  if (productivity >= 1_000_000) {
    return isDarkMode ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold';
  }
  return isDarkMode ? 'text-rose-400 font-bold' : 'text-rose-600 font-bold';
}

export function getProductivityBadgeClass(productivity: number, isDarkMode = true): string {
  if (productivity >= 1_000_000) {
    return isDarkMode 
      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold' 
      : 'bg-blue-50 text-blue-700 border-blue-200 font-bold';
  }
  return isDarkMode 
    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 font-bold' 
    : 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
}

/**
 * Format currency in Indonesian Rupiah
 */
export function formatIDR(value: number, compact = false): string {
  if (value === 0 || isNaN(value)) return 'Rp 0';
  const isNegative = value < 0;
  const absVal = Math.abs(value);

  if (compact) {
    if (absVal >= 1_000_000_000_000) {
      return `${isNegative ? '-' : ''}Rp ${(absVal / 1_000_000_000_000).toFixed(2)} T`;
    }
    if (absVal >= 1_000_000_000) {
      return `${isNegative ? '-' : ''}Rp ${(absVal / 1_000_000_000).toFixed(2)} M`;
    }
    if (absVal >= 1_000_000) {
      return `${isNegative ? '-' : ''}Rp ${(absVal / 1_000_000).toFixed(1)} Jt`;
    }
    if (absVal >= 1_000) {
      return `${isNegative ? '-' : ''}Rp ${(absVal / 1_000).toFixed(0)} Rb`;
    }
  }

  return `${isNegative ? '-' : ''}Rp ${new Intl.NumberFormat('id-ID').format(absVal)}`;
}

export function formatPct(value: number, showSign = false): string {
  if (isNaN(value)) return '0.0%';
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Format percentage rounded to whole integer (standard executive BI reporting)
 */
export function formatPctRounded(value: number, showSign = false): string {
  if (isNaN(value)) return '0%';
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${Math.round(value)}%`;
}

/**
 * Calculate metrics for custom compound periods (like Q1, Q2, etc.)
 */
export function getMetricForPeriod(
  item: DepartmentItem,
  period: PeriodSelection,
  mode: 'TOTAL_RESTATED' | 'LIKE_FOR_LIKE' = 'TOTAL_RESTATED'
): PerformanceMetric {
  if (period === 'Q1') {
    const m1 = item.monthly['JANUARI'] || { target: 0, achievement: 0, actualLY: 0 };
    const m2 = item.monthly['FEBRUARI'] || { target: 0, achievement: 0, actualLY: 0 };
    const m3 = item.monthly['MARET'] || { target: 0, achievement: 0, actualLY: 0 };
    const target = m1.target + m2.target + m3.target;
    const achievement = m1.achievement + m2.achievement + m3.achievement;
    const actualLY = m1.actualLY + m2.actualLY + m3.actualLY;
    const achievementPct = target > 0 ? (achievement / target) * 100 : 0;
    const growthPct = actualLY > 0 ? ((achievement - actualLY) / actualLY) * 100 : 0;
    return { target, achievement, achievementPct, actualLY, growthPct };
  }

  if (period === 'Q2') {
    const m1 = item.monthly['APRIL'] || { target: 0, achievement: 0, actualLY: 0 };
    const m2 = item.monthly['MEI'] || { target: 0, achievement: 0, actualLY: 0 };
    const m3 = item.monthly['JUNI'] || { target: 0, achievement: 0, actualLY: 0 };
    const target = m1.target + m2.target + m3.target;
    const achievement = m1.achievement + m2.achievement + m3.achievement;
    const actualLY = m1.actualLY + m2.actualLY + m3.actualLY;
    const achievementPct = target > 0 ? (achievement / target) * 100 : 0;
    const growthPct = actualLY > 0 ? ((achievement - actualLY) / actualLY) * 100 : 0;
    return { target, achievement, achievementPct, actualLY, growthPct };
  }

  if (period === 'Q3') {
    const m1 = item.monthly['JULI'] || { target: 0, achievement: 0, actualLY: 0 };
    const m2 = item.monthly['AGUSTUS'] || { target: 0, achievement: 0, actualLY: 0 };
    const m3 = item.monthly['SEPTEMBER'] || { target: 0, achievement: 0, actualLY: 0 };
    const target = m1.target + m2.target + m3.target;
    const achievement = m1.achievement + m2.achievement + m3.achievement;
    const actualLY = m1.actualLY + m2.actualLY + m3.actualLY;
    const achievementPct = target > 0 ? (achievement / target) * 100 : 0;
    const growthPct = actualLY > 0 ? ((achievement - actualLY) / actualLY) * 100 : 0;
    return { target, achievement, achievementPct, actualLY, growthPct };
  }

  if (period === 'Q4') {
    const m1 = item.monthly['OKTOBER'] || { target: 0, achievement: 0, actualLY: 0 };
    const m2 = item.monthly['NOVEMBER'] || { target: 0, achievement: 0, actualLY: 0 };
    const m3 = item.monthly['DESEMBER'] || { target: 0, achievement: 0, actualLY: 0 };
    const target = m1.target + m2.target + m3.target;
    const achievement = m1.achievement + m2.achievement + m3.achievement;
    const actualLY = m1.actualLY + m2.actualLY + m3.actualLY;
    const achievementPct = target > 0 ? (achievement / target) * 100 : 0;
    const growthPct = actualLY > 0 ? ((achievement - actualLY) / actualLY) * 100 : 0;
    return { target, achievement, achievementPct, actualLY, growthPct };
  }

  const standard = item.monthly[period as MonthKey] || {
    target: 0,
    achievement: 0,
    achievementPct: 0,
    actualLY: 0,
    growthPct: 0
  };

  if (mode === 'LIKE_FOR_LIKE' && item.lfl && item.lfl[period as string]) {
    const lfl = item.lfl[period as string];
    const achvLFL = lfl.achievementLFL || 0;
    const lyLFL = lfl.actualLYLFL || 0;
    const growthLFL = lfl.growthPctLFL || 0;
    return {
      target: standard.target, // Target remains same reference
      achievement: achvLFL > 0 ? achvLFL : standard.achievement,
      achievementPct: standard.target > 0 && achvLFL > 0 ? (achvLFL / standard.target) * 100 : standard.achievementPct,
      actualLY: lyLFL > 0 ? lyLFL : standard.actualLY,
      growthPct: growthLFL !== 0 ? growthLFL : standard.growthPct
    };
  }

  return standard;
}

/**
 * Determine performance status
 */
export function getPerformanceStatus(achievementPct: number): StatusCategory {
  if (achievementPct >= 100) return 'on_track';
  if (achievementPct >= 85) return 'warning';
  return 'critical';
}

/**
 * Compute aggregated KPI summaries for active filters
 */
export function computeDashboardData(items: DepartmentItem[], filter: FilterState) {
  // Individual departmental units (excluding zone totals, grand total, and rollup ALL KELS)
  const regularDepts = items.filter(i => !i.isZoneTotal && !i.isGrandTotal && i.code !== 'ALL KELS');

  const activeMonths = getActiveMonths(items);

  // Filtered department list based on user selections
  const filteredDepts = regularDepts.filter(dept => {
    if (filter.zoneCode !== 'ALL' && dept.zoneCode !== filter.zoneCode) return false;
    if (filter.departmentCode !== 'ALL' && dept.code !== filter.departmentCode) return false;
    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase();
      const matchName = dept.name.toLowerCase().includes(q);
      const matchCode = dept.code.toLowerCase().includes(q);
      const matchZone = dept.zoneName.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchZone) return false;
    }
    if (filter.statusFilter !== 'ALL') {
      const m = getMetricForPeriod(dept, filter.period, filter.metricMode);
      const status = getPerformanceStatus(m.achievementPct);
      if (status !== filter.statusFilter) return false;
    }
    return true;
  });

  // Calculate Global / Filtered Totals
  let totalTarget = 0;
  let totalAchv = 0;
  let totalActLY = 0;
  let totalLflAchv = 0;
  let totalLflLY = 0;
  let onTrack = 0;
  let warning = 0;
  let critical = 0;

  filteredDepts.forEach(dept => {
    const metric = getMetricForPeriod(dept, filter.period, 'TOTAL_RESTATED');
    totalTarget += metric.target;
    totalAchv += metric.achievement;
    totalActLY += metric.actualLY;

    const status = getPerformanceStatus(metric.achievementPct);
    if (status === 'on_track') onTrack++;
    else if (status === 'warning') warning++;
    else critical++;

    if (dept.lfl && dept.lfl[filter.period as string]) {
      const lfl = dept.lfl[filter.period as string];
      totalLflAchv += lfl.achievementLFL || 0;
      totalLflLY += lfl.actualLYLFL || 0;
    }
  });

  const totalAchvPct = totalTarget > 0 ? (totalAchv / totalTarget) * 100 : 0;
  const totalGrowthPct = totalActLY > 0 ? ((totalAchv - totalActLY) / totalActLY) * 100 : 0;
  const growthAmount = totalAchv - totalActLY;

  // Space Productivity for All Store / filtered selection (Average Monthly Sales / SQM)
  // When viewing All Store without specific zone or department filters, use official TOTAL_STORE_SQM = 18.346 m²
  const isAllStore = filter.zoneCode === 'ALL' && filter.departmentCode === 'ALL' && !filter.searchQuery.trim() && filter.statusFilter === 'ALL';
  const customSqm = isAllStore ? TOTAL_STORE_SQM : undefined;
  const globalProdInfo = calculateGroupPeriodProductivity(filteredDepts, filter.period, activeMonths, 'TOTAL_RESTATED', customSqm);
  const totalSqm = globalProdInfo.totalSqm;
  const spaceProductivity = globalProdInfo.avgMonthlyProductivity;

  const lflGrowthPct = totalLflLY > 0 ? ((totalLflAchv - totalLflLY) / totalLflLY) * 100 : 0;

  const globalKPI: GlobalKPISummary = {
    target: totalTarget,
    achievement: totalAchv,
    achievementPct: totalAchvPct,
    actualLY: totalActLY,
    growthPct: totalGrowthPct,
    growthAmount,
    totalSqm,
    spaceProductivity,
    lflAchievement: totalLflAchv,
    lflActualLY: totalLflLY,
    lflGrowthPct,
    onTrackCount: onTrack,
    warningCount: warning,
    criticalCount: critical,
    totalDepartments: filteredDepts.length
  };

  // Group by Zone
  const zoneCodes = ['LZ', 'DZ', 'CZ', 'SZ', 'ICF'];
  const zones: ZoneGroup[] = zoneCodes.map(zCode => {
    const zoneMeta = ZONES_META[zCode];
    const deptsInZone = filteredDepts.filter(d => d.zoneCode === zCode);

    let zTarget = 0;
    let zAchv = 0;
    let zActLY = 0;

    deptsInZone.forEach(d => {
      const m = getMetricForPeriod(d, filter.period, filter.metricMode);
      zTarget += m.target;
      zAchv += m.achievement;
      zActLY += m.actualLY;
    });

    const zAchvPct = zTarget > 0 ? (zAchv / zTarget) * 100 : 0;
    const zGrowthPct = zActLY > 0 ? ((zAchv - zActLY) / zActLY) * 100 : 0;
    
    // Average Monthly Space Productivity for Zone
    const zoneProdInfo = calculateGroupPeriodProductivity(deptsInZone, filter.period, activeMonths, filter.metricMode);
    const zTotalSqm = zoneProdInfo.totalSqm;
    const zSpaceProductivity = zoneProdInfo.avgMonthlyProductivity;

    return {
      zoneCode: zCode,
      zoneName: zoneMeta?.name || zCode,
      target: zTarget,
      achievement: zAchv,
      achievementPct: zAchvPct,
      actualLY: zActLY,
      growthPct: zGrowthPct,
      growthAmount: zAchv - zActLY,
      totalSqm: zTotalSqm,
      spaceProductivity: zSpaceProductivity,
      status: getPerformanceStatus(zAchvPct),
      departments: deptsInZone
    };
  }).filter(z => z.departments.length > 0 || filter.zoneCode === 'ALL');

  // Sorted Departments
  const sortedDepts = [...filteredDepts].sort((a, b) => {
    const mA = getMetricForPeriod(a, filter.period, filter.metricMode);
    const mB = getMetricForPeriod(b, filter.period, filter.metricMode);
    const sqmA = a.sqm ?? DEPARTMENT_SQM[a.code]?.sqmRelayout ?? 0;
    const sqmB = b.sqm ?? DEPARTMENT_SQM[b.code]?.sqmRelayout ?? 0;

    let valA = 0;
    let valB = 0;

    if (filter.sortBy === 'achievementPct') {
      valA = mA.achievementPct;
      valB = mB.achievementPct;
    } else if (filter.sortBy === 'growthPct') {
      valA = mA.growthPct;
      valB = mB.growthPct;
    } else if (filter.sortBy === 'achievement') {
      valA = mA.achievement;
      valB = mB.achievement;
    } else if (filter.sortBy === 'target') {
      valA = mA.target;
      valB = mB.target;
    } else if (filter.sortBy === 'sqm') {
      valA = sqmA;
      valB = sqmB;
    } else if (filter.sortBy === 'productivity') {
      valA = calculateDeptPeriodProductivity(a, filter.period, activeMonths, filter.metricMode);
      valB = calculateDeptPeriodProductivity(b, filter.period, activeMonths, filter.metricMode);
    } else {
      return filter.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }

    return filter.sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  return {
    globalKPI,
    zones,
    filteredDepts: sortedDepts,
    allCount: regularDepts.length
  };
}
