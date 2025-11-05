

'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Checkbox, TextField, Box, List, ListItem, IconButton } from '@mui/material';
import { Plus, GripVertical, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleColumn, addColumn, reorderColumns } from '@/store/tableSlice';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export default function ColumnManager({ open, onCloseAction}: { open: boolean; onCloseAction: () => void }) {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.table.columns);
  const [newCol, setNewCol] = useState({ id: '', label: '' });

  const handleAdd = () => {
    if (newCol.id && newCol.label && !columns.find((c: { id: string }) => c.id === newCol.id)) {
      dispatch(addColumn(newCol));
      setNewCol({ id: '', label: '' });
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(columns);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    const updated = items.map((col: any, idx: number) => ({ ...col, order: idx }));
    dispatch(reorderColumns(updated));
  };

  return (
    <Dialog open={open} onClose={onCloseAction} maxWidth="sm" fullWidth PaperProps={{ className: 'rounded-xl gap-4' }}>
      <DialogTitle className="text-olive dark:text-cream font-bold text-xl flex border-b border-timber/20 pb-2">
        Manage Columns
      </DialogTitle>
      <DialogContent className="mt-4 gap-4">
        <Box className="mb-5 p-4  bg-cream dark:bg-eerie rounded-xl gap-4">
          <TextField
            size="small"
            label="Column ID"
            value={newCol.id}
            onChange={(e) => setNewCol({ ...newCol, id: e.target.value.toLowerCase().replace(/\s/g, '_') })}
            className="w-full mb-5"
            InputProps={{ className: 'rounded-lg gap-4' }}
          />
          <TextField
            size="small"
            label="Column Label"
            value={newCol.label}
            onChange={(e) => setNewCol({ ...newCol, label: e.target.value })}
            className="w-full mb-3"
            InputProps={{ className: 'rounded-lg' }}
          />
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={handleAdd}
            fullWidth
            className="bg-flame hover:bg-flame/90 text-white rounded-lg normal-case font-medium py-4"
            disabled={!newCol.id || !newCol.label}
          >
            Add Column
          </Button>
        </Box>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef} className="max-h-96 overflow-auto space-y-2">
                {columns.map((col: { id: string; visible: boolean | undefined; label: string; }, idx: number)  => (
                  <Draggable key={col.id} draggableId={col.id} index={idx}>
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`rounded-lg border transition-all ${
                          snapshot.isDragging 
                            ? 'bg-flame text-cream shadow-lg border-flame scale-105' 
                            : 'bg-white dark:bg-olive border-timber/20 hover:border-timber/40'
                        }`}
                      >
                        <IconButton {...provided.dragHandleProps} size="small" className="mr-2 cursor-grab active:cursor-grabbing">
                          <GripVertical size={18} />
                        </IconButton>
                        <FormControlLabel
                          control={<Checkbox checked={col.visible} onChange={() => dispatch(toggleColumn(col.id))} className="text-flame" />}
                          label={col.label}
                          className="text-olive dark:text-cream flex-1 font-medium"
                        />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
      <DialogActions className="border-t border-timber/20 pt-3">
        <Button 
          onClick={onCloseAction} 
          startIcon={<X size={16} />}
          className="text-olive hover:bg-olive/10 rounded-lg normal-case font-medium"
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}