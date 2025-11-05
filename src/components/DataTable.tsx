
'use client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Paper, TextField, Box, Typography } from '@mui/material';
import { ArrowUpDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSort, setPage, updateRow, toggleEditing } from '@/store/tableSlice';
import { TableRow as TableRowType, SortOrder } from '@/types';
import { useMemo, useState, useEffect, Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import RowActions from './RowActions';

export default function DataTable() {
  const dispatch = useDispatch();
  const { rows, columns, searchQuery, sortBy, sortOrder, page, editingRows } = useSelector((state: RootState) => state.table);
  const [editData, setEditData] = useState<{ [key: string]: TableRowType }>({});

  const visibleCols = useMemo(() => columns.filter((c: { visible: any; }) => c.visible).sort((a: { order: number; }, b: { order: number; }) => a.order - b.order), [columns]);


  const filteredRows = useMemo(() => {
   let filtered = rows.filter((row: { [s: string]: unknown; } | ArrayLike<unknown>)=>
      Object.values(row).some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortBy) {
   filtered.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [rows, searchQuery, sortBy, sortOrder]);

  const paginatedRows = useMemo(() => filteredRows.slice(page * 10, page * 10 + 10), [filteredRows, page]);

  const handleSort = (colId: string) => {
    const newOrder: SortOrder = sortBy === colId && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ by: colId, order: newOrder }));
  };

  const handleEditChange = (rowId: string, field: string, value: string) => {
    const row = rows.find((r: { id: string; }) => r.id === rowId);

    if (!row) return;
    
    setEditData({
      ...editData,
      [rowId]: { ...row, ...editData[rowId], [field]: field === 'age' ? parseInt(value) || 0 : value }
    });
  };

  const handleSave = (rowId: string) => {
    if (editData[rowId]) {
      dispatch(updateRow(editData[rowId]));
      const newEditData = { ...editData };
      delete newEditData[rowId];
      setEditData(newEditData);
    }
    dispatch(toggleEditing(rowId));
  };

  useEffect(() => {
    if (editingRows.length === 0 && Object.keys(editData).length > 0) {
      Object.keys(editData).forEach(rowId => {
        dispatch(updateRow(editData[rowId]));
      });
      setEditData({});
    }
  }, [editingRows.length]);

  const isEditing = (rowId: string) => editingRows.includes(rowId);

  return (
    <Paper className="bg-white dark:bg-olive overflow-hidden rounded-xl shadow-lg border border-timber/10">
      <TableContainer className="max-h-[650px]">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
             {visibleCols.map((col: { id: Key | null | undefined; label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (

                <TableCell 
                  key={col.id} 
                  className="bg-olive dark:bg-eerie text-cream font-bold border-b-2 border-timber/30"
                >
                  <TableSortLabel
                    active={sortBy === col.id}
                    direction={sortBy === col.id ? sortOrder : 'asc'}
                    onClick={() => handleSort(col.id as string)}
                    IconComponent={() => <ArrowUpDown size={16} className="ml-1" />}
                    className="text-cream hover:text-cream/80 font-semibold"
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell className="bg-olive dark:bg-eerie text-cream font-bold border-b-2 border-timber/30">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleCols.length + 1} align="center">
                  <Box className="py-12">
                    <Typography className="text-timber font-medium text-lg mb-2">
                      No data available
                    </Typography>
                    <Typography className="text-timber/70 text-sm">
                      Import a CSV file to get started
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
        paginatedRows.map((row: { [x: string]: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; id: Key | null | undefined; }) => (
                <TableRow 
                  key={row.id} 
                  className={`hover:bg-cream dark:hover:bg-eerie/50 transition-all border-b border-timber/10 ${
                    isEditing(String(row.id)) ? 'bg-flame/5 dark:bg-flame/10' : ''
                  }`}
                >
                    {visibleCols.map((col: { id: Key | null | undefined; }) => (

                    <TableCell key={col.id} className="text-olive dark:text-cream font-medium">
                      {isEditing(String(row.id)) ? (
                        <TextField
                          size="small"
                          type={col.id === 'age' ? 'number' : 'text'}
                          defaultValue={row[String(col.id)]}
                          onChange={(e) => handleEditChange(String(row.id), String(col.id), e.target.value)}
                         
                          className="w-full"
                          InputProps={{ className: 'text-sm rounded-lg bg-white dark:bg-olive' }}
                        />
                      ) : (
                        <span 
                          onDoubleClick={() =>dispatch({ type: 'table/toggleEditing', payload: row.id })}
                          className="cursor-pointer hover:text-flame transition-colors"
                          title="Double-click to edit"
                        >
                         {typeof col.id === 'string' ? row[col.id] : ''}
                        </span>
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                     <RowActions rowId={String(row.id)} onSaveAction={() => handleSave(String(row.id))} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={(_, newPage) => dispatch(setPage(newPage))}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
        className="border-t-2 border-timber/20 text-olive dark:text-cream bg-cream/30 dark:bg-eerie/30"
      />
    </Paper>
  );
}