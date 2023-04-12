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
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FaRegEdit } from 'react-icons/fa'

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
    handleSubmit,
    isEditBox,
    determineError,
    rowContains,
  } = props;

  return (
    <Dialog open={open} onClose={handleClose}>

      <DialogTitle sx={{ padding: 0 }}>
        <Toolbar sx={{display: "flex", backgroundColor: "primary.main", color: "primary.contrastText"}}>
          {(isEditBox) ?
            <>
              <FaRegEdit style={{marginBottom: "5px"}}/>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Edit Task
              </Typography></> :
            <>
              <AddCircleIcon fontSize='small' />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Add Task
              </Typography>
            </>}
        </Toolbar>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", }}>
        { (!isEditBox) &&
          <TextField
          hidden={isEditBox}
          id="titleInput"
          variant="outlined"
          label="Title"
          error={titleError}
          helperText={titleError ? determineError(): ""}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            if (title.trim() === "") {
              setTitleError(true);
            }
            else if(rowContains(title.trim())) {
              setTitleError(true);
            } else {
              setTitleError(false);
            }
          }}
          style={{ width: "100%", marginTop: 12 }}
        />}
        <TextField
          id="descriptionInput"
          variant="outlined"
          label="Description"
          error={descriptionError}
          helperText={descriptionError ? "Description is Required!": ""}
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
        <div style={{width: "100%", display: "flex", justifyContent: "flex-end", paddingTop: "10%"}}>
          { (isEditBox) ?
            <Button variant="contained" color="primary" onClick={handleSubmit}><FaRegEdit style={{fontSize: "16px"}}/>EDIT</Button> 
            :
            <Button variant="contained" color="primary" onClick={handleSubmit}><AddCircleIcon />ADD</Button>
            }
          <Button variant="contained" color="error" onClick={handleClose} style={{ marginLeft: 8 }}><BlockIcon style={{fontSize: "16px"}}/>CANCEL</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}