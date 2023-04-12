import { React, useState } from 'react';
import './style.css';
import TaskDialog from './TaskDialog';
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
  Checkbox,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AddCircle as AddCircleIcon,
  Cancel as CancelIcon, 
} from '@mui/icons-material';
import { FaRegEdit } from 'react-icons/fa'
import moment from 'moment';
import toastr from 'toastr';

toastr.options = {
  positionClass: 'toast-bottom-right',
  hideDuration: 300,
  timeOut: 5000,
  closeButton: true,
};

export default function App() {
  // Variables added to state
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [deadline, setDeadline] = useState(moment());
  const [priority, setPriority] = useState("low");
  const [isChecked, setIsChecked] = useState(false);
  
  //For dialog box opening and closing
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  
  function createData(title, description, deadline, priority, isComplete) {
    return { title, description, deadline, priority, isComplete };
  }

  //Handles opening "Add" dialog box for table entry closing
  function handleClose() {
    setOpen(false);
    setEditOpen(false);
    setTitleError(false);
    setDescriptionError(false);
    setTitle("");
    setDescription("");
    setDeadline(moment());
    setPriority("low");
  }

  //handles "ADD" button in dialog box, verifies input
  function addEntry() {
    let errorFlag = false;

    if (title.trim() === "") {
      setTitleError(true);
      errorFlag = true;
    }
    if (description.trim() === "") {
      setDescriptionError(true);
      errorFlag = true;
    }

    if (errorFlag)
      return;

    //Title must be unique
    if (rows.find((row) => row.title === title)) {
      setTitleError(true);
      //toastr.error("Title exists");//<-------- REMOVE
      return;
    }

    setRows([...rows, createData(title, description, deadline, priority, false)]);
    toastr.success("Task was added successfully");
    handleClose();
  }
  
  function handleEditOpen(editTitle) {
    let editRow = rows.find((e) => e.title === editTitle);
    setTitle(editRow.title);
    setDescription(editRow.description);
    setDeadline(editRow.deadline);
    setPriority(editRow.priority);
    setEditOpen(true);
  }

  //Handles the "Edit" dialog box for modifying existing entries
  function editEntry() {
    // Find the index of the row that needs to be updated
    const index = rows.findIndex((row) => row.title === title);

    // Update the corresponding row in the rows array with the new values
    rows[index] = {
      ...rows[index],
      description,
      deadline,
      priority,
    };

  // Update the state with the modified rows array
  setRows([...rows]);

  // Close the dialog box
  toastr.success('Task was updated successfully');
  handleClose();
  }

  //removes row from arr of row whose button was clicked
  function handleDelete(deleteTitle) {
    setRows(rows.filter(row => row.title !== deleteTitle));
    toastr.success("Task was deleted successfully")
  }

  //changes isCompleted value associated with a title in the table
  function handleIsCompleteChange(completedTitle) {
    setRows(rows.map(row => {
      if (row.title === completedTitle) {
        return { ...row, isChecked: !row.isChecked }; // create new object with updated isChecked value
      } else {
        return row; // return original object for all other rows
      }
    }));
  }

  function rowContains(title) {
    if (rows.find((row) => row.title === title))
      return true;
    else
      return false;
  }

  function errorMessage() {
    if (rows.find((row) => row.title === title))
      return "Title Must Be Unique!";
    else
      return "Title is Required!";
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
          }}>
          <Typography
            sx={{
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              margin: '0 auto',
              flexGrow: 1,
            }}>
            <MenuIcon/>
            FRAMEWORKS
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)} startIcon={<AddCircleIcon />}>
            Add
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dialog box to enter items to table */}
      <TaskDialog 
        open={open} 
        handleClose={handleClose} 
        title={title} 
        setTitle={setTitle} 
        titleError={titleError} 
        setTitleError={setTitleError} 
        description={description} 
        setDescription={setDescription} 
        descriptionError={descriptionError} 
        setDescriptionError={setDescriptionError} 
        deadline={deadline} 
        setDeadline={setDeadline} 
        priority={priority} 
        setPriority={setPriority} 
        handleSubmit={addEntry}
        determineError={errorMessage}
        rowContains={rowContains} />

      {/* Dialog box to edit row content */}
      <TaskDialog 
        open={editOpen} 
        handleClose={handleClose} 
        setTitleError={setTitleError} 
        description={description} 
        setDescription={setDescription} 
        descriptionError={descriptionError} 
        setDescriptionError={setDescriptionError} 
        deadline={deadline} 
        setDeadline={setDeadline} 
        priority={priority} 
        setPriority={setPriority} 
        isEditBox={true}
        handleSubmit={editEntry} />

      {/* Table */}
      <TableContainer>
        <Table sx={{ height: "50px" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "16.66%", borderBottomWidth: "2px" }}>Title</TableCell>
              <TableCell align="center" sx={{ width: "16.66%", borderBottomWidth: "2px"  }}>Description</TableCell>
              <TableCell align="center" sx={{ width: "16.66%", borderBottomWidth: "2px" }}>Deadline</TableCell>
              <TableCell align="center" sx={{ width: "16.66%", borderBottomWidth: "2px" }}>Priority</TableCell>
              <TableCell align="center" sx={{ width: "16.66%", borderBottomWidth: "2px" }}>is&nbsp;Complete</TableCell>
              <TableCell align="center" sx={{ width: "16.66%", borderBottomWidth: "2px" }}>Action</TableCell>
              
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
                      onClick={() => handleEditOpen(row.title)}
                      size="small" 
                      color="primary" 
                      sx={{ flex: "0 0 auto", display: "flex"}}
                      >
                      <FaRegEdit style={{fontSize: "18px"}}/>UPDATE
                    </Button>}
                    <Button variant="contained" size="small" color="error" sx={{ flex: "0 0 auto" }} onClick={() => handleDelete(row.title)}><CancelIcon style={{fontSize: "20px"}}/>DELETE</Button>
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
