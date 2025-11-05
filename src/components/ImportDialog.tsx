'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Alert } from '@mui/material';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRows } from '@/store/tableSlice';
import { importCSV } from '@/utils/csvHandler';

export default function ImportDialog({ open, onCloseAction }: { open: boolean; onCloseAction: () => void }) {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    setError('');
    
    try {
      const rows = await importCSV(file);
      if (rows.length === 0) throw new Error('No valid data found');
      dispatch(setRows(rows));
      onCloseAction();
    } catch (err) {
      setError('Invalid CSV format. Ensure headers match table columns.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onCloseAction} maxWidth="sm" fullWidth PaperProps={{ className: 'rounded-xl' }}>
      <DialogTitle className="text-olive dark:text-cream font-bold text-xl border-b border-timber/20 pb-3">
        Import CSV File
      </DialogTitle>
      <DialogContent className="mt-4">
        <Box className="flex flex-col items-center gap-4 py-8">
          <Button
            variant="outlined"
            component="label"
            startIcon={<Upload size={18} />}
            className="border-2 border-olive text-olive hover:bg-olive hover:text-cream rounded-lg normal-case font-medium px-6 py-3"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Choose CSV File'}
            <input type="file" hidden accept=".csv" onChange={handleFile} />
          </Button>
          <Typography variant="body2" className="text-timber text-center font-medium">
            Supported columns: name, email, age, role
          </Typography>
          {error && <Alert severity="error" className="w-full rounded-lg">{error}</Alert>}
        </Box>
      </DialogContent>
      <DialogActions className="border-t border-timber/20 pt-3">
        <Button 
          onClick={onCloseAction} 
          startIcon={<X size={16} />}
          className="text-timber hover:bg-timber/10 rounded-lg normal-case font-medium"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}