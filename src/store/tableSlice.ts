
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableRow, Column, SortOrder } from '@/types';

interface TableState {
  rows: TableRow[];
  columns: Column[];
  searchQuery: string;
  sortBy: string;
  sortOrder: SortOrder;
  page: number;
  editingRows: string[];
}

const defaultColumns: Column[] = [
  { id: 'name', label: 'Name', visible: true, order: 0 },
  { id: 'email', label: 'Email', visible: true, order: 1 },
  { id: 'age', label: 'Age', visible: true, order: 2 },
  { id: 'role', label: 'Role', visible: true, order: 3 },
];

const initialState: TableState = {
  rows: [],
  columns: defaultColumns,
  searchQuery: '',
  sortBy: '',
  sortOrder: 'asc',
  page: 0,
  editingRows: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const idx = state.rows.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) state.rows[idx] = action.payload;
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(r => r.id !== action.payload);
      state.editingRows = state.editingRows.filter(id => id !== action.payload);
    },
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    toggleColumn: (state, action: PayloadAction<string>) => {
      const col = state.columns.find(c => c.id === action.payload);
      if (col) col.visible = !col.visible;
    },
    addColumn: (state, action: PayloadAction<{ id: string; label: string }>) => {
      state.columns.push({ ...action.payload, visible: true, order: state.columns.length });
    },
    reorderColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 0;
    },
    setSort: (state, action: PayloadAction<{ by: string; order: SortOrder }>) => {
      state.sortBy = action.payload.by;
      state.sortOrder = action.payload.order;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    toggleEditing: (state, action: PayloadAction<string>) => {
      const idx = state.editingRows.indexOf(action.payload);
      if (idx > -1) {
        state.editingRows = state.editingRows.filter(id => id !== action.payload);
      } else {
        state.editingRows.push(action.payload);
      }
    },
    saveAllEdits: (state: TableState) => {
      state.editingRows = [];
    },
    cancelAllEdits: (state: TableState) => {
      state.editingRows = [];
    },
    
  },
});

export const { setRows, addRow, updateRow, deleteRow, setColumns, toggleColumn, addColumn, reorderColumns, setSearch, setSort, setPage, toggleEditing, saveAllEdits, cancelAllEdits } = tableSlice.actions;
export default tableSlice.reducer;