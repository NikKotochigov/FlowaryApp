// assets
import { IconRefresh } from '@tabler/icons-react';

// constant
const icons = { IconRefresh };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const main = {
    id: 'main',
    type: 'group',
    children: [
        {
            id: 'Change Company',
            title: 'Change Company',
            type: 'item',
            url: '/',
            icon: icons.IconRefresh,
            external: true,
            target: false
        }
    ]
};

export default main;
