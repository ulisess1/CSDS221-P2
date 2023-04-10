import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  FormLabel,
  Toolbar,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';

export default function TaskDialog(props) {
  const {
    open,
    handleClose,
    title,
    setTitle,
    titleError,
    setTitleError,
    description,
    setDescription,
    descriptionError,
    setDescriptionError,
    deadline,
    setDeadline,
    priority,
    setPriority,
    handleAddRow,
  } = props;

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'title') {
      setTitle(value);
      setTitleError(false);
    } else if (name === 'description') {
      setDescription(value);
      setDescriptionError(false);
    } else if (name === 'priority') {
      setPriority(value);
    }
  }


  return (
    <Dialog open={open} onClose={handleClose}>

      <DialogTitle sx={{ padding: 0 }}>
        <Toolbar sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
          <AddCircleIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add Task
          </Typography>
        </Toolbar>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
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
            sx={{ marginTop: 3 }}
          />
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
          <Button variant="contained" color="primary" onClick={handleAddRow}><AddCircleIcon />ADD</Button>
          <Button variant="contained" color="error" onClick={handleClose} style={{ marginLeft: 8 }}><BlockIcon />CANCEL</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}