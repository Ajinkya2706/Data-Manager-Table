
'use client';
import { Box, TextField, Button, Paper, Chip } from '@mui/material';
import { Search, Upload, Download, Settings, Save, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearch, saveAllEdits, cancelAllEdits } from '@/store/tableSlice';
import { useState } from 'react';
import ColumnManager from './ColumnManager';
import ImportDialog from './ImportDialog';
import { exportCSV } from '@/utils/csvHandler';

export default function TableToolbar() {
  const dispatch = useDispatch();
  const { searchQuery, rows, columns, editingRows } = useSelector((state: RootState) => state.table);
  const [columnOpen, setColumnOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const hasEdits = editingRows.length > 0;

  return (
    <>
      <Paper className="p-4 mb-5 bg-purple dark:bg-olive shadow-md rounded-xl  ">
        <Box className="flex flex-wrap gap-4 items-center">
          <TextField
            size="small"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            InputProps={{ startAdornment: <Search className="mr-2 text-timber" size={18} /> }}
            className="flex-1 min-w-[220px] bg-cream dark:bg-eerie rounded-lg"
          />
          
          {hasEdits && (
            <>
              <Chip 
                label={`${editingRows.length} editing`} 
                size="small"
                className="bg-flame text-white font-medium"
              />
              <Button
                variant="contained"
                startIcon={<Save size={16} />}
                onClick={() => dispatch(saveAllEdits())}
                className="bg-olive hover:bg-olive/90 text-cream rounded-lg shadow-sm normal-case font-medium px-4"
              >
                Save All
              </Button>
              <Button
                variant="outlined"
                startIcon={<X size={16} />}
                onClick={() => dispatch(cancelAllEdits())}
                className="border-timber text-timber hover:bg-timber/10 rounded-lg normal-case font-medium px-4"
              >
                Cancel All
              </Button>
            </>
          )}
          
          <Button
            variant="outlined"
            startIcon={<Upload size={16} />}
            onClick={() => setImportOpen(true)}
            className="border-olive text-olive hover:bg-olive hover:text-cream rounded-lg normal-case font-medium px-4"
          >
            Import
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download size={16} />}
            onClick={() => exportCSV(rows, columns)}
            disabled={!rows.length}
            className="border-olive text-olive hover:bg-olive hover:text-cream rounded-lg normal-case font-medium px-4 disabled:opacity-40"
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Settings size={16} />}
            onClick={() => setColumnOpen(true)}
            className="bg-flame hover:bg-flame/90 text-white rounded-lg shadow-sm normal-case font-medium px-4"
          >
            Columns
          </Button>
        </Box>
      </Paper>
      <ColumnManager open={columnOpen} onCloseAction={() => setColumnOpen(false)} />
      <ImportDialog open={importOpen} onCloseAction={() => setImportOpen(false)} />
    </>
  );
}