import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function CustomSelector({ arrayItem, setArrayItem}) {
  // const [arrayItem, setArrayItem] = useState('');

  const handleChange = (event) => {
    setArrayItem(event.target.value);
  };
console.log(arrayItem)
  return (
    <FormControl sx={{  minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small">Activity history</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={arrayItem}
        label="Activity history"
        onChange={handleChange}
      >
      
        <MenuItem value={`1`}>Streams</MenuItem>
        <MenuItem value={`2`}>Payloads</MenuItem>
      </Select>
    </FormControl>
  );
}
