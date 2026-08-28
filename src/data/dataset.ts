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
    shortName: 'Living & Commercial',
    color: '#3B82F6', // Blue
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    accentGradient: 'from-blue-500/20 to-indigo-500/20',
    description: 'Sofa, Table & Cabinet, Textile, Decore, Organizer, Bathroom, Office & Commercial'
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

export const initialDepartments: DepartmentItem[] = rawData as DepartmentItem[];

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

/**
 * Format percentage
 */
export function formatPct(value: number, showSign = false): string {
  if (isNaN(value)) return '0.0%';
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
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
  // Individual departmental units (excluding zone totals and grand total)
  const regularDepts = items.filter(i => !i.isZoneTotal && !i.isGrandTotal);

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

  const lflGrowthPct = totalLflLY > 0 ? ((totalLflAchv - totalLflLY) / totalLflLY) * 100 : 0;

  const globalKPI: GlobalKPISummary = {
    target: totalTarget,
    achievement: totalAchv,
    achievementPct: totalAchvPct,
    actualLY: totalActLY,
    growthPct: totalGrowthPct,
    growthAmount,
    lflAchievement: totalLflAchv,
    lflActualLY: totalLflLY,
    lflGrowthPct,
    onTrackCount: onTrack,
    warningCount: warning,
    criticalCount: critical,
    totalDepartments: filteredDepts.length
  };

  // Group by Zone
  const zoneCodes = ['LZ', 'DZ', 'SZ', 'ICF'];
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

    return {
      zoneCode: zCode,
      zoneName: zoneMeta?.name || zCode,
      target: zTarget,
      achievement: zAchv,
      achievementPct: zAchvPct,
      actualLY: zActLY,
      growthPct: zGrowthPct,
      growthAmount: zAchv - zActLY,
      status: getPerformanceStatus(zAchvPct),
      departments: deptsInZone
    };
  }).filter(z => z.departments.length > 0 || filter.zoneCode === 'ALL');

  // Sorted Departments
  const sortedDepts = [...filteredDepts].sort((a, b) => {
    const mA = getMetricForPeriod(a, filter.period, filter.metricMode);
    const mB = getMetricForPeriod(b, filter.period, filter.metricMode);

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
