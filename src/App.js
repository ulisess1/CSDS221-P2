import React from 'react';
import './style.css';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';

function createData(name, calories) {
  return { name, calories };
}

const rows = [];

export default function App() {
  return (
    <div>
      <AppBar>
        <Toolbar
          sx={{
            display: 'center',
            alignItems: 'center',
            justifyContents: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              margin: '0 auto',
              flexGrow: 1,
            }}
          >
            <MenuIcon />
            FRAMEWORKS
          </Typography>
          <Button variant="contained" startIcon={<AddCircleIcon />}>
            Add
          </Button>
        </Toolbar>
      </AppBar>

      <TableContainer></TableContainer>
    </div>
  );
}
