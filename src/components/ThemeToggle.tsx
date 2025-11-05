'use client';

import { IconButton } from '@mui/material';
import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';
export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  
  return (
    <IconButton 
      onClick={() => dispatch(toggleTheme())} 
      className="bg-olive dark:bg-timber hover:bg-opacity-90 text-cream dark:text-eerie rounded-lg transition-all"
    >
      {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  );
}
