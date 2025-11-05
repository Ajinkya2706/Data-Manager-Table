

'use client';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Edit, Save, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { deleteRow, toggleEditing } from '@/store/tableSlice';

export default function RowActions({ rowId, onSaveAction }: { rowId: string; onSaveAction: () => void }) {
  const dispatch = useDispatch();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isEditing = useSelector((state: RootState) => state.table.editingRows.includes(rowId));

  const handleDelete = () => {
    dispatch(deleteRow(rowId));
    setDeleteOpen(false);
  };

  return (
    <>
      <Tooltip title={isEditing ? 'Save' : 'Edit'} arrow>
        <IconButton 
          size="small" 
          onClick={() => isEditing ? onSaveAction() : dispatch(toggleEditing(rowId))} 
          className="text-olive hover:bg-olive/10 rounded-lg mr-1"
        >
          {isEditing ? <Save size={16} /> : <Edit size={16} />}
        </IconButton>
      </Tooltip>
      {isEditing && (
        <Tooltip title="Cancel" arrow>
          <IconButton size="small" onClick={() => dispatch(toggleEditing(rowId))} className="text-timber hover:bg-timber/10 rounded-lg mr-1">
            <X size={16} />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Delete" arrow>
        <IconButton size="small" onClick={() => setDeleteOpen(true)} className="text-flame hover:bg-flame/10 rounded-lg">
          <Trash2 size={16} />
        </IconButton>
      </Tooltip>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} PaperProps={{ className: 'rounded-xl' }}>
        <DialogTitle className="text-olive dark:text-cream font-bold">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography className="text-timber">Are you sure you want to delete this row? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions className="border-t border-timber/20 pt-3">
          <Button onClick={() => setDeleteOpen(false)} className="text-timber hover:bg-timber/10 rounded-lg normal-case">Cancel</Button>
          <Button onClick={handleDelete} className="bg-flame hover:bg-flame/90 text-white rounded-lg normal-case">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}