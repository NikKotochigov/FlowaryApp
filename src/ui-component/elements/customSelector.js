import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function CustomSelector() {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{  minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small">Activity history</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Activity history"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Streams</MenuItem>
        <MenuItem value={20}>Payloads</MenuItem>
        <MenuItem value={30}>Employees</MenuItem>
      </Select>
    </FormControl>
  );
}
