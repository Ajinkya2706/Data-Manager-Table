'use client';
import { Box, Container, Typography } from '@mui/material';
import DataTable from '@/components/DataTable';
import TableToolbar from '@/components/TableToolbar';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <Box className="min-h-screen bg-cream dark:bg-eerie py-8 transition-colors duration-300">
      <Container maxWidth="xl">
        <Box className="flex justify-between items-center mb-8">
          <Box>
            <Typography variant="h3" className="font-bold text-olive dark:text-cream mb-1 tracking-tight">
              Data Manager
            </Typography>
            <Typography variant="body2" className="text-timber font-medium">
              Manage, sort, and export your data seamlessly
            </Typography>
          </Box>
          <ThemeToggle />
        </Box>
        <br/>
        <TableToolbar />
        <br/>
        <DataTable />
      </Container>
    </Box>
  );
}