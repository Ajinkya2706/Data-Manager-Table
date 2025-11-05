import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow, Column } from '../types';

export const importCSV = (file: File): Promise<TableRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.map((row: any, idx: number) => ({
          id: `${Date.now()}-${idx}`,
          ...row,
          age: row.age ? parseInt(row.age) : 0,
        }));
        resolve(rows as TableRow[]);
      },
      error: (error) => reject(error),
    });
  });
};

export const exportCSV = (rows: TableRow[], columns: Column[]) => {
  const visibleCols = columns.filter(c => c.visible).sort((a, b) => a.order - b.order);
  const headers = visibleCols.map(c => c.label).join(',');
  const csvRows = rows.map(row => 
    visibleCols.map(col => {
      const val = row[col.id];
      return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
    }).join(',')
  );
  const csv = [headers, ...csvRows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `table-export-${Date.now()}.csv`);
};