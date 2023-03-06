import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from 'react';

const filter = createFilterOptions();

export default function SelectAutoComplete({value, setValue}) {
//   const [value, setValue] = useState(null);
console.log('VALUE', value)
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            company: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            company: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.company);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            company: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="autoComplete"
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.company;
      }}
      renderOption={(props, option) => <li {...props}>{option.company}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Enter company address or choose demo companies" />
      )}
    />
  );
}



// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { company: '0x77BF84946F07c041B5bA077fa7F99a89b8C3f41d' },
  // { company: '0x73dfA11adfcAC3706e7B6AaD893e5C32Ec8eF91f' },

];