import { DepartmentItem, MonthKey } from '../types';

export const CSV_URL_TOTAL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRlXvmUHEiaU0TWKjdKzAK6pkX-n5Xc-RdEU5aNZtzGEMSDMXxStPIMYmfJlDjHiKCU0oPdET_ZEzc/pub?gid=1697114944&single=true&output=csv';
export const CSV_URL_LFL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRlXvmUHEiaU0TWKjdKzAK6pkX-n5Xc-RdEU5aNZtzGEMSDMXxStPIMYmfJlDjHiKCU0oPdET_ZEzc/pub?gid=1805434721&single=true&output=csv';

export const ZONE_MAPPING: Record<string, { zoneCode: string; zoneName: string }> = {
  // LIVING ZONE (LZ)
  BA: { zoneCode: 'LZ', zoneName: 'LIVING ZONE' },
  BB: { zoneCode: 'LZ', zoneName: 'LIVING ZONE' },
  BL: { zoneCode: 'LZ', zoneName: 'LIVING ZONE' },
  BK: { zoneCode: 'LZ', zoneName: 'LIVING ZONE' },
  BM: { zoneCode: 'LZ', zoneName: 'LIVING ZONE' },
  BH: { zoneCode: 'LZ', zoneName: 'LIVING ZONE' },

  // DINING ZONE (DZ)
  BD: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  BE: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  BC: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  BN: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  BO: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  DA: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  DB: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  DC: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  DD: { zoneCode: 'DZ', zoneName: 'DINING ZONE' },
  'ALL KELS': { zoneCode: 'DZ', zoneName: 'DINING ZONE' },

  // COMMERCIAL ZONE (CZ)
  BP: { zoneCode: 'CZ', zoneName: 'COMMERCIAL ZONE' },
  BQ: { zoneCode: 'CZ', zoneName: 'COMMERCIAL ZONE' },
  BR: { zoneCode: 'CZ', zoneName: 'COMMERCIAL ZONE' },

  // SLEEPING ZONE (SZ) - Includes Home Galleria (BS)
  BF: { zoneCode: 'SZ', zoneName: 'SLEEPING ZONE' },
  BI: { zoneCode: 'SZ', zoneName: 'SLEEPING ZONE' },
  BG: { zoneCode: 'SZ', zoneName: 'SLEEPING ZONE' },
  BJ: { zoneCode: 'SZ', zoneName: 'SLEEPING ZONE' },
  BS: { zoneCode: 'SZ', zoneName: 'SLEEPING ZONE' },

  // ICF ZONE (ICF) - Stands alone
  AM: { zoneCode: 'ICF', zoneName: 'ICF ZONE' },
  AJ: { zoneCode: 'ICF', zoneName: 'ICF ZONE' }
};

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

export const ALL_MONTH_KEYS: MonthKey[] = [
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

/**
 * Fast RFC 4180 compliant CSV Parser
 */
export function parseCSVLines(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let insideQuotes = false;
  let entry = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    if (char === '"' && insideQuotes && nextChar === '"') {
      entry += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      row.push(entry.trim());
      entry = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(entry.trim());
      if (row.some(cell => cell.length > 0)) {
        lines.push(row);
      }
      row = [];
      entry = '';
    } else {
      entry += char;
    }
  }
  if (row.length > 0 && row.some(cell => cell.length > 0)) {
    row.push(entry.trim());
    lines.push(row);
  }
  return lines;
}

function parseNumber(str: string | undefined): number {
  if (!str) return 0;
  let clean = str.replace(/"/g, '').replace(/,/g, '').replace(/\s/g, '');
  if (clean === '-' || clean.toLowerCase() === 'n/a' || clean === '') return 0;
  let isNeg = false;
  if (clean.startsWith('(') && clean.endsWith(')')) {
    isNeg = true;
    clean = clean.slice(1, -1);
  }
  const num = parseFloat(clean);
  if (isNaN(num)) return 0;
  return isNeg ? -num : num;
}

function parsePercentage(str: string | undefined): number {
  if (!str) return 0;
  let clean = str.replace(/"/g, '').replace(/%/g, '').replace(/\s/g, '');
  if (clean === '-' || clean.toLowerCase() === 'n/a' || clean === '') return 0;
  let isNeg = false;
  if (clean.startsWith('(') && clean.endsWith(')')) {
    isNeg = true;
    clean = clean.slice(1, -1);
  }
  const num = parseFloat(clean);
  if (isNaN(num)) return 0;
  return isNeg ? -num : num;
}

/**
 * Parses raw CSV texts directly into structured DepartmentItem list
 */
export function parseGoogleSheetsCsv(csvTotal: string, csvLfl?: string): DepartmentItem[] {
  const rowsTotal = parseCSVLines(csvTotal);
  if (rowsTotal.length < 6) {
    throw new Error('CSV total data is invalid or empty');
  }

  // Find header row that contains JANUARI in Total CSV
  let headerTotalRowIdx = 4;
  for (let r = 0; r < Math.min(rowsTotal.length, 10); r++) {
    if (rowsTotal[r].some(cell => cell.toUpperCase().includes('JANUARI'))) {
      headerTotalRowIdx = r;
      break;
    }
  }

  const headerTotal = rowsTotal[headerTotalRowIdx] || [];
  const monthColsTotal: Record<string, number> = {};
  for (let c = 0; c < headerTotal.length; c++) {
    const colName = headerTotal[c];
    if (colName) {
      const key = colName.replace(/\s+/g, '_').toUpperCase();
      monthColsTotal[key] = c;
    }
  }

  // Parse LFL if available
  const rowsLfl = csvLfl ? parseCSVLines(csvLfl) : [];
  let headerLflRowIdx = 4;
  for (let r = 0; r < Math.min(rowsLfl.length, 10); r++) {
    if (rowsLfl[r].some(cell => cell.toUpperCase().includes('JANUARI'))) {
      headerLflRowIdx = r;
      break;
    }
  }

  const headerLfl = rowsLfl[headerLflRowIdx] || [];
  const monthColsLfl: Record<string, number> = {};
  for (let c = 0; c < headerLfl.length; c++) {
    const colName = headerLfl[c];
    if (colName) {
      const key = colName.replace(/\s+/g, '_').toUpperCase();
      monthColsLfl[key] = c;
    }
  }

  const monthList: { key: MonthKey; colKey: string }[] = [
    { key: 'JANUARI', colKey: 'JANUARI' },
    { key: 'FEBRUARI', colKey: 'FEBRUARI' },
    { key: 'MARET', colKey: 'MARET' },
    { key: 'APRIL', colKey: 'APRIL' },
    { key: 'MEI', colKey: 'MEI' },
    { key: 'JUNI', colKey: 'JUNI' },
    { key: 'YTD_SEMESTER_1', colKey: 'YTD_SEMESTER_1' },
    { key: 'JULI', colKey: 'JULI' },
    { key: 'AGUSTUS', colKey: 'AGUSTUS' },
    { key: 'SEPTEMBER', colKey: 'SEPTEMBER' },
    { key: 'OKTOBER', colKey: 'OKTOBER' },
    { key: 'NOVEMBER', colKey: 'NOVEMBER' },
    { key: 'DESEMBER', colKey: 'DESEMBER' },
    { key: 'YTD', colKey: 'YTD' }
  ];

  const items: DepartmentItem[] = [];

  // Rows after the header row are department rows
  for (let r = headerTotalRowIdx + 1; r < rowsTotal.length; r++) {
    const row = rowsTotal[r];
    const code = row[0]?.trim();
    const name = row[1]?.trim();
    if (!code || !name) continue;

    const mapping = ZONE_MAPPING[code];
    if (!mapping) continue; // Skip zone totals like LZ, DZ, CZ, SZ, OZ, TOTAL

    const monthly: Record<string, any> = {};

    monthList.forEach(m => {
      const colIdx = monthColsTotal[m.colKey];
      if (colIdx !== undefined) {
        const target = parseNumber(row[colIdx]);
        const achievement = parseNumber(row[colIdx + 1]);
        let achvPct = parsePercentage(row[colIdx + 2]);
        const actualLY = parseNumber(row[colIdx + 3]);
        let growthPct = parsePercentage(row[colIdx + 4]);

        if (target > 0 && (achvPct === 0 || isNaN(achvPct))) {
          achvPct = Number(((achievement / target) * 100).toFixed(1));
        }
        if (actualLY > 0 && (growthPct === 0 || isNaN(growthPct))) {
          growthPct = Number((((achievement - actualLY) / actualLY) * 100).toFixed(1));
        }

        monthly[m.key] = {
          target,
          achievement,
          achievementPct: achvPct,
          actualLY,
          growthPct
        };
      } else {
        monthly[m.key] = {
          target: 0,
          achievement: 0,
          achievementPct: 0,
          actualLY: 0,
          growthPct: 0
        };
      }
    });

    // Compute dynamic accurate YTD across all active recorded months
    let ytdTarget = 0;
    let ytdAchv = 0;
    let ytdActualLY = 0;

    ALL_MONTH_KEYS.forEach(mKey => {
      const m = monthly[mKey];
      if (m && (m.target > 0 || m.achievement > 0)) {
        ytdTarget += m.target;
        ytdAchv += m.achievement;
        ytdActualLY += m.actualLY;
      }
    });

    const ytdAchvPct = ytdTarget > 0 ? Number(((ytdAchv / ytdTarget) * 100).toFixed(1)) : 0;
    const ytdGrowthPct = ytdActualLY > 0 ? Number((((ytdAchv - ytdActualLY) / ytdActualLY) * 100).toFixed(1)) : 0;

    monthly['YTD'] = {
      target: ytdTarget,
      achievement: ytdAchv,
      achievementPct: ytdAchvPct,
      actualLY: ytdActualLY,
      growthPct: ytdGrowthPct
    };

    // Parse LFL metrics for department
    const lflRow = rowsLfl.find(lr => lr[0]?.trim() === code);
    const lfl: Record<string, any> = {};
    if (lflRow) {
      monthList.forEach(m => {
        const colIdx = monthColsLfl[m.colKey];
        if (colIdx !== undefined) {
          const achvLFL = parseNumber(lflRow[colIdx]);
          const actLYLFL = parseNumber(lflRow[colIdx + 1]);
          const growthLFL = parsePercentage(lflRow[colIdx + 2]);
          lfl[m.key] = {
            achievementLFL: achvLFL,
            actualLYLFL: actLYLFL,
            growthPctLFL: growthLFL
          };
        }
      });
    }

    const sqmInfo = DEPARTMENT_SQM[code] || { sqmEks: 0, sqmRelayout: 0 };

    items.push({
      code,
      name,
      zoneCode: mapping.zoneCode,
      zoneName: mapping.zoneName,
      sqm: sqmInfo.sqmRelayout,
      sqmEks: sqmInfo.sqmEks,
      isZoneTotal: code === 'ALL KELS',
      isGrandTotal: false,
      monthly: monthly as any,
      lfl: Object.keys(lfl).length > 0 ? lfl : undefined
    });
  }

  return items;
}

/**
 * Fetch both Google Sheets CSVs with cache-busting and parse dynamically
 */
export async function fetchLiveGoogleSheetsData(): Promise<{
  departments: DepartmentItem[];
  timestamp: string;
  activeMonths: MonthKey[];
}> {
  const timestamp = Date.now();
  const urlTotalWithCacheBust = `${CSV_URL_TOTAL}&_t=${timestamp}`;
  const urlLflWithCacheBust = `${CSV_URL_LFL}&_t=${timestamp}`;

  const [resTotal, resLfl] = await Promise.all([
    fetch(urlTotalWithCacheBust, { cache: 'no-store' }),
    fetch(urlLflWithCacheBust, { cache: 'no-store' }).catch(() => null)
  ]);

  if (!resTotal.ok) {
    throw new Error(`Failed to fetch Google Sheets CSV: ${resTotal.status} ${resTotal.statusText}`);
  }

  const textTotal = await resTotal.text();
  const textLfl = resLfl && resLfl.ok ? await resLfl.text() : '';

  const parsedDepts = parseGoogleSheetsCsv(textTotal, textLfl);
  if (!parsedDepts || parsedDepts.length === 0) {
    throw new Error('No department records found in parsed Google Sheets CSV');
  }

  // Detect which months have active records across departments
  const activeMonths = getActiveMonths(parsedDepts);

  return {
    departments: parsedDepts,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    activeMonths
  };
}

/**
 * Determine all months that have recorded actual targets or achievements
 */
export function getActiveMonths(departments: DepartmentItem[]): MonthKey[] {
  const active: MonthKey[] = [];
  
  ALL_MONTH_KEYS.forEach(mKey => {
    const hasData = departments.some(d => {
      const m = d.monthly[mKey];
      return m && (m.target > 0 || m.achievement > 0);
    });
    if (hasData) {
      active.push(mKey);
    }
  });

  return active.length > 0 ? active : ALL_MONTH_KEYS.slice(0, 10); // Default Jan - Okt
}
