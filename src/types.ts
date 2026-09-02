export type MonthKey =
  | 'JANUARI'
  | 'FEBRUARI'
  | 'MARET'
  | 'APRIL'
  | 'MEI'
  | 'JUNI'
  | 'YTD_SEMESTER_1'
  | 'JULI'
  | 'AGUSTUS'
  | 'SEPTEMBER'
  | 'OKTOBER'
  | 'NOVEMBER'
  | 'DESEMBER'
  | 'YTD';

export type QuarterKey = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export type PeriodSelection = MonthKey | QuarterKey | 'ALL_MONTHS';

export interface PerformanceMetric {
  target: number;
  achievement: number;
  achievementPct: number;
  actualLY: number;
  growthPct: number;
}

export interface LikeForLikeMetric {
  achievementLFL: number;
  actualLYLFL: number;
  growthPctLFL: number;
}

export interface DepartmentItem {
  code: string;
  name: string;
  zoneCode: string;
  zoneName: string;
  sqm?: number;
  sqmEks?: number;
  isZoneTotal: boolean;
  isGrandTotal: boolean;
  monthly: Record<string, PerformanceMetric>;
  lfl?: Record<string, LikeForLikeMetric>;
}

export interface ZoneGroup {
  zoneCode: string;
  zoneName: string;
  target: number;
  achievement: number;
  achievementPct: number;
  actualLY: number;
  growthPct: number;
  growthAmount: number;
  totalSqm: number;
  spaceProductivity: number;
  status: 'on_track' | 'warning' | 'critical';
  departments: DepartmentItem[];
}

export interface GlobalKPISummary {
  target: number;
  achievement: number;
  achievementPct: number;
  actualLY: number;
  growthPct: number;
  growthAmount: number;
  totalSqm: number;
  spaceProductivity: number;
  lflAchievement: number;
  lflActualLY: number;
  lflGrowthPct: number;
  onTrackCount: number;
  warningCount: number;
  criticalCount: number;
  totalDepartments: number;
}

export type StatusCategory = 'on_track' | 'warning' | 'critical';

export interface FilterState {
  departmentCode: string; // 'ALL' or specific dept code
  zoneCode: string; // 'ALL' or 'LZ' | 'DZ' | 'CZ' | 'SZ' | 'OZ'
  period: PeriodSelection;
  metricMode: 'TOTAL_RESTATED' | 'LIKE_FOR_LIKE';
  searchQuery: string;
  statusFilter: 'ALL' | StatusCategory;
  sortBy: 'achievementPct' | 'growthPct' | 'achievement' | 'target' | 'name' | 'sqm' | 'productivity';
  sortOrder: 'asc' | 'desc';
}
