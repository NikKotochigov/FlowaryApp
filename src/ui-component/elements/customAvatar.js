import * as React from 'react';
import Avatar from '@mui/material/Avatar';

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = '#';

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// }

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: "common.main",
//       width: 100,
//       height: 100,
//       m:2,
//       fontSize: '40px'
//     },
//     children: `${name.split(' ')[0][0]}`,
//   };
// }

const stringAvatar = (name) => {return name.split(' ').length === 1 ? name.split(' ')[0][0].toUpperCase() : name.split(' ')[0][0].toUpperCase()+name.split(' ')[1][0].toUpperCase()};

export default function CustomAvatar({n}) {
  return (
      <Avatar 
      sx = {{
        bgcolor: "common.main",
        width: 100,
        height: 100,
        m: 2,
        fontSize: '40px'
      }}>
{stringAvatar(n)}    
</Avatar>
  );
}