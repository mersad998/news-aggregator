// import { Theme, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Chip from '@mui/material/Chip';
import { TextField } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
//   };
// }

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

interface SearchBarControllerProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPageSizeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarController: FC<SearchBarControllerProps> = (props) => {
  const { onSearch, onPageChange, onPageSizeChange } = props;
  // const [personName, setPersonName] = useState<string[]>(['Van Henry', 'Ralph Hubbard', 'Omar Alexander']);

  // const theme = useTheme();

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignSelf: 'center',
        minHeight: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0px',
        padding: '4px 0px',
        border: '1px solid gray',
        borderRadius: 4,
      }}
    >
      <TextField onChange={onSearch} />
      {/* <Select
        style={{ marginInline: 4, flex: 1 }}
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select> */}
    </div>
  );
};

export default SearchBarController;
