import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 25,
        top: 17,
        width: 98,
        height: 29,
        // background: 'red',
        border: `2px solid ${theme.palette.background.paper}`
        // padding: '0 px',
    }
}));

export default function CustomBadge({ children, content, color = 'red' }) {
    return (
        <IconButton aria-label="cart">
            <StyledBadge 
            sx={{'& .MuiBadge-badge': {background: color}}}
            badgeContent={content} 
            color="secondary">
                {children}
            </StyledBadge>
        </IconButton>
    );
}
