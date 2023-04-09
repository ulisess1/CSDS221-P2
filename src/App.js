import { React, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AddCircle as AddCircleIcon,
  Block as BlockIcon,
  Create as CreateIcon,
  Cancel as CancelIcon, 
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';

//stores content of table rows
const initRows = [
  { title: 'title1',
    description: 'sample', 
    deadline: moment(), 
    priority: 'low',
    isChecked: false,
  },
];

export default function App() {
  // Variables added to state
  const [rows, setRows] = useState(initRows)
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState("low");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  //For dialog box opening and closing
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  //Handles opeining "Add" dialog box for table entry
  const handleClickOpen = () => {
    setOpen(true);
  }

  //Handles opeining "Add" dialog box for table entry closing
  const handleClose = () => {
    setOpen(false);
    setTitleError(false);
    setDescriptionError(false);
    setTitle("");
    setDescription("");
    setDeadline(null);
    setPriority("low");
  }

  const handleEditOpen = () => {
    setEditOpen(true);
  }
  
  function createData(title, description, deadline, priority, isComplete) {
    return { title, description, deadline, priority, isComplete };
  }
  
  //handles "ADD" button in dialog box, verifies input
  const handleAddRow = () => {
    if (title.trim() === "") {
      setTitleError(true);
      return;
    }
    if (description.trim() === "") {
      setDescriptionError(true);
      return;
    }
    setRows([...rows, createData(title, description, deadline, priority, false)]);
    console.log(rows);
    handleClose();
  }

  //removes row from arr of row whose button was clicked
  const handleDelete = (title) => {
    setRows(rows.filter(row => row.title !== title));
  }

  const handleIsCompleteChange = (title) => {
    setRows(rows.map(row => {
      if (row.title === title) {
        return { ...row, isChecked: !row.isChecked }; // create new object with updated isChecked value
      } else {
        return row; // return original object for all other rows
      }
    }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Banner at the top of page */}
      <AppBar position='static'>
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
          <Button variant="contained" onClick={handleClickOpen} startIcon={<AddCircleIcon />}>
            Add
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dialog box to enter items to table */}
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle><AddCircleIcon/>Add Task</DialogTitle> */}
        <DialogTitle sx={{ padding: 0 }}>
          <Toolbar sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
            <AddCircleIcon/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Add Task
            </Typography>
          </Toolbar>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center"}}>
          <TextField 
            id="titleInput" 
            variant="outlined" 
            label="Title"
            error={titleError}
            helperText={titleError ? "Title is Required!" : ""}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              if (title.trim() === "") {
                setTitleError(true);
              } else {
                setTitleError(false);
              }
            }}
            style={{ width: "100%", marginTop: 12 }}
          />
          <TextField
            id="descriptionInput"
            variant="outlined"
            label="Description"
            error={descriptionError}
            helperText={descriptionError ? "Description is Required!" : ""}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => {
              if (description.trim() === "") {
                setDescriptionError(true);
              } else {
                setDescriptionError(false);
              }
            }}
            style={{ width: "100%", marginTop: 24 }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker 
              value={deadline}
              onChange={(newDate) => setDeadline(newDate)}
              label="Deadline"
              sx={{ marginTop:3}}
            />
          </LocalizationProvider>
          <FormControl sx={{marginTop: 3}}>
            <FormLabel>Priority</FormLabel>
            <RadioGroup
              row
              name="priorityRadioGroup"
              defaultValue="low"
              value={priority}
              onChange={(e) => {setPriority(e.target.value)}}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel value="med" control={<Radio />} label="Med" />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
          <div style={{ display: "flex", justifyContent: "flex-end"}}>
            <Button variant="contained" color="primary" onClick={handleAddRow}><AddCircleIcon/>ADD</Button>
            <Button variant="contained" color="error" onClick={handleClose} style={{ marginLeft: 8 }}><BlockIcon/>CANCEL</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog box to edit row content */}
      <Dialog open={editOpen} onClose={handleClose}>
        <DialogTitle sx={{ padding: 0 }}>
          <Toolbar sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
            <CreateIcon/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Edit Task
            </Typography>
          </Toolbar>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
          <TextField
            id="descriptionInput"
            variant="outlined"
            label="Description"
            error={descriptionError}
            helperText={descriptionError ? "Description is Required!" : ""}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => {
              if (description.trim() === "") {
                setDescriptionError(true);
              } else {
                setDescriptionError(false);
              }
            }}
            style={{ width: "100%", marginTop: 24 }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker sx={{ marginTop: 3 }} />
          </LocalizationProvider>
          <FormControl sx={{ marginTop: 3 }}>
            <FormLabel>Priority</FormLabel>
            <RadioGroup
              row
              name="priorityRadioGroup"
              defaultValue="low"
              value={priority}
              onChange={(e) => { setPriority(e.target.value) }}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel value="med" control={<Radio />} label="Med" />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleAddRow}><CreateIcon />EDIT</Button>
            <Button variant="contained" color="error" onClick={() => setEditOpen(false)} style={{ marginLeft: 8 }}><BlockIcon />CANCEL</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <TableContainer>
        <Table sx={{ height: "50px" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "16.66%" }}>Title</TableCell>
              <TableCell align="center" sx={{ width: "16.66%" }}>Description</TableCell>
              <TableCell align="center" sx={{ width: "16.66%" }}>Deadline</TableCell>
              <TableCell align="center" sx={{ width: "16.66%" }}>Priority</TableCell>
              <TableCell align="center" sx={{ width: "16.66%" }}>is&nbsp;Complete</TableCell>
              <TableCell align="center" sx={{ width: "16.66%" }}>Action</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center" sx={{ width: "16.66%" }}>{row.title}</TableCell>
                <TableCell align="center" sx={{ width: "16.66%" }}>{row.description}</TableCell>
                <TableCell align="center" sx={{ width: "16.66%" }}>{row.deadline.format("MM/DD/YY")}</TableCell>
                <TableCell align="center" sx={{ width: "16.66%" }}>{row.priority}</TableCell>
                <TableCell align="center" sx={{ width: "16.66%" }} onChange={() => handleIsCompleteChange(row.title)}><Checkbox /></TableCell>
                <TableCell align="center" sx={{ width: "16.66%" }}>
                  <div  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    {!rows.find((e) => e.title === row.title).isChecked && <Button 
                      variant="contained" 
                      size="small" 
                      color="primary" 
                      sx={{ flex: "0 0 auto", display: "flex"}}
                      >
                      <CreateIcon />UPDATE
                    </Button>}
                    <Button variant="contained" size="small" color="error" sx={{ flex: "0 0 auto" }} onClick={() => handleDelete(row.title)}><CancelIcon />DELETE</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
