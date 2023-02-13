import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -60,
        top: 0,
        width: 140,
        height: 26,
        fontSize: '14px',
        background: 'red',
        border: `2px solid ${theme.palette.background.paper}`
    }
}));

export default function RoleBadge({ children, content }) {
    return (
        <IconButton aria-label="cart" sx={{ fontSize: '16px' }}>
            <StyledBadge badgeContent={content} color="secondary">
                {children}
            </StyledBadge>
        </IconButton>
    );
}
