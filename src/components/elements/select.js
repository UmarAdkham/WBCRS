import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  menuItemControl: {
    width: '100%',
  },
  formControl: {
    width: '100%',
    borderBottom: "1px solid #9e9e9e",
  },
}));

function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [data, setData] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const dataToDisplay = props.dataToDisplay.map((data) => ( 
    <MenuItem key={data._id} value={data.name}>{data.name}</MenuItem>
));
  

  function handleChange(event) {
    setData(event.target.value);
    props.onUpdate(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select" style={{left: '0px'}}>{props.label}</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={data}
          onChange={handleChange}
          inputProps={{
            name: 'data',
            id: 'demo-controlled-open-select',
          }}
        >
          {dataToDisplay}
        </Select>
      </FormControl>
    </div>
  );
}

export default ControlledOpenSelect;